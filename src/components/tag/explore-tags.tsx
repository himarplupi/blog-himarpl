"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CompassIcon } from "lucide-react";

import { api } from "@/trpc/react";

import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

const defaultParentTagTitle = [
  "berita",
  "penelitian",
  "kompetisi",
  "pengembangan diri",
  "perkuliahan",
  "teknologi",
  "perangkat lunak",
  "sosial",
  "media",
];

export function ExploreTags() {
  const popularTagQuery = api.postTag.popular.useQuery();
  const defaultParentTags = api.useQueries((t) =>
    defaultParentTagTitle.map((tag) => t.postTag.searchSingleWithChildren(tag)),
  );
  const pathname = usePathname();
  const router = useRouter();
  const currentTag = pathname.split("/").pop();

  useEffect(() => {
    defaultParentTags.forEach((tag) => {
      console.log(tag);
    });
  }, [defaultParentTags]);

  return (
    <div className="container">
      <div className="mb-2 overflow-x-hidden pb-2">
        <Carousel>
          <CarouselContent className="-ml-2">
            <CarouselItem className="basis-1/7 pl-2">
              <Button
                className="rounded-full capitalize"
                variant={currentTag == "explore-tags" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (currentTag != "explore-tags") {
                    router.push(`/explore-tags`);
                  }
                }}
              >
                <CompassIcon className="mr-2 h-5 w-5" />
                Telusuri Label
              </Button>
            </CarouselItem>
            {popularTagQuery.data?.map((tag) => (
              <CarouselItem key={tag.id} className="basis-1/7 pl-2">
                <Button
                  className="rounded-full capitalize"
                  onClick={() => router.push(`/tag/${tag.slug}`)}
                  variant={currentTag == tag.slug ? "default" : "outline"}
                  size="sm"
                >
                  {tag.title}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="mt-6">
        <h2 className="pb-2 text-center font-serif text-3xl font-bold italic tracking-wide first:mt-0">
          Telusuri Label
        </h2>

        <ul className="my-6 ml-6 grid list-none grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 [&>li]:mt-2">
          {defaultParentTags.map((tagQuery, index) => {
            if (tagQuery.isLoading) {
              return (
                <li key={defaultParentTagTitle[index]}>
                  <Skeleton className="h-8 w-full" />
                </li>
              );
            }

            const tag = tagQuery.data;

            return (
              <li key={tag?.id}>
                <h6 className="text-wrap text-lg font-semibold uppercase">
                  <Link className="hover:underline" href={`/tag/${tag?.slug}`}>
                    {tag?.title}
                  </Link>
                </h6>
                <ul className="my-3 ml-6 list-none [&>li]:mt-2">
                  {tag?.children.map((child) => (
                    <li
                      key={child.id}
                      className="text-wrap text-sm font-medium uppercase leading-none text-muted-foreground"
                    >
                      <Link
                        className="hover:underline"
                        href={`/tag/${child.slug}`}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
