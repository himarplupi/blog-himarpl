import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const postTags = await prisma.postTag.findMany({
    orderBy: [
      {
        children: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],
    take: 12,
  });

  return NextResponse.json(postTags);
}
