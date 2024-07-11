import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  many: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  getManyInclude: protectedProcedure
    .input(
      z.object({
        department: z
          .object({
            id: z.boolean().default(true),
            acronym: z.boolean().optional(),
            name: z.boolean().optional(),
          })
          .optional(),
        accounts: z
          .object({
            id: z.boolean().default(true),
            provider: z.boolean().optional(),
          })
          .optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        include: {
          department: input.department && { select: input.department },
          accounts: input.accounts && { select: input.accounts },
        },
      });
    }),
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({ where: { id: input } });
  }),
  getByEmail: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({ where: { email: input } });
  }),
  byUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.user.findFirst({
      where: { username: input.toLowerCase() },
      include: {
        department: true,
        accounts: true,
        socialMedia: true,
      },
    });
  }),
  setSelfUsername: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { username: input.toLowerCase() },
      });
    }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      include: {
        department: true,
        socialMedia: true,
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
