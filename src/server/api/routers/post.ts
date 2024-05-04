import { revalidatePath } from "next/cache";
import GithubSlugger from "github-slugger";
import { z } from "zod";

import { parseMetaTitle } from "@/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx }) => {
    const currentUser = ctx.session.user;

    if (!currentUser.username) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "User must have a username to create a post",
      });
    }

    const id = createId();

    // Insert new post
    return await ctx.db.post.create({
      data: {
        id,
        title: "",
        content: "",
        rawHtml: "",
        slug: id,
        metaTitle: "",
        authorId: ctx.session.user.id,
      },
    });
  }),
  publish: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session.user;

      if (!currentUser.username) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "User must have a username to publish a post",
        });
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
          id: input.id,
        },
        data: {
          title,
          metaTitle,
          slug: slugger.slug(metaTitle),
          publishedAt: new Date(),
        },
      });

      slugger.reset();
      revalidatePath("/me", "layout");

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
          username: input.username.toLowerCase(),
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
        slug: z.string(),
        title: z.string(),
        content: z.string(),
        rawHtml: z.string(),
        image: z.string().optional(),
        tagTitles: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prevTags = await ctx.db.postTag.findMany({
        where: {
          posts: {
            some: {
              authorId: ctx.session.user.id,
              slug: input.slug,
            },
          },
        },
      });

      const postResult = await ctx.db.post.update({
        include: {
          tags: true,
        },
        data: {
          title: input.title,
          metaTitle: parseMetaTitle(input.title),
          content: input.content,
          rawHtml: input.rawHtml,
          image: input.image,
          tags: {
            connect: input.tagTitles?.map((title) => ({
              title,
            })),
            disconnect: prevTags.filter((tag) => {
              return !input.tagTitles?.includes(tag.title);
            }),
          },
        },
        where: {
          authorId_slug: {
            authorId: ctx.session.user.id,
            slug: input.slug,
          },
        },
      });

      revalidatePath("/me", "layout");

      return postResult;
    }),
  selectSelfDrafts: protectedProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.session.user;

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
  all: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      include: {
        tags: {
          select: {
            title: true,
            slug: true,
          },
        },
        author: {
          select: {
            username: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 5,
    });
  }),

  // popular: publicProcedure.query(async ({ ctx }) => {
  //   return await ctx.db.postTag.findMany({
  //     include: {
  //       _count: {
  //         select: { posts: true },
  //       },
  //     },
  //     orderBy: {
  //       posts: {
  //         _count: "desc",
  //       },
  //     },
  //     take: 5,
  //   });
  // }),
});
