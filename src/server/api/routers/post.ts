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
      revalidatePath("/me/posts", "layout");

      return post;
    }),

  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.post.findUnique({
        where: {
          id: input.id,
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

  byParamsForTagSave: protectedProcedure
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

      revalidatePath("/me/posts", "layout");

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
  manyPublished: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
      where: {
        publishedAt: {
          not: null,
        },
      },
    });
  }),
  infiniteByTag: publicProcedure
    .input(
      z.object({
        tagSlug: z.string().nullish(),
        authorId: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await ctx.db.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          publishedAt: {
            not: null,
          },
          authorId: input.authorId,
          tags: input.tagSlug
            ? {
                some: {
                  slug: input.tagSlug,
                },
              }
            : undefined,
        },
        include: {
          tags: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          author: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          publishedAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  infiniteSearch: publicProcedure
    .input(
      z.object({
        search: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const searchArgs = input.search.split(" ");

      const items = await ctx.db.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          AND: [
            {
              publishedAt: {
                not: null,
              },
            },
            {
              OR: searchArgs.map((search) => ({
                OR: [
                  {
                    title: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    content: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              })),
            },
          ],
        },
        include: {
          tags: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
          author: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          publishedAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
