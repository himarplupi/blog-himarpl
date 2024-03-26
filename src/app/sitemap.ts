import type { MetadataRoute } from "next";

import { env } from "@/env";

// This is the combination of the Application Base URL and Base PATH
const baseUrlAndPath = `${env.BASE_URL}${env.BASE_PATH}`;

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
  const paths: Array<string> = [];

  // for (const locale of availableLocaleCodes) {
  //   const routes = await dynamicRouter.getRoutesByLanguage(locale);

  //   paths.push(
  //     ...routes.map((route) => `${baseUrlAndPath}/${locale}/${route}`),
  //   );
  // }

  paths.push(`${baseUrlAndPath}`);

  const currentDate = new Date().toISOString();

  return [...paths, ...EXTERNAL_LINKS_SITEMAP].map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: "always",
  }));
};

export default sitemap;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
