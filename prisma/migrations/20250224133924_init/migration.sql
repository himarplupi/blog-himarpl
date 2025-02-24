/*
  Warnings:

  - You are about to drop the `Programs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `position` on the `users` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Programs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "programs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    CONSTRAINT "programs_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "username" TEXT,
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'member',
    "last_login_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("bio", "created_at", "email", "email_verified", "id", "image", "last_login_at", "name", "role", "updated_at", "username") SELECT "bio", "created_at", "email", "email_verified", "id", "image", "last_login_at", "name", "role", "updated_at", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
