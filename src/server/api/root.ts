import { accountRouter } from "./routers/account";
import { departmentRouter } from "./routers/department";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  department: departmentRouter,
  user: userRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
