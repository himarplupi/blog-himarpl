"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { LoaderCircle } from "lucide-react";

import { api } from "@/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Article } from "../common/article";
import { Badge } from "../ui/badge";

export function SearchResultItems({ searchQuery }: { searchQuery: string }) {
  const [parentAutoAnimate] = useAutoAnimate();
  const infiniteQuery = api.post.infiniteSearch.useInfiniteQuery(
    {
      search: searchQuery,
      limit: 10,
    },
    {
      queryKey: ["post.infiniteSearch", { search: searchQuery, limit: 10 }],
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useLenis(
    (lenis) => {
      if (
        lenis.progress > 0.9 &&
        infiniteQuery.hasNextPage &&
        !infiniteQuery.isFetchingNextPage
      ) {
        // eslint-disable-next-line
        infiniteQuery.fetchNextPage();
      }
    },
    [infiniteQuery.hasNextPage, infiniteQuery.isFetchingNextPage],
  );

  return (
    <div ref={parentAutoAnimate}>
      {infiniteQuery.data?.pages.map(({ items, nextCursor }, i) => {
        return (
          <div key={`${nextCursor}_${i}`}>
            {items.map((post) => (
              <Article
                key={post.id}
                userUrl={post.author.username ?? ""}
                userImage={post.author.image ?? ""}
                userName={post.author.name ?? ""}
                published={post.publishedAt ?? ""}
                articleUrl={post.slug}
                title={post.title}
                teaser={post.content}
                articleImage={post.image}
              >
                {/* Loop PostTag */}
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/tag/${tag.slug}`}>
                    <Badge variant="secondary" className="truncate font-normal">
                      {tag.title}
                    </Badge>
                  </Link>
                ))}
                {/* End loop PostTag */}
              </Article>
            ))}
          </div>
        );
      })}

      {infiniteQuery.data?.pages[0]?.items.length == 0 && (
        <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
          <span>Postingan Tidak Ditemukan</span>
        </div>
      )}

      {infiniteQuery.isFetchingNextPage && (
        <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
          <LoaderCircle className="animate-spin" />
          <span>Tunggu sebentar</span>
        </div>
      )}
    </div>
  );
}
