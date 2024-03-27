import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import type { User as PrismaUser } from "@prisma/client";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "admin" | "member";
    } & DefaultSession["user"];
  }

  interface User extends PrismaUser {
    role: "admin" | "member";
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ profile, account: authAccount }) => {
      const email = profile?.email;

      if (!authAccount) return "/login?errorMsg=Account is not detected";
      if (!email) return "/login?errorMsg=Email is not detected";

      const user = await api.user.getByEmail.query(email);

      if (!user) {
        return `/login?errorMsg=Account with email ${email} is not registered`;
      }

      const account = await api.account.getByUserId.query(user.id);

      if (!account) {
        console.log("Account not found, inserting...");
        // Insert new account user if not found
        const res = await db.account.create({
          data: {
            userId: user.id,
            provider: authAccount.provider,
            type: authAccount.type,
            providerAccountId: authAccount.providerAccountId,
            access_token: authAccount.access_token,
            refresh_token: authAccount.refresh_token,
            expires_at: authAccount.expires_at,
            scope: authAccount.scope,
            token_type: authAccount.token_type,
            id_token: authAccount.id_token,
            session_state: authAccount.session_state,
          },
        });

        if (!res) return "/login?errorMsg=Failed to insert account";
      }

      return true;
    },
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
