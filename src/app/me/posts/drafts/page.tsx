"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Circle, LoaderCircle } from "lucide-react";

import { MePostContext } from "@/components/me/me-post-context";
import {
  DeleteAlertContent,
  DeleteAlertTrigger,
  DeleteAlertWrapper,
} from "@/components/post/delete-alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateReadTime, getContent, momentId } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function DraftsPostPage() {
  const { session } = useContext(MePostContext);
  const user = session?.user;
  const draftPostsQuery = api.post.selectSelfDrafts.useQuery();
  const [parentAutoAnimate] = useAutoAnimate(/* optional config */);

  return (
    <main className="container min-h-screen" ref={parentAutoAnimate}>
      {draftPostsQuery.isLoading && (
        <div className="flex h-64 items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {draftPostsQuery?.data?.map((post) => (
        <div key={post.id} className="flex flex-col gap-y-2 rounded py-4">
          <Link href={`/@${user?.username}/${post.slug}/edit`}>
            <div className="flex-grow justify-between gap-x-4 sm:flex">
              <div className="w-fit">
                <h3 className="line-clamp-2 text-pretty font-serif text-xl font-bold capitalize leading-7 sm:text-2xl">
                  {post.title.length > 0 ? post.title : "Tidak ada judul"}
                </h3>
                <p className="line-clamp-3 text-pretty text-sm leading-5 tracking-wide">
                  {getContent(post.content)}
                </p>
              </div>
              {post?.image && (
                <div className="relative mt-2 aspect-video w-full max-w-96 overflow-hidden rounded sm:w-32">
                  <Image
                    src={post.image ?? ""}
                    alt={`${post.title} thumbnail`}
                    className="object-cover object-center"
                    fill
                  />
                </div>
              )}
            </div>
          </Link>
          <div className="mt-2 flex items-center gap-x-2">
            <div className="flex max-w-64 flex-wrap gap-x-1 gap-y-2">
              {post.tags?.map((tag) => (
                <Badge
                  key={tag.slug}
                  variant="secondary"
                  className="truncate font-normal"
                >
                  {tag.title}
                </Badge>
              ))}
            </div>
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
                />
              </DeleteAlertWrapper>
            </div>
          </div>
        </div>
      ))}

      {draftPostsQuery?.data?.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-pretty text-lg">Tidak ada postingan draft</p>
        </div>
      )}
    </main>
  );
}
