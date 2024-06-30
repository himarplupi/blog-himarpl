"use client";

import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function Sidebar() {
  const [tagQuery] = useQueryState("tag");
  const usersQuery = api.user.byNewestArticle.useQuery();
  const relatedTagQuery = api.postTag.related.useQuery({ tagSlug: tagQuery });

  return (
    <div className="top-20 mt-14 overflow-y-scroll p-0 lg:sticky lg:mt-0 lg:px-6 lg:py-4">
      {/* Label */}
      <h3 className="mb-4 text-xl font-semibold">Telusur Label</h3>
      <div className="mb-2 flex flex-wrap gap-2">
        {relatedTagQuery.data?.map((tag) => (
          <Link href={`/tag/${tag.slug}`} key={tag.id}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {tag.title}
            </Button>
          </Link>
        ))}
      </div>
      <Link href={"/explore-tags"}>
        <Button variant="link" className="mb-8 text-white" size={"sm"}>
          Lihat Semua
        </Button>
      </Link>

      {/* Pengurus */}
      <h3 className="mb-4 text-xl font-semibold">Pengurus</h3>
      <div className="mb-8 flex flex-col gap-2">
        {usersQuery.data?.map((user) => (
          <div key={user.id} className="flex items-start justify-start gap-4">
            <Link
              href={`@${user.username}`}
              className="aspect-square overflow-hidden rounded-full"
            >
              <Image
                className=""
                src={user.image ?? ""}
                width={40}
                height={40}
                alt={user.name + " profile picture"}
              />
            </Link>
            <div>
              <Link
                href={`@${user.username}`}
                className="font-semibold underline-offset-4 hover:underline"
              >
                {user.name}
              </Link>

              <p className="text-sm">{`${user.posts.length} Artikel bulan ini`}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div>
        blog ini dibuat Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Iure perspiciatis aspernatur, similique molestiae quia id.
      </div>
    </div>
  );
}
