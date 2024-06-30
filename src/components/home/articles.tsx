"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { LoaderCircle } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import { Article } from "../common/article";

export function Articles({ user }: { user: string | null }) {
  const [tagQuery, setTagQuery] = useQueryState("tag");
  const popularTagQuery = api.postTag.popular.useQuery();
  const infiniteQuery = api.post.infiniteByTag.useInfiniteQuery(
    {
      tagSlug: tagQuery,
      limit: 10,
    },
    {
      queryKey: ["post.infiniteByTag", { tagSlug: tagQuery, limit: 10 }],
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    if (!tagQuery) return;
    if (!popularTagQuery.data) return;
    const tagSlugs = popularTagQuery.data.map((tag) => tag.slug);

    if (!tagSlugs.includes(tagQuery)) {
      // eslint-disable-next-line
      setTagQuery(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagQuery, popularTagQuery.data]);

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

  if (user != null) {
    // get post by user
  }

  return (
    <>
      {user != null && (
        <div className="mb-2 flex gap-2 overflow-x-scroll pb-2">
          {popularTagQuery.isLoading ? (
            <Button
              disabled
              className="rounded-full capitalize"
              variant={"outline"}
              size="sm"
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              className="rounded-full capitalize"
              variant={tagQuery == null ? "default" : "outline"}
              onClick={() => setTagQuery(null)}
              size="sm"
            >
              Terbaru
            </Button>
          )}

          {popularTagQuery.data?.map((tag) => (
            <Button
              className="rounded-full capitalize"
              onClick={() => setTagQuery(tag.slug)}
              variant={tagQuery == tag.slug ? "default" : "outline"}
              key={tag.id}
              size="sm"
            >
              {tag.title}
            </Button>
          ))}
        </div>
      )}

      {infiniteQuery.data
        ? infiniteQuery.data.pages.map(({ items, nextCursor }, i) => {
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
                    articleImage={
                      post.image ??
                      "https://placehold.co/400x200/EEE/31343C/png?font=montserrat&text=No+Image"
                    }
                  >
                    {/* Loop PostTag */}
                    {post.tags.map((tag) => (
                      <Link key={tag.id} href={`/tag/${tag.slug}`}>
                        <Button
                          size="sm"
                          className="rounded-full"
                          variant="secondary"
                        >
                          {tag.title}
                        </Button>
                      </Link>
                    ))}
                    {/* End loop PostTag */}
                  </Article>
                ))}
              </div>
            );
          })
        : null}

      {infiniteQuery.isFetchingNextPage && (
        <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
          <LoaderCircle className="animate-spin" />
          <span>Tunggu sebentar</span>
        </div>
      )}
    </>
  );
}