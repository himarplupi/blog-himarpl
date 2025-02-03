import { type AdapterAccount } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `himarpl_${name}`);

export const tags = createTable("tag", {
  id: text("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  parentId: text("parent_id"),
  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    authorId: text("authorId")
      .notNull()
      .references(() => users.id),
    title: text("title").notNull(),
    metaTitle: text("metaTitle").notNull(),
    slug: text("slug").notNull(),
    content: text("content").notNull(),
    rawHtml: text("raw_html").notNull(),
    image: text("image"),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
    publishedAt: int("published_at", { mode: "timestamp" }),
  },
  (example) => ({
    authorIdIdx: index("authorId_idx").on(example.authorId),
    titleIdx: index("title_idx").on(example.title),
    uniqueAuthorSlug: unique("posts_authorId_slug").on(
      example.authorId,
      example.slug,
    ),
  }),
);

export const periods = createTable("period", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  logo: text("logo", { length: 255 }),
  name: text("name", { length: 255 }).notNull(),
  description: text("description"),
  year: int("year").notNull().unique(),
  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const programs = createTable("program", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text("content", { length: 255 }).notNull(),
  departmentId: text("department_id").notNull(),
});

export const departments = createTable(
  "department",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name", { length: 255 }).notNull(),
    acronym: text("acronym", { length: 255 }).notNull(),
    image: text("image", { length: 255 }),
    description: text("description"),
    type: text("type", { length: 255 }).notNull(), // "BE" | "DP"
    periodYear: int("period_year").notNull(),
    createdAt: int("created_at", { mode: "timestamp" }).default(
      sql`(unixepoch())`,
    ),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    uniqueTypeAcronym: unique("departments_type_acronym").on(
      table.type,
      table.acronym,
    ),
  }),
);

export const positions = createTable("position", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name", { length: 255 }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const socialMedias = createTable(
  "social_media",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    name: text("name").notNull(),
    username: text("username").notNull(),
    url: text("url").notNull(),
  },
  (example) => ({
    compoundKey: primaryKey({
      columns: [example.userId, example.name, example.username],
    }),
  }),
);

export const users = createTable("user", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("email_verified", {
    mode: "timestamp",
  }).default(sql`(unixepoch())`),
  image: text("image", { length: 255 }),
  username: text("username", { length: 255 }).unique(),
  bio: text("bio"),
  role: text("role", { length: 255 }).default("member"),
  lastLoginAt: int("last_login_at", { mode: "timestamp" }),
  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`(unixepoch())`,
  ),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const accounts = createTable(
  "account",
  {
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const sessions = createTable(
  "session",
  {
    sessionToken: text("session_token", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  departments: many(departments),
  positions: many(positions),
  periods: many(periods),
  socialMedias: many(socialMedias),
  posts: many(posts),
}));

export const positionsRelations = relations(positions, ({ many }) => ({
  users: many(users),
}));

export const programsRelations = relations(programs, ({ one }) => ({
  department: one(departments, {
    fields: [programs.departmentId],
    references: [departments.id],
  }),
}));

export const departmentsRelations = relations(departments, ({ one, many }) => ({
  period: one(periods, {
    fields: [departments.periodYear],
    references: [periods.year],
  }),
  programs: many(programs),
  users: many(users),
}));

export const periodsRelations = relations(periods, ({ many }) => ({
  users: many(users),
  departments: many(departments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  tags: many(tags),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  parent: one(tags, { fields: [tags.parentId], references: [tags.id] }),
  children: many(tags).withFieldName("parent_id"),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const usersToPostitions = createTable("users_to_positions", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  positionId: text("position_id")
    .notNull()
    .references(() => positions.id),
});

export const usersToDepartments = createTable("users_to_departments", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id),
});

export const usersToPeriods = createTable("users_to_periods", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  periodId: text("period_id")
    .notNull()
    .references(() => periods.id),
});

export const tagsToPosts = createTable(
  "tags_to_posts",
  {
    postId: text("postId")
      .notNull()
      .references(() => posts.id),
    tagId: text("tagId")
      .notNull()
      .references(() => tags.id),
  },
  (example) => ({
    compoundKey: primaryKey({
      columns: [example.postId, example.tagId],
    }),
  }),
);

export type UserSchema = typeof users.$inferSelect;
