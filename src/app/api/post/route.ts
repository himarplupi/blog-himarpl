import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      tags: true,
    },
  });

  return NextResponse.json(posts);
}
