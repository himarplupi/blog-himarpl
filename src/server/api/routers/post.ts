import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export type Post7Day = {
  publishedAt: Date | null;
};

export type PostStatistic = {
  totalPostsIn7Days: number;
  percentageIn7Days: number;
  posts7Days: Post7Day[];
};

export const postRouter = createTRPCRouter({
  getStatistic: protectedProcedure.query(async ({ ctx }) => {
    const posts7Days = await ctx.db.post.findMany({
      orderBy: { publishedAt: "asc" },
      select: { publishedAt: true },
      where: {
        publishedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    });

    const posts7DaysBefore = await ctx.db.post.count({
      where: {
        publishedAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const totalPostsIn7Days = posts7Days.length - posts7DaysBefore;

    const percentageIn7Days =
      Math.round(
        (totalPostsIn7Days / (posts7DaysBefore === 0 ? 1 : posts7DaysBefore)) *
          100 *
          100,
      ) / 100;

    return {
      totalPostsIn7Days,
      percentageIn7Days,
      posts7Days,
    };
  }),
});
