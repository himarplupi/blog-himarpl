"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Pen } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeaderLinks = [
  { href: "/me/posts/drafts", label: "Drafts" },
  { href: "/me/posts/public", label: "Published" },
];

export function MeHeader() {
  const pathname = usePathname();

  return (
    <header className="container mt-16 py-4">
      <div className="flex justify-between">
        <h2 className="scroll-m-20 pb-2 font-serif text-3xl font-semibold tracking-wide">
          Postinganku
        </h2>
        <Link href="/new" className={cn(buttonVariants({ size: "sm" }))}>
          <Pen className="mr-2 h-4 w-4" /> Mulai Menulis Postingan
        </Link>
      </div>
      <motion.div layout className="mt-2 flex gap-x-4 border-b">
        {HeaderLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              pathname === href ? "" : "text-muted-foreground",
              "text-center",
            )}
          >
            {label}
            {pathname === href ? (
              <motion.div
                className="h-[1px] w-full bg-muted-foreground"
                layoutId="underline"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
          </Link>
        ))}
      </motion.div>
    </header>
  );
}

export function LayoutAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
