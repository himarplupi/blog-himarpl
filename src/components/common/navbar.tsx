"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Book, LogOut, Menu, Pen, User } from "lucide-react";

import { NavSheet } from "@/components/common/navsheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/images/logo.png";
import { abbreviation, cn } from "@/lib/utils";

const hideNavbarOnRoutes = ["/login"];

export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    !hideNavbarOnRoutes.includes(pathname) && (
      <nav className="fixed top-0 z-10 w-full drop-shadow-md">
        <div className="container flex items-center justify-between bg-primary-foreground py-2 backdrop-blur-md">
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-2">
              <NavSheet>
                <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                </Button>
              </NavSheet>

              <Image src={logo} alt="HIMARPL Logo" width={40} className="" />
              <Link href="/" className="font-serif text-2xl font-bold">
                Blog
              </Link>
            </div>

            <div className="mt-1 hidden items-center gap-x-5 md:flex">
              <Link
                href="/posts"
                className={cn(
                  "text-muted-foreground transition hover:text-muted-foreground/80",
                  pathname === "/" &&
                    "text-foreground hover:text-foreground/80",
                )}
              >
                Post
              </Link>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-x-4">
            <Link
              href="/new"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            >
              <Pen className="mr-2 h-4 w-4" /> Buat
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    {abbreviation(session?.user.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
                <Link href="/me">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profilku
                  </DropdownMenuItem>
                </Link>
                <Link href="/me/posts/drafts">
                  <DropdownMenuItem className="cursor-pointer">
                    <Book className="mr-2 h-4 w-4" />
                    Postinganku
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    )
  );
}
