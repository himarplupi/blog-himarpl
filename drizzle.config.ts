import { type Config } from "drizzle-kit";

export default {
  out: "./drizzle",
  schema: "./src/server/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  tablesFilter: ["himarpl_*"],
} satisfies Config;
