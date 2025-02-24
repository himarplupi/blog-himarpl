/*
  Warnings:

  - You are about to drop the column `department_id` on the `users` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_DepartmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DepartmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DepartmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Programs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    CONSTRAINT "Programs_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Programs" ("content", "department_id", "id") SELECT "content", "department_id", "id" FROM "Programs";
DROP TABLE "Programs";
ALTER TABLE "new_Programs" RENAME TO "Programs";
CREATE TABLE "new_departments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'BE',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period_year" INTEGER NOT NULL,
    CONSTRAINT "departments_period_year_fkey" FOREIGN KEY ("period_year") REFERENCES "periods" ("year") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_departments" ("acronym", "created_at", "description", "id", "image", "name", "period_year", "type", "updated_at") SELECT "acronym", "created_at", "description", "id", "image", "name", "period_year", "type", "updated_at" FROM "departments";
DROP TABLE "departments";
ALTER TABLE "new_departments" RENAME TO "departments";
CREATE UNIQUE INDEX "departments_type_acronym_key" ON "departments"("type", "acronym");
CREATE TABLE "new_post_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_id" TEXT,
    CONSTRAINT "post_tags_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "post_tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_post_tags" ("created_at", "id", "parent_id", "slug", "title", "updated_at") SELECT "created_at", "id", "parent_id", "slug", "title", "updated_at" FROM "post_tags";
DROP TABLE "post_tags";
ALTER TABLE "new_post_tags" RENAME TO "post_tags";
CREATE UNIQUE INDEX "post_tags_title_key" ON "post_tags"("title");
CREATE UNIQUE INDEX "post_tags_slug_key" ON "post_tags"("slug");
CREATE TABLE "new_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rawHtml" TEXT NOT NULL,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" DATETIME,
    CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("author_id", "content", "created_at", "id", "image", "meta_title", "published_at", "rawHtml", "slug", "title", "updated_at") SELECT "author_id", "content", "created_at", "id", "image", "meta_title", "published_at", "rawHtml", "slug", "title", "updated_at" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_author_id_slug_key" ON "posts"("author_id", "slug");
CREATE TABLE "new_social_medias" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "social_medias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_social_medias" ("name", "url", "user_id", "username") SELECT "name", "url", "user_id", "username" FROM "social_medias";
DROP TABLE "social_medias";
ALTER TABLE "new_social_medias" RENAME TO "social_medias";
CREATE UNIQUE INDEX "social_medias_user_id_name_username_key" ON "social_medias"("user_id", "name", "username");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "username" TEXT,
    "bio" TEXT,
    "position" TEXT,
    "role" TEXT NOT NULL DEFAULT 'member',
    "last_login_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("bio", "created_at", "email", "email_verified", "id", "image", "last_login_at", "name", "position", "role", "updated_at", "username") SELECT "bio", "created_at", "email", "email_verified", "id", "image", "last_login_at", "name", "position", "role", "updated_at", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToUser_AB_unique" ON "_DepartmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToUser_B_index" ON "_DepartmentToUser"("B");
