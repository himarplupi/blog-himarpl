import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const accountRouter = createTRPCRouter({
  getByUserId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.account.findFirst({
      where: { userId: input },
    });
  }),
});
