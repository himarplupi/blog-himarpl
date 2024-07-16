import type { MetadataRoute } from "next";

import { env } from "@/env";
import { db } from "@/server/db";

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${env.BASE_URL}`;

const EXTERNAL_LINKS_SITEMAP = [
  "https://pmb.himarpl.com/",
  "https://himarpl.com/",
  "https://upi.edu/",
  "https://rpl.upi.edu/",
];

// This allows us to generate a `sitemap.xml` file dynamically based on the needs of the Node.js Website
// Next.js Sitemap Generation doesn't support `alternate` refs yet
// @see https://github.com/vercel/next.js/discussions/55646
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const paths: Array<string> = [
    `${baseUrlAndPath}`,
    `${baseUrlAndPath}/explore-tags`,
    `${baseUrlAndPath}/search`,
    `${baseUrlAndPath}/login`,
  ];

  const users = await db.user.findMany({
    where: {
      username: {
        not: null,
      },
    },
    select: {
      username: true,
      posts: {
        select: {
          slug: true,
        },
      },
    },
  });

  users.forEach((user) => {
    paths.push(`${baseUrlAndPath}/@${user.username}`);
    user.posts.forEach((post) => {
      paths.push(`${baseUrlAndPath}/@${user.username}/${post.slug}`);
    });
  });

  const currentDate = new Date().toISOString();

  return [...paths, ...EXTERNAL_LINKS_SITEMAP].map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: "always",
  }));
};

export default sitemap;

// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "auto";
