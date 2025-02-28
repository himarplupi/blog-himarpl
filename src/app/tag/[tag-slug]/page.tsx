import { TagResult } from "@/components/tag/tag-result";

// ? This is commented because of the libsql integration cannot be called in vercel static generation(?), not sure but this is the temporary solutions

// import { type Metadata } from "next";
// import { db } from "@/server/db";

// type TagSlugPage = {
//   params: {
//     "tag-slug": string;
//   };
// };

// export async function generateStaticParams() {
//   const postTags = await db.postTag.findMany({
//     where: {
//       posts: {
//         some: {
//           publishedAt: {
//             not: null,
//           },
//         },
//       },
//     },
//   });

//   return postTags.map((tag) => ({
//     "tag-slug": tag.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: TagSlugPage): Promise<Metadata> {
//   const tag = await db.postTag.findFirst({
//     where: {
//       slug: params["tag-slug"],
//     },
//   });

//   return {
//     title: `${tag?.title.toUpperCase()} | HIMARPL`,
//     description: `Lihat semua artikel yang berkaitan dengan ${tag?.title} hanya di HIMARPL!`,
//   };
// }

export default function TagSlugPage() {
  return (
    <main className="mt-24">
      <TagResult />
    </main>
  );
}
