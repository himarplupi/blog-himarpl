import Link from "next/link";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

import { Navbar } from "@/components/common/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { abbreviation, calculateReadTime, momentId } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function PostPage({
  params,
}: {
  params: {
    username: string;
    slug: string;
  };
}) {
  const session = await getServerAuthSession();
  const username = params.username.substring(3);
  const { post, author } = await api.post.byParams.query({
    slug: params.slug,
    username: username,
  });

  if (!post || !author) {
    return notFound();
  }

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-20 flex min-h-screen flex-col gap-y-4 pb-16 md:px-24 lg:px-48">
        <h2 className="mt-2 scroll-m-20 text-pretty font-serif text-5xl font-bold tracking-tight">
          {post.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Link href={`/tag/${tag.slug}`} key={tag.slug}>
              <Badge variant="secondary" className="truncate font-normal">
                {tag.title}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex gap-x-4">
          <Link href={`/@${author.username}`}>
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={author.image ?? ""}
                alt={author.name + " profile picture"}
              />
              <AvatarFallback>{abbreviation(author.name)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col justify-end gap-y-1">
            <Link href={`/@${author.username}`}>
              <p className="text-sm">{author.name}</p>
            </Link>
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-muted-foreground">
                {calculateReadTime(post.content)} menit baca
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {momentId(post.publishedAt).fromNow()}
              </span>
            </div>
          </div>
        </div>

        <article className="prose prose-invert mt-4 min-h-screen max-w-none lg:prose-xl prose-headings:border-b prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight">
          {parse(post.rawHtml)}
        </article>
      </main>
    </>
  );
}
