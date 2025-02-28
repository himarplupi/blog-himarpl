"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Book, LogOut, Pen, SearchIcon, User } from "lucide-react";

import { NavSearchInput } from "@/components/search/nav-search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/images/logo.png";
import { abbreviation, cn } from "@/lib/utils";

import { ModeToggle } from "./mode-toggle";

const hideNavbarOnRoutes = ["/login"];

export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    !hideNavbarOnRoutes.includes(pathname) && (
      <nav className="fixed top-0 z-10 w-full drop-shadow-md">
        <div className="container flex items-center justify-between gap-x-4 bg-background py-2 backdrop-blur-md">
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Image src={logo} alt="HIMARPL Logo" className="w-12" />
              </Link>
            </div>

            <NavSearchInput />
          </div>

          {session && (
            <div className="flex items-center gap-x-4">
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "w-10 md:hidden",
                )}
              >
                <SearchIcon className="h-5 w-5" />
              </Link>

              <ModeToggle isCollapsed />

              <Link
                href="/new"
                prefetch={false}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "h-10 w-10 md:min-w-20",
                )}
              >
                <Pen className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline"> Buat</span>
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
                  <Link href={`/@${session?.user.username}`}>
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
          )}

          {!session && (
            <div className="flex items-center gap-x-4">
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "w-10 md:hidden",
                )}
              >
                <SearchIcon className="h-5 w-5" />
              </Link>

              <ModeToggle isCollapsed />

              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                )}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    )
  );
}
