import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postTagRouter = createTRPCRouter({
  search: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const inputs = input.split(" ");
    return await ctx.db.postTag.findMany({
      select: {
        title: true,
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
});
