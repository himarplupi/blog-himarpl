"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import * as MenuItems from "./menu-items";

export function EditorMenu() {
  return (
    <MenuItems.LinkMenuProvider>
      <aside
        key="menu"
        className={cn(
          "fixed bottom-0 z-20 w-full bg-primary-foreground duration-500 ease-in-out animate-in slide-in-from-bottom-24 md:container md:bottom-auto md:top-14 md:slide-in-from-top-24 ",
        )}
      >
        <Carousel
          className="z-20 w-full bg-muted/50 px-2 py-1 md:rounded-full"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="mx-2">
            <CarouselItem className="basis-auto pl-1">
              <MenuItems.Undo />
            </CarouselItem>

            <CarouselItem className="basis-auto pl-1">
              <MenuItems.Redo />
            </CarouselItem>

            <CarouselItem className="basis-auto pl-1">
              <Separator orientation="vertical" />
            </CarouselItem>

            <MenuItems.HeadingsProvider>
              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Heading2 />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Heading3 />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Heading4 />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Heading5 />
              </CarouselItem>
            </MenuItems.HeadingsProvider>

            <CarouselItem className="basis-auto pl-1">
              <Separator orientation="vertical" />
            </CarouselItem>

            <MenuItems.TextFormatsProvider>
              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Bold />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Italic />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Underline />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Strike />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Code />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Superscript />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Subscript />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Blockquote />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.Highlight />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.CodeBlock />
              </CarouselItem>
            </MenuItems.TextFormatsProvider>

            <CarouselItem className="basis-auto pl-1">
              <Separator orientation="vertical" />
            </CarouselItem>

            <MenuItems.ListsProvider>
              <CarouselItem className="basis-auto pl-1">
                <MenuItems.OrderedList />
              </CarouselItem>

              <CarouselItem className="basis-auto pl-1">
                <MenuItems.BulletList />
              </CarouselItem>
            </MenuItems.ListsProvider>

            <CarouselItem className="basis-auto pl-1">
              <Separator orientation="vertical" />
            </CarouselItem>

            <CarouselItem className="basis-auto pl-1">
              <MenuItems.Link />
            </CarouselItem>

            <CarouselItem className="basis-auto pl-1">
              <MenuItems.Image />
            </CarouselItem>

            <CarouselItem className="basis-auto pl-1">
              <MenuItems.Youtube />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </aside>

      <MenuItems.LinkInput />
    </MenuItems.LinkMenuProvider>
  );
}
