import { revalidatePath } from "next/cache";
import GithubSlugger from "github-slugger";
import { z } from "zod";

import { getContent } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

const contentGuide = `
  <h2>Ini adalah heading 2</h2>
  <p>Ini adalah paragraf dengan <strong>bold</strong> dan <em>italic</em>.</p>
  <p>Ini adalah paragraf dengan <a href="https://example.com">link</a>.</p>
  <h3>Ini adalah heading 3</h3>
  <p>Ini adalah paragraf dengan <code>code</code> dan <u>garis bawah</u>.</p>
  <h4>Ini adalah heading 4</h4>
  <p>Ini adalah <mark>paragraf</mark> dengan:</p>
  <pre><code>
  code block
  </code></pre>
  <h5>Ini adalah heading 5 bukan <s>paragraf</s></h5>
  <p>Ini adalah paragraf dengan:</p>
  <ul>
    <li>list 1</li>
    <li>list 2</li>
  </ul>
  <h6>Ini adalah <sub>Head</sub>ing<sup>6</sup></h6>
  <p>Contoh gambar:</p>
  <img src="https://images.unsplash.com/photo-1707362142719-60675f05b4d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=512&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMjAxNDkxNQ&ixlib=rb-4.0.3&q=80&w=512" alt="contoh gambar">
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
        content: getContent(contentGuide),
        rawHtml: contentGuide,
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session.user;

      if (!currentUser.username) {
        throw new Error("User must have a username to publish a post");
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

      const slug = slugger.slug(metaTitle);

      // Insert new post
      const post = await ctx.db.post.update({
        where: {
          authorId_slug: {
            authorId: currentUser.id,
            slug: slug,
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
        tagIds: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      revalidatePath("/me", "layout");
      return ctx.db.post.update({
        data: {
          title: input.title,
          metaTitle: parseMetaTitle(input.title),
          content: input.content,
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
      orderBy: {
        updatedAt: "desc",
      },
      include: {
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
      orderBy: {
        publishedAt: "desc",
      },
      include: {
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
