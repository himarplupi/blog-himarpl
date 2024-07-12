import { type Metadata } from "next";

import { TagResult } from "@/components/tag/tag-result";
import { api } from "@/trpc/server";

type TagSlugPage = {
  params: {
    "tag-slug": string;
  };
};

export async function generateMetadata({
  params,
}: TagSlugPage): Promise<Metadata> {
  const tag = await api.postTag.searchUnique.query({
    slug: params["tag-slug"],
  });

  return {
    title: `LABEL ${tag?.title.toUpperCase()} | HIMARPL`,
    description: `Lihat semua artikel yang berkaitan dengan ${tag?.title} hanya di HIMARPL!`,
  };
}

export default function TagSlugPage() {
  return (
    <main className="mt-24">
      <TagResult />
    </main>
  );
}
