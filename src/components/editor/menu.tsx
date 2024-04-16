"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import * as MenuItems from "./menu-items";

export function EditorMenu() {
  return (
    <AnimatePresence>
      <MenuItems.LinkMenuProvider>
        <motion.aside
          key="menu"
          className="container fixed top-14 z-20 w-full bg-primary-foreground pb-2"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          onAnimationEnd={(e) => (e.currentTarget.style.zIndex = "30")}
          transition={{ duration: 0.25, delay: 0.5 }}
        >
          <Carousel
            className="z-20 w-full rounded-full bg-muted/50 px-2 py-1"
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
        </motion.aside>

        <MenuItems.LinkInput />
      </MenuItems.LinkMenuProvider>
    </AnimatePresence>
  );
}
