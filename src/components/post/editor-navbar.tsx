"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { abbreviation } from "@/lib/utils";
import logo from "@/images/logo.png";
import type { Session } from "next-auth";
import { EditorContext } from "./editor-context";

export function EditorNavbar({ session }: { session: Session | null }) {
  const { isSaving } = React.useContext(EditorContext);

  return (
    <nav className="fixed top-0 z-10 w-full drop-shadow-md">
      <div className="container flex items-center justify-between bg-primary-foreground py-2 backdrop-blur-md">
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
    </nav>
  );
}
