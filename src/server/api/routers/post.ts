import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";

export const postRouter = createTRPCRouter({
  getMany: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
  getManyInclude: protectedProcedure
    .input(
      z.object({
        author: z.boolean().optional(),
        categories: z.boolean().optional(),
        tags: z.boolean().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        include: {
          author: input.author && {
            include: {
              department: {
                select: {
                  id: true,
                  acronym: true,
                  name: true,
                },
              },
            },
            select: {
              id: true,
              name: true,
            },
          },
          categories: input.categories && {
            select: {
              title: true,
              slug: true,
            },
          },
          tags: input.tags && {
            select: {
              title: true,
              slug: true,
            },
          },
        },
      });
    }),
  getBySlug: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({ where: { slug: input } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
        categoryId: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      const metaTitle = shortenTitle(input.title, 14);

      return await ctx.db.post.create({
        data: {
          id: id,
          title: input.title,
          content: input.content,
          authorId: input.authorId,
          metaTitle: metaTitle,
          slug: id,
          categories: input.categoryId
            ? {
                connect: [{ id: input.categoryId }],
              }
            : undefined,
          tags: input.tags
            ? { connect: input.tags.map((id) => ({ id })) }
            : undefined,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        metaTitle: z.string().optional(),
        categoryId: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          metaTitle: input.metaTitle,
          categories: input.categoryId
            ? {
                connect: [{ id: input.categoryId }],
              }
            : undefined,
          tags: input.tags
            ? { connect: input.tags.map((id) => ({ id })) }
            : undefined,
        },
      });
    }),
  publish: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const res = await ctx.db.post.findFirst({ where: { id } });

      if (!res) {
        throw new Error("Post not found");
      }

      const metaTitle = res.metaTitle
        ? res.metaTitle
        : shortenTitle(res.title, 14);
      let slug = formatSlug(metaTitle);

      const slugExists = await ctx.db.post.count({ where: { slug } });

      if (slugExists > 0) {
        slug += `-${id}`;
      }

      return await ctx.db.post.update({
        where: { id },
        data: {
          slug: slug,
          metaTitle: metaTitle,
          publishedAt: new Date(),
        },
      });
    }),
});

function shortenTitle(title: string, maxWords: number) {
  const words = title.split(" ");
  let shortenedTitle = "";

  if (words.length <= maxWords) {
    shortenedTitle = title;
  } else {
    shortenedTitle = words.slice(0, maxWords).join(" ");
  }

  return shortenedTitle;
}

function formatSlug(title: string) {
  return title.toLowerCase().replace(/ /g, "-");
}
