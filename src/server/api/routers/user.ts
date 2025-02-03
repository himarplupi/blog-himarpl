import { and, eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { socialMedias, users } from "@/server/db/schema";
import { ratelimit } from "@/server/ratelimit";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getByEmail: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, input),
    });
  }),
  byUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, input.toLowerCase()),
      with: {
        departments: true,
        positions: true,
        periods: true,
        accounts: true,
        socialMedias: true,
      },
    });
  }),
  setSelfUsername: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set({
          username: input.toLowerCase(),
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, ctx.session.user.id),
      with: {
        departments: true,
        positions: true,
        periods: true,
        accounts: true,
        socialMedias: true,
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

      const currentSosialMedias = await ctx.db.query.socialMedias.findMany({
        where: (socialMedias, { eq }) => eq(socialMedias.userId, userId),
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
        await ctx.db.insert(socialMedias).values(
          inputSocialMedias.map((input) => ({
            ...input,
            userId,
          })),
        );

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

        await ctx.db
          .update(socialMedias)
          .set(inputSocialMedia)
          .where(
            and(
              eq(socialMedias.userId, userId),
              eq(socialMedias.name, current.name),
              eq(socialMedias.username, current.username),
            ),
          );
      }

      if (filterredSocialMedias.length < inputSocialMedias.length) {
        const newSocialMedias = inputSocialMedias.filter((input) => {
          const currentSocialMedia = filterredSocialMedias.find(
            (current) => current.name === input.name,
          );

          return !currentSocialMedia;
        });

        await ctx.db.insert(socialMedias).values(
          newSocialMedias.map((input) => ({
            ...input,
            userId,
          })),
        );
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

      return await ctx.db
        .update(users)
        .set({
          username: input.username,
          bio: input.bio,
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
  updateLastLoginAt: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db
      .update(users)
      .set({
        lastLoginAt: new Date(),
      })
      .where(eq(users.id, ctx.session.user.id));
  }),
  byNewestArticle: publicProcedure.query(async ({ ctx }) => {
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    const newestPosts = await ctx.db.query.posts.findMany({
      where: (posts, { gte }) => gte(posts.publishedAt, thisMonth),
      orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
      with: {
        author: {
          columns: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });

    return newestPosts.map((post) => post.author);
  }),
});
