import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getMany: protectedProcedure.query(({ ctx }) => {
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
    return ctx.db.user.findFirst({ where: { username: input } });
  }),
});
