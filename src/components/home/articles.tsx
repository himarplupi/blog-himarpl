"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { LoaderCircle } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Article } from "../common/article";
import { Badge } from "../ui/badge";

export function Articles({ isUserPage }: { isUserPage?: boolean }) {
  const [parentAutoAnimate] = useAutoAnimate();
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

  return (
    <>
      {!isUserPage && (
        <div className="mb-2 overflow-x-hidden pb-2">
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
            <></>
          )}

          <Carousel>
            <CarouselContent className="-ml-2">
              <CarouselItem className="basis-1/7 pl-2">
                {!popularTagQuery.isLoading && (
                  <Button
                    className="rounded-full capitalize"
                    variant={tagQuery == null ? "default" : "outline"}
                    onClick={() => setTagQuery(null)}
                    size="sm"
                  >
                    Terbaru
                  </Button>
                )}
              </CarouselItem>
              {popularTagQuery.data?.map((tag) => (
                <CarouselItem key={tag.id} className="basis-1/7 pl-2">
                  <Button
                    className="rounded-full capitalize"
                    onClick={() => setTagQuery(tag.slug)}
                    variant={tagQuery == tag.slug ? "default" : "outline"}
                    size="sm"
                  >
                    {tag.title}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      <div ref={parentAutoAnimate}>
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
                      articleImage={post.image}
                    >
                      {/* Loop PostTag */}
                      {post.tags.map((tag) => (
                        <Link key={tag.id} href={`/tag/${tag.slug}`}>
                          <Badge
                            variant="secondary"
                            className="truncate font-normal"
                          >
                            {tag.title}
                          </Badge>
                        </Link>
                      ))}
                      {/* End loop PostTag */}
                    </Article>
                  ))}
                </div>
              );
            })
          : null}

        {(infiniteQuery.isFetchingNextPage || popularTagQuery.isLoading) && (
          <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
            <LoaderCircle className="animate-spin" />
            <span>Tunggu sebentar</span>
          </div>
        )}
      </div>
    </>
  );
}
