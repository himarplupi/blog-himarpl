import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import GithubSlugger from "github-slugger";

const contentGuide = `
  <h1>Ini adalah heading 1</h1>
  <p>Ini adalah paragraf dengan <strong>bold</strong> dan <em>italic</em>.</p>
  <h2>Ini adalah heading 2</h2>
  <p>Ini adalah paragraf dengan <a href="https://example.com">link</a>.</p>
  <h3>Ini adalah heading 3</h3>
  <p>Ini adalah paragraf dengan <code>code</code>.</p>
  <h4>Ini adalah heading 4</h4>
  <p>Ini adalah paragraf dengan:</p>
  <pre><code>
  code block
  </code></pre>
  <h5>Ini adalah heading 5</h5>
  <p>Ini adalah paragraf dengan:</p>
  <ul>
    <li>list 1</li>
    <li>list 2</li>
  </ul>
  <h6>Ini adalah heading 6</h6>
  <p>Ini adalah paragraf dengan gambar:</p>
  <img src="https://example.com/image.jpg" alt="gambar">
`;

export const postRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx }) => {
    const currentUser = ctx.session.user;

    if (!currentUser.username) {
      throw new Error("User must have a username to create a post");
    }

    const id = createId();
    const title = faker.company.catchPhrase();

    // Insert new post
    return await ctx.db.post.create({
      data: {
        id,
        title,
        content: contentGuide,
        slug: id,
        metaTitle: parseMetaTitle(title),
        authorId: ctx.session.user.id,
      },
    });
  }),
  publish: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session.user;

      if (!currentUser.username) {
        throw new Error("User must have a username to create a post");
      }

      const title = input.title;
      const slugger = new GithubSlugger();
      const metaTitle = parseMetaTitle(title);

      (
        await ctx.db.post.findMany({
          where: {
            authorId: ctx.session.user.id,
          },
          select: {
            slug: true,
          },
        })
      ).forEach((post) => {
        slugger.slug(post.slug);
      });

      // Insert new post
      const post = await ctx.db.post.update({
        where: {
          authorId_slug: {
            authorId: currentUser.id,
            slug: input.slug,
          },
        },
        data: {
          title,
          metaTitle,
          content: input.content,
          slug: slugger.slug(metaTitle),
        },
      });

      slugger.reset();

      return post;
    }),
  byParams: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const author = await ctx.db.user.findUnique({
        where: {
          username: input.username,
        },
        include: {
          posts: {
            where: {
              slug: input.slug,
            },
            include: {
              category: {
                select: {
                  title: true,
                  slug: true,
                },
              },
              tags: {
                select: {
                  title: true,
                  slug: true,
                },
              },
            },
          },
        },
      });

      return {
        author,
        post: author?.posts[0],
      };
    }),
  save: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        slug: z.string(),
        title: z.string(),
        content: z.string(),
        categoryId: z.string().optional(),
        tagIds: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        data: {
          title: input.title,
          metaTitle: parseMetaTitle(input.title),
          content: input.content,
          categoryId: input.categoryId,
          tags: {
            connect: input.tagIds?.map((id) => ({ id })),
          },
        },
        where: {
          authorId_slug: {
            authorId: input.authorId,
            slug: input.slug,
          },
        },
      });
    }),
  selectSelfDrafts: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.session.user;
    if (!currentUser) {
      throw new Error("User must be logged in to view drafts");
    }

    return ctx.db.post.findMany({
      where: {
        authorId: currentUser.id,
        publishedAt: null,
      },
      include: {
        category: {
          select: {
            title: true,
            slug: true,
          },
        },
        tags: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });
  }),
  selectSelfPublished: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.session.user;
    if (!currentUser) {
      throw new Error("User must be logged in to view drafts");
    }

    return ctx.db.post.findMany({
      where: {
        authorId: currentUser.id,
        publishedAt: {
          not: null,
        },
      },
      include: {
        category: {
          select: {
            title: true,
            slug: true,
          },
        },
        tags: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });
  }),
  delete: protectedProcedure
    .input(
      z.object({
        authorId: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.delete({
        where: {
          authorId_slug: {
            authorId: input.authorId,
            slug: input.slug,
          },
        },
      });
    }),
});

function parseMetaTitle(title: string) {
  // Remove special characters and convert to lowercase
  const safeTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();

  // Set safe meta title length by word length
  const maxWords = 10;
  const words = safeTitle.split(" ");
  const truncatedTitle = words.slice(0, maxWords).join(" ");

  return truncatedTitle;
}
