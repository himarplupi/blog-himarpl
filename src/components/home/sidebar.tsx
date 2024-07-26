"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactLenis } from "lenis/react";
import { useQueryState } from "nuqs";

import { BotCard } from "@/components/common/bot-card";
import { Footer } from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export function Sidebar({
  type,
  tagSlug,
}: {
  type: "mobile" | "desktop";
  tagSlug?: string;
}) {
  const [tagQuery] = useQueryState("tag");
  const usersQuery = api.user.byNewestArticle.useQuery();
  const relatedTagQuery = api.postTag.related.useQuery({
    tagSlug: tagQuery ?? tagSlug,
  });

  return (
    <ReactLenis
      className={cn(
        "h-screen overflow-y-scroll",
        type === "desktop" &&
          "hidden lg:sticky lg:top-20 lg:col-span-1 lg:block",
      )}
    >
      <div className="mt-6 p-0 px-6 md:mt-14 lg:mt-0 lg:px-6 lg:pb-20">
        {/* Label */}
        <h3 className="mb-4 text-xl font-semibold">Telusur Label</h3>
        <div className="mb-2 flex flex-wrap gap-2">
          {relatedTagQuery.data?.map((tag) => (
            <Link href={`/tag/${tag.slug}`} key={tag.id}>
              <Button
                className="rounded-full"
                variant={
                  tag.slug === tagSlug || tag.slug === tagQuery
                    ? "default"
                    : "secondary"
                }
                size={"sm"}
              >
                {tag.title}
              </Button>
            </Link>
          ))}
        </div>

        <Link href={"/explore-tags"}>
          <Button variant="link" size={"sm"}>
            Lihat Semua
          </Button>
        </Link>

        {/* Pengurus */}
        <h3 className="mb-4 mt-2 text-xl font-semibold">Pengurus</h3>
        <div className="mb-8 flex flex-col gap-2">
          {usersQuery.data?.map((user) => (
            <div key={user.id} className="flex items-start justify-start gap-4">
              <Link
                href={`/@${user.username}`}
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
                  href={`/@${user.username}`}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  {user.name}
                </Link>

                <p className="text-sm">{`${user.posts.length} Artikel bulan ini`}</p>
              </div>
            </div>
          ))}
        </div>

        <BotCard />

        <Footer />
      </div>
    </ReactLenis>
  );
}
