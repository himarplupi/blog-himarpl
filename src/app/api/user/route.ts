import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type UserType = {
  id: string;
  name?: string | undefined | null;
  email?: string | undefined | null;
  emailVerified?: Date | undefined | null;
  image?: string | undefined | null;
  username?: string | undefined | null;
  bio?: string | undefined | null;
  position?: string | undefined | null;
  role: "member" | "admin";
  lastLoginAt?: Date | undefined | null;
  createdAt: Date;
  updatedAt: Date;
  departmentId?: string | undefined | null;
  posts?: PostType[] | undefined | null;
};

export type PostType = {
  id: string;
  authorId: string;
  title: string;
  metaTitle: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | undefined | null;
};

function sortUsersByLatestPost(users: UserType[]): UserType[] {
  return users.sort((a, b) => {
    // Ambil publishedAt terbaru dari post masing-masing pengguna
    const aLatestPublishedDate: Date | null | undefined = a.posts?.find(
      (post) => post.publishedAt !== null,
    )?.publishedAt;
    const bLatestPublishedDate: Date | null | undefined = b.posts?.find(
      (post) => post.publishedAt !== null,
    )?.publishedAt;

    // Jika kedua pengguna memiliki publishedAt
    if (aLatestPublishedDate && bLatestPublishedDate) {
      return bLatestPublishedDate.getTime() - aLatestPublishedDate.getTime();
    }

    // Jika hanya satu yang memiliki publishedAt
    if (aLatestPublishedDate && !bLatestPublishedDate) {
      return -1;
    } else if (!aLatestPublishedDate && bLatestPublishedDate) {
      return 1;
    }

    // Jika keduanya tidak memiliki publishedAt, bandingkan createdAt terbaru dari post masing-masing pengguna
    const aLatestPostDate: Date | undefined =
      a.posts && a.posts.length > 0 ? a.posts[0]?.createdAt : undefined;
    const bLatestPostDate: Date | undefined =
      b.posts && b.posts.length > 0 ? b.posts[0]?.createdAt : undefined;

    if (aLatestPostDate && bLatestPostDate) {
      return bLatestPostDate.getTime() - aLatestPostDate.getTime();
    }

    // Jika hanya satu yang memiliki post
    if (aLatestPostDate && !bLatestPostDate) {
      return -1;
    } else if (!aLatestPostDate && bLatestPostDate) {
      return 1;
    }

    // Jika keduanya tidak memiliki post atau sama
    return 0;
  });
}

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      posts: {
        orderBy: [
          {
            publishedAt: "desc",
          },
          {
            createdAt: "desc",
          },
        ],
        take: 1,
      },
    },
  });

  sortUsersByLatestPost(users);

  return NextResponse.json(users);
}
