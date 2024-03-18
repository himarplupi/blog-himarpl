"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";
import { LucideHome, UsersRound, Waypoints } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import logo from "@/images/logo.png";

export function NavSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const href = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="sm:w-[512px]">
        <SheetHeader
          className="mt-6 flex cursor-pointer flex-row items-center gap-x-2"
          onClick={() => href("/")}
        >
          <Image src={logo} alt="HIMARPL Logo" width={40} />
          <SheetTitle className="!mt-0 font-serif text-2xl font-bold tracking-wider">
            {"Blog"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-3 grid grid-cols-1 gap-y-2">
          {/* <Button
            variant="outline"
            onClick={() => href("/")}
            className="justify-start gap-x-2"
          >
            <LucideHome className="ml-2 h-4 w-4" />
            Overview
          </Button> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
