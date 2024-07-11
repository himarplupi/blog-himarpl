"use client";

import * as React from "react";
import Image from "next/image";
import { NewspaperIcon } from "lucide-react";

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
          className=""
          links={[
            {
              title: "Postingan Terbaru",
              href: "/",
              icon: NewspaperIcon,
              variant: "ghost",
            },
          ]}
        />
      </SheetContent>
    </Sheet>
  );
}
