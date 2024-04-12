"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ChevronDown, Circle } from "lucide-react";
import { MePostContext } from "@/components/post/me-post-context";
import {
  getFirstImageSrc,
  getContent,
  calculateReadTime,
  momentId,
} from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DeleteAlertContent,
  DeleteAlertTrigger,
  DeleteAlertWrapper,
} from "@/components/post/delete-alert";

export default function DraftsPage() {
  const {
    draftPosts: posts,
    setDraftPosts: setPosts,
    session,
  } = useContext(MePostContext);
  const user = session?.user;

  const onDelete = (item: { slug: string; authorId: string }) => {
    if (!setPosts) return;

    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.slug !== item.slug),
    );
  };

  return (
    <main className="container min-h-screen">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-y-2 rounded py-4">
          <Link href={`/@${user?.username}/${post.slug}/edit`}>
            <div className="flex-grow justify-between gap-x-4 sm:flex">
              <div className="w-fit">
                <h3 className="line-clamp-2 text-pretty font-serif text-xl font-bold capitalize leading-7 sm:text-2xl">
                  {post.title.length > 0
                    ? getContent(post.title)
                    : "Tidak ada judul"}
                </h3>
                <p className="line-clamp-3 text-pretty text-sm leading-5 tracking-wide">
                  {getContent(post.content)}
                </p>
              </div>
              {getFirstImageSrc(post.content) && (
                <div className="relative mt-2 aspect-video w-full max-w-96 overflow-hidden rounded sm:w-32">
                  <Image
                    src={getFirstImageSrc(post.content) ?? ""}
                    alt={`${post.title} thumbnail`}
                    className="object-cover object-center"
                    fill
                  />
                </div>
              )}
            </div>
          </Link>
          <div className="mt-2 flex items-center gap-x-2">
            {post.category && (
              <Badge variant="secondary" className="truncate font-normal">
                {post.category.title}
              </Badge>
            )}
            <span className="text-nowrap text-sm text-muted-foreground">
              {`Diubah ${momentId(post.updatedAt).fromNow()}`}
            </span>
            <span>
              <Circle fill="hsl(var(--muted-foreground))" className="h-1 w-1" />
            </span>
            <span className="text-nowrap text-sm text-muted-foreground">
              {`${calculateReadTime(post.content)} menit baca`}
            </span>
            <div>
              <DeleteAlertWrapper>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href={`/@${user?.username}/${post.slug}/edit`}>
                      <DropdownMenuItem>Ubah</DropdownMenuItem>
                    </Link>
                    <DeleteAlertTrigger>
                      <DropdownMenuItem className="text-destructive hover:!text-destructive">
                        Hapus
                      </DropdownMenuItem>
                    </DeleteAlertTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DeleteAlertContent
                  authorId={user?.id ?? ""}
                  slug={post.slug}
                  onDelete={onDelete}
                />
              </DeleteAlertWrapper>
            </div>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-pretty text-lg">Tidak ada postingan draft</p>
        </div>
      )}
    </main>
  );
}