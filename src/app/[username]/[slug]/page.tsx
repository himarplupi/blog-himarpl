import { type Metadata, type ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

import { Navbar } from "@/components/common/navbar";
import {
  CopyLink,
  Facebook,
  Instapaper,
  Line,
  Linkedin,
  Telegram,
  Twitter,
  Whatsapp,
} from "@/components/common/share-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { abbreviation, calculateReadTime, momentId } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { api } from "@/trpc/server";

type PostPageProps = {
  params: {
    username: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  const users = await db.user.findMany({
    where: {
      username: {
        not: null,
      },
    },
    select: {
      username: true,
      posts: {
        where: {
          publishedAt: {
            not: null,
          },
        },
        select: {
          slug: true,
        },
      },
    },
  });
  const paths = [];

  for (const user of users) {
    for (const post of user.posts) {
      paths.push({
        username: `@${user.username}`,
        slug: post.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username.substring(3);
  const { post, author } = await api.post.byParams.query({
    slug: params.slug,
    username: username,
  });

  const previousImages = (await parent).openGraph?.images ?? [];

  const cleanContent = post?.content
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
  const description =
    (cleanContent?.length ?? 0) > 160
      ? `${cleanContent?.slice(0, 160)}...`
      : cleanContent;

  return {
    title: `${post?.metaTitle.toUpperCase()} | ${author?.name?.toUpperCase()}`,
    description: description,
    authors: [
      {
        name: author?.name ?? "",
        url: `/@${author?.username}`,
      },
    ],
    keywords: post?.tags?.map((tag) => tag.title) ?? [],
    openGraph: {
      images: [`${post?.image}`, ...previousImages],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const session = await getServerAuthSession();
  const username = params.username.substring(3);
  const { post, author } = await api.post.byParams.query({
    slug: params.slug,
    username: username,
  });

  if (!post || !author) {
    return notFound();
  }

  if (!post.publishedAt) {
    return notFound();
  }

  return (
    <>
      <Navbar session={session} />
      <main role="main">
        <article
          itemScope
          itemType="http://schema.org/Article"
          className="container mt-20 flex min-h-screen flex-col gap-y-4 pb-16 md:px-24 lg:px-48"
        >
          <meta itemProp="postId" content={post.id} />
          <meta
            itemProp="datePublished"
            content={new Date(post.publishedAt).toISOString()}
          />
          <meta
            itemProp="dateModified"
            content={new Date(post.updatedAt).toISOString()}
          />
          <meta
            itemProp="dateCreated"
            content={new Date(post.createdAt).toISOString()}
          />
          <meta itemProp="publisher" content="blog.himarpl.com" />
          {post.image && <meta itemProp="image" content={post.image} />}

          <link
            itemProp="url"
            rel="canonical"
            href={`https://blog.himarpl.com/@${author.username}/${post.slug}`}
          />

          <h1
            itemProp="name headline"
            className="mt-2 text-pretty font-serif text-5xl font-bold leading-none tracking-wider sm:text-7xl sm:leading-tight"
          >
            {post.title}
          </h1>

          <section itemProp="articleBody" className="space-y-4">
            <section className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Link
                  itemProp="genre keywords"
                  href={`/tag/${tag.slug}`}
                  key={tag.slug}
                >
                  <Badge variant="secondary" className="truncate font-normal">
                    {tag.title}
                  </Badge>
                </Link>
              ))}
            </section>

            <section className="mt-4 flex flex-col justify-between gap-x-3 gap-y-6 sm:flex-row">
              <div className="flex items-center gap-x-4">
                <Link rel="author" href={`/@${author.username}`}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={author.image ?? ""}
                      alt={author.name + " profile picture"}
                    />
                    <AvatarFallback>{abbreviation(author.name)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col justify-end gap-y-1">
                  <Link
                    rel="author"
                    itemProp="author"
                    href={`/@${author.username}`}
                    className="text-sm hover:underline"
                  >
                    {author.name}
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

              <div className="flex flex-col gap-x-4 gap-y-1 sm:flex-row sm:items-end">
                <p className="text-sm text-muted-foreground">Bagikan ke: </p>
                <div className="flex flex-wrap items-start sm:max-w-40 lg:max-w-80">
                  <Whatsapp />
                  <Telegram />
                  <Line />
                  <Linkedin />
                  <Instapaper />
                  <Facebook />
                  <Twitter />
                  <CopyLink />
                </div>
              </div>
            </section>

            <section
              itemProp="description text"
              className="prose mt-4 min-h-screen max-w-none dark:prose-invert lg:prose-xl prose-headings:break-words prose-headings:border-b prose-headings:border-border prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-wide prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-p:break-words prose-a:break-words sm:prose-h1:text-6xl sm:prose-h2:text-5xl sm:prose-h3:text-3xl sm:prose-h4:text-2xl sm:prose-h5:text-xl"
            >
              {parse(post.rawHtml)}
            </section>

            <div className="flex items-center justify-center py-4">
              <Link
                itemProp="license"
                rel="license"
                target="_black"
                href="http://creativecommons.org/licenses/by-nc/4.0/"
                className="text-sm text-muted-foreground hover:underline"
              >
                Creative Commons Attribution-NonCommercial 4.0 International
                License
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

export const dynamic = "force-static";
