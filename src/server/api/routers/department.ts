import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.db.department.findMany();
  }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.department.findMany();
  }),
  getManySelect: protectedProcedure
    .input(
      z.object({
        name: z.boolean().optional(),
        acronym: z.boolean().optional(),
        description: z.boolean().optional(),
        image: z.boolean().optional(),
        type: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.department.findMany({
        select: { id: true, ...input },
      });
    }),
});
