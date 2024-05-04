import GithubSlugger from "github-slugger";
import { z } from "zod";

import { isWordInSentenceMoreThan, isWordMoreThan } from "@/lib/utils";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const postTagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const title = input.toLowerCase();

      if (isWordMoreThan(title, 3)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Maximum 3 words for tags",
        });
      }

      if (isWordInSentenceMoreThan(title, 16)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Maximum 16 characters for each word in tags",
        });
      }

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
  popular: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.postTag.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      take: 15,
    });
  }),
});
