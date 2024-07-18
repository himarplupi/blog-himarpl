import Link from "next/link";
import { CompassIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

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

export const revalidate = 3600;

export default async function ExploreTagsPage() {
  const parentTagPromises = defaultParentTagTitle.map((tag) =>
    api.postTag.searchSingleWithChildren.query(tag),
  );

  const popularTags = await api.postTag.popular.query();
  const parentTags = await Promise.all(parentTagPromises);

  return (
    <main className="mt-24">
      <div className="container">
        <div className="mb-2 overflow-x-hidden pb-2">
          <Carousel>
            <CarouselContent className="-ml-2">
              <CarouselItem className="basis-1/7 pl-2">
                <Button
                  className="rounded-full capitalize"
                  variant="default"
                  size="sm"
                >
                  <CompassIcon className="mr-2 h-5 w-5" />
                  Telusuri Label
                </Button>
              </CarouselItem>
              {popularTags?.map((tag) => (
                <CarouselItem key={tag.id} className="basis-1/7 pl-2">
                  <Link
                    href={`/tag/${tag.slug}`}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "sm",
                      }),
                      "rounded-full capitalize",
                    )}
                  >
                    {tag.title}
                  </Link>
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
            {parentTags.map((tag) => (
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
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
