"use client";

import * as React from "react";
import Image from "next/image";
import { ListTreeIcon, NewspaperIcon, SearchIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/images/logo.png";

import { Nav } from "./nav";

export function NavSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="sm:w-[512px]">
        <SheetHeader className="mt-6 flex flex-row items-center justify-center gap-x-2">
          <Image src={logo} alt="HIMARPL Logo" width={40} />
        </SheetHeader>

        <Nav
          className="mt-6"
          links={[
            {
              title: "Postingan Terbaru",
              href: "/",
              icon: NewspaperIcon,
              variant: "ghost",
            },
            {
              title: "Telusuri Label",
              href: "/explore-tags",
              icon: ListTreeIcon,
              variant: "ghost",
            },
            {
              title: "Cari Postingan",
              href: "/search",
              icon: SearchIcon,
              variant: "ghost",
            },
          ]}
        />
      </SheetContent>
    </Sheet>
  );
}
