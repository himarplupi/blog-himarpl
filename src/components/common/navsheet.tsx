"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/images/logo.png";
import { cn } from "@/lib/utils";

export function NavSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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
          <Link
            onClick={() => setOpen(false)}
            href="/"
            className={cn(
              "flex items-center text-muted-foreground transition hover:text-muted-foreground/80",
              pathname === "/" && "text-foreground hover:text-foreground/80",
            )}
          >
            Beranda
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
