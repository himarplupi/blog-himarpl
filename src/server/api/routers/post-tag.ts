import GithubSlugger from "github-slugger";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const postTagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const title = input.toLowerCase();
      const existingTag = await ctx.db.postTag.findFirst({
        where: { title },
      });

      if (existingTag) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Tag already exists",
        });
      }

      const slugger = new GithubSlugger();
      const slug = slugger.slug(title);

      slugger.reset();

      return await ctx.db.postTag.create({
        data: { title, slug },
      });
    }),
  search: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const inputs = input.split(" ");
      return await ctx.db.postTag.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
        where: {
          OR: inputs.map((input) => ({
            title: {
              contains: input,
              mode: "insensitive",
            },
          })),
        },
      });
    }),
  inPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.postTag.findMany({
        where: {
          posts: {
            some: {
              id: input.postId,
            },
          },
        },
      });
    }),
});
