"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Book, LogOut, Menu, NewspaperIcon, Pen, User } from "lucide-react";

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

import { Nav } from "./nav";

const hideNavbarOnRoutes = ["/login"];

export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    !hideNavbarOnRoutes.includes(pathname) && (
      <nav className="fixed top-0 z-10 w-full drop-shadow-md">
        <div className="container flex items-center gap-x-4 bg-background py-2 backdrop-blur-md sm:justify-between">
          <div className="flex items-center gap-x-5">
            <div className="flex items-center gap-x-2">
              <NavSheet>
                <Button size="icon" variant="outline">
                  <Menu className="h-6 w-6" />
                </Button>
              </NavSheet>

              <Image
                src={logo}
                alt="HIMARPL Logo"
                className="hidden w-12 md:block"
              />
            </div>

            <Nav
              className="hidden md:flex"
              links={[
                {
                  title: "Postingan Terbaru",
                  href: "/",
                  icon: NewspaperIcon,
                  variant: "ghost",
                },
              ]}
            />
          </div>

          {session && (
            <div className="flex w-full items-center gap-x-4 sm:ml-auto sm:w-fit">
              <Link
                href="/new"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full md:min-w-20",
                )}
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
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    )
  );
}
