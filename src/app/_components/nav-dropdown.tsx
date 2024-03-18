"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  ExternalLink,
  Menu,
  LucideHome,
  UsersRound,
  Waypoints,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NavSheet } from "./nav-sheet";
import type { Session } from "next-auth";
import { abbreviation } from "@/lib/utils";
import logo from "@/images/logo.png";

const hideNavbarOnRoutes = ["/login"];

export function NavDropdown({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    !hideNavbarOnRoutes.includes(pathname) && (
      <nav className="fixed top-0 z-10 w-full">
        <div className="container flex items-center justify-between bg-primary-foreground py-2 backdrop-blur-md">
          <div className="flex items-center gap-x-2">
            <Image
              src={logo}
              alt="HIMARPL Logo"
              width={40}
              className="hidden md:block"
            />
            <Link
              href="/"
              className="hidden font-serif text-2xl font-bold tracking-wider transition-all hover:text-foreground/75 md:block "
            >
              {"Blog"}
            </Link>

            <NavSheet>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </NavSheet>
          </div>

          <div className="flex gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user.image ?? ""} />
                  <AvatarFallback>
                    {abbreviation(session?.user.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>

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
