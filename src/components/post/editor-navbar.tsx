"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { ExternalLink, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/images/logo.png";
import { abbreviation } from "@/lib/utils";

import { EditorContext } from "./editor-context";
import { EditorMenu } from "./editor-menu";

export function EditorNavbar({ session }: { session: Session | null }) {
  const { isSaving } = useContext(EditorContext);

  return (
    <nav className="container fixed top-0 z-10 w-full space-y-2 bg-primary-foreground py-2 drop-shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Image src={logo} alt="HIMARPL Logo" width={40} />
            <Link
              href="/me/posts/drafts"
              className="hidden font-serif text-lg text-foreground/80 sm:inline"
            >
              <strong>Draft</strong> in @{session?.user.username}
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            {isSaving && (
              <p className="font-serif text-lg text-foreground/80">Saving...</p>
            )}
            {!isSaving && (
              <p className="font-serif text-lg text-foreground/80">Saved</p>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-x-4">
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

      <EditorMenu />
    </nav>
  );
}
