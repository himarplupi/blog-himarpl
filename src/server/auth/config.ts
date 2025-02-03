import { type DefaultSession, type NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
  type UserSchema,
} from "@/server/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { api } from "@/trpc/server";
import { eq } from "drizzle-orm";

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
      username: string | null;
    } & DefaultSession["user"];
  }

  interface User extends UserSchema {
    role: "admin" | "member";
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
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
        const res = await db.insert(accounts).values({
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
        });

        if (res.rows.length !== 1)
          return "/login?errorMsg=Failed to insert account";
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
          username: user.username,
        },
      };
    },
  },
} satisfies NextAuthConfig;
