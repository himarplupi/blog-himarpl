import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ratelimit } from "@/server/ratelimit";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getByEmail: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({ where: { email: input } });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        username: {
          not: null,
        },
      },
      include: {
        departments: true,
        periods: true,
        positions: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  }),
  byUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
      where: { username: input.toLowerCase() },
      include: {
        departments: true,
        accounts: true,
        socialMedias: true,
        periods: true,
        positions: true,
      },
    });
  }),
  setSelfUsername: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { username: input.toLowerCase() },
      });
    }),
  me: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        departments: true,
        socialMedias: true,
        periods: true,
        positions: true,
      },
    });
  }),
  updateSelfSocialMedia: protectedProcedure
    .input(
      z.array(
        z.object({
          name: z.string(),
          username: z.string(),
          url: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const inputSocialMedias = input;
      const userId = ctx.session.user.id;

      const { success } = await ratelimit.limit(userId);
      if (!success) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Rate limit exceeded",
        });
      }

      const currentSosialMedias = await ctx.db.socialMedia.findMany({
        where: { userId },
      });

      // get current social media that exist in input
      const filterredSocialMedias = currentSosialMedias.filter((current) => {
        const inputSocialMedia = inputSocialMedias.find(
          (input) => input.name === current.name,
        );

        return inputSocialMedia;
      });

      // Add new social media if not exist
      if (filterredSocialMedias.length === 0) {
        await ctx.db.socialMedia.createMany({
          data: inputSocialMedias.map((input) => ({
            ...input,
            userId,
          })),
        });

        return inputSocialMedias;
      }

      // Update social media
      for (const current of filterredSocialMedias) {
        const inputSocialMedia = inputSocialMedias.find(
          (input) => input.name === current.name,
        );

        if (!inputSocialMedia) {
          continue;
        }

        await ctx.db.socialMedia.update({
          where: {
            userId_name_username: {
              userId,
              name: current.name,
              username: current.username,
            },
          },
          data: inputSocialMedia,
        });
      }

      if (filterredSocialMedias.length < inputSocialMedias.length) {
        const newSocialMedias = inputSocialMedias.filter((input) => {
          const currentSocialMedia = filterredSocialMedias.find(
            (current) => current.name === input.name,
          );

          return !currentSocialMedia;
        });

        await ctx.db.socialMedia.createMany({
          data: newSocialMedias.map((input) => ({
            ...input,
            userId,
          })),
        });
      }

      return inputSocialMedias;
    }),
  updateSelfProfile: protectedProcedure
    .input(
      z.object({
        username: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { success } = await ratelimit.limit(ctx.session.user.id);
      if (!success) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Rate limit exceeded",
        });
      }

      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          username: input.username,
          bio: input.bio,
        },
      });
    }),
  updateLastLoginAt: protectedProcedure.mutation(({ ctx }) => {
    return ctx.db.user.update({
      where: { id: ctx.session.user.id },
      data: { lastLoginAt: new Date() },
    });
  }),
  byNewestArticle: publicProcedure.query(async ({ ctx }) => {
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);

    return await ctx.db.user.findMany({
      orderBy: {
        posts: {
          _count: "asc",
        },
      },
      where: {
        posts: {
          some: {
            publishedAt: {
              gte: thisMonth,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        username: true,
        posts: {
          where: {
            publishedAt: {
              gte: thisMonth,
            },
          },
          select: {
            _count: true,
          },
        },
      },
    });
  }),
});
