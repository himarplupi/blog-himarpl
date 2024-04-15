"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";

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
          <motion.div className="z-20 flex h-10 items-center gap-x-1 rounded-full bg-muted/50 px-3 py-1">
            <MenuItems.Undo />

            <MenuItems.Redo />

            <Separator orientation="vertical" />

            <MenuItems.Headings />

            <Separator orientation="vertical" />

            <MenuItems.TextFormatsProvider>
              <MenuItems.Bold />
              <MenuItems.Italic />
              <MenuItems.Underline />
              <MenuItems.Strike />
              <MenuItems.Code />
              <MenuItems.Superscript />
              <MenuItems.Subscript />
              <MenuItems.Blockquote />
              <MenuItems.Highlight />
              <MenuItems.CodeBlock />
            </MenuItems.TextFormatsProvider>

            <Separator orientation="vertical" />

            <MenuItems.Lists />

            <Separator orientation="vertical" />

            <MenuItems.Link />
            <MenuItems.Image />
            <MenuItems.Youtube />
          </motion.div>
        </motion.aside>

        <MenuItems.LinkInput />
      </MenuItems.LinkMenuProvider>
    </AnimatePresence>
  );
}
