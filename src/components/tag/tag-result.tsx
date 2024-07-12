"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { CompassIcon, LoaderCircle, MoreHorizontalIcon } from "lucide-react";

import { api } from "@/trpc/react";

import { Sidebar } from "../home/sidebar";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { TagResultItems } from "./tag-result-items";

export function TagResult() {
  const router = useRouter();
  const { "tag-slug": rawTagSlug } = useParams<{
    "tag-slug": string;
  }>();
  const tagSlug = React.useMemo(
    () => rawTagSlug?.toLowerCase() ?? "",
    [rawTagSlug],
  );

  const currentTag = api.postTag.searchUnique.useQuery({
    slug: tagSlug,
  });

  const relatedTagsQuery = api.postTag.related.useQuery({
    tagSlug: tagSlug,
    take: 100,
  });
  const relatedTags = React.useMemo(
    () => relatedTagsQuery.data?.filter((tag) => tag.slug !== tagSlug),
    [tagSlug, relatedTagsQuery.data],
  );

  return (
    <div className="container">
      <div className="mb-4 overflow-x-hidden pb-2">
        {relatedTagsQuery.isLoading ? (
          <Button
            disabled
            className="rounded-full capitalize"
            variant={"outline"}
            size="sm"
          >
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Carousel>
            <CarouselContent className="-ml-2">
              <CarouselItem className="basis-1/7 pl-2">
                <Button
                  className="rounded-full capitalize"
                  variant={"outline"}
                  size="sm"
                  onClick={() => {
                    router.push(`/explore-tags`);
                  }}
                >
                  <CompassIcon className="mr-2 h-5 w-5" />
                  Telusuri Label
                </Button>
              </CarouselItem>
              <CarouselItem className="basis-1/7 pl-2">
                <Button
                  className="rounded-full capitalize"
                  variant={currentTag.data?.title ? "default" : "destructive"}
                  size="sm"
                >
                  {currentTag.data?.title ?? "Label Tidak Ditemukan"}
                </Button>
              </CarouselItem>
              {relatedTags?.map((tag) => (
                <CarouselItem key={tag.id} className="basis-1/7 pl-2">
                  <Button
                    className="rounded-full capitalize"
                    onClick={() => router.push(`/tag/${tag.slug}`)}
                    variant={"outline"}
                    size="sm"
                  >
                    {tag.title}
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <div className="mb-2 flex scroll-m-20 items-center justify-between pb-2">
        <h2 className="font-serif text-3xl font-bold uppercase italic tracking-wide first:mt-0">
          {currentTag.data?.title}
        </h2>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full px-0">
              <Sidebar tagSlug={tagSlug} type="mobile" />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="xxl:gap-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-6">
        <div className="col-span-1 flex flex-col gap-y-4 pb-6 lg:col-span-2 lg:gap-y-6">
          <TagResultItems
            tagSlug={tagSlug}
            isLoading={relatedTagsQuery.isLoading || currentTag.isLoading}
          />
        </div>
        <Sidebar tagSlug={tagSlug} type="desktop" />
      </div>
    </div>
  );
}
