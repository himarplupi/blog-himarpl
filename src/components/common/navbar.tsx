"use client";

import * as React from "react";
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
import type { Session } from "next-auth";
import { abbreviation } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const hideNavbarOnRoutes = ["/login"];

export function Navbar({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    !hideNavbarOnRoutes.includes(pathname) && (
      <nav className="fixed top-0 z-10 w-full">
        <div className="container flex items-center justify-between bg-primary/5 py-2 backdrop-blur-md">
          <div className="flex items-center gap-x-2">
            <h1 className="mr-4 hidden text-2xl font-bold md:block">
              HIMARPL Admin
            </h1>

            <NavSheet>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </NavSheet>

            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="hidden justify-start gap-x-2 md:inline-flex"
            >
              <LucideHome className="ml-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/users")}
              className="hidden justify-start gap-x-2 md:inline-flex"
            >
              <UsersRound className="ml-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/departments")}
              className="hidden justify-start gap-x-2 md:inline-flex"
            >
              <Waypoints className="ml-2 h-4 w-4" />
              Departments
            </Button>
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
        <SheetHeader className="mt-6">
          <SheetTitle className="text-left">HIMARPL Admin</SheetTitle>
        </SheetHeader>
        <div className="mt-3 grid grid-cols-1 gap-y-2">
          <Button
            variant="outline"
            onClick={() => href("/")}
            className="justify-start gap-x-2"
          >
            <LucideHome className="ml-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant="outline"
            onClick={() => href("/users")}
            className="justify-start gap-x-2"
          >
            <UsersRound className="ml-2 h-4 w-4" />
            Manage Users
          </Button>
          <Button
            variant="outline"
            onClick={() => href("/departments")}
            className="justify-start gap-x-2"
          >
            <Waypoints className="ml-2 h-4 w-4" />
            Manage Departments
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
