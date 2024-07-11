"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  Book,
  CompassIcon,
  LogOut,
  Pen,
  SearchIcon,
  User,
  XIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import logo from "@/images/logo.png";
import { abbreviation, cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

import { Input } from "../ui/input";

const hideNavbarOnRoutes = ["/login"];

function NavSearchInput() {
  const { searchHistory, removeFromSearchHistory } = useSearchHistory();
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  return (
    <div className="group relative hidden md:flex">
      <Label
        htmlFor="search-input"
        className={cn(
          "absolute left-0 top-0 flex h-full w-10 items-center justify-center bg-transparent",
        )}
      >
        <SearchIcon className="h-5 w-5" />
      </Label>
      <Input
        type="search"
        className="pl-10 md:min-w-80"
        id="search-input"
        placeholder="Cari"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?q=${search}`);
          }
        }}
      />

      <ul className="absolute left-0 right-0 top-full z-50 mt-2 hidden overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md duration-300 animate-in fade-in slide-in-from-top-5 group-focus-within:block">
        {searchHistory.length > 0 && (
          <div>
            <p className="px-2 py-1.5 text-sm font-medium">Pencarian Terbaru</p>
            {searchHistory.map((history) => (
              <div className="flex items-center" key={history}>
                <Link
                  href={`/search?q=${history}`}
                  className="flex h-10 basis-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <SearchIcon className="mr-2 h-5 w-5" />
                  {history}
                </Link>
                <Button
                  onClick={() => {
                    removeFromSearchHistory(history);
                  }}
                  size="icon"
                  variant="ghost"
                  className="basis-auto"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center">
          <Link
            href={"/explore-tags"}
            className="flex h-10 basis-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <CompassIcon className="mr-2 h-5 w-5" />
            Telusuri Label
          </Link>
        </div>
      </ul>
    </div>
  );
}

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

              <Link
                href="/new"
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
