import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Navbar } from "@/components/common/navbar";
import { Articles } from "@/components/home/articles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";

type UserPageProps = {
  params: { username: string };
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
    },
  });

  return users.map((user) => ({
    username: `@${user.username}`,
  }));
}

export async function generateMetadata(
  { params }: UserPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username.replace("%40", "");
  const user = await db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
    select: {
      name: true,
      positions: true,
      username: true,
      bio: true,
      departments: {
        select: {
          acronym: true,
        },
      },
      image: true,
    },
  });

  if (!user) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images ?? [];
  const description =
    (user?.bio ?? "").length > 1
      ? (user.bio ?? "")
      : `Mengenal lebih dekat ${user?.name}, simak selengkapnya di sini!`;
  const title = `${user?.name ? user.name.toUpperCase() : ""} ${user?.positions?.at(-1) ? user.positions?.at(-1)?.name.toUpperCase() : ""} ${user?.departments?.at(-1) ? user.departments?.at(-1)?.acronym.toUpperCase() : ""}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://blog.himarpl.com/@${user?.username}`,
      siteName: "Blog HIMARPL",
      images: [...previousImages, `${user?.image}`],
    },
    twitter: {
      title: title,
      description: description,
      card: "summary_large_image",
      creator: `@${user.username}`,
      images: [...previousImages, `${user?.image}`],
    },
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const session = await getServerAuthSession();
  const username = params.username.replace("%40", "");

  const user = await api.user.byUsername.query(username);

  if (!user) {
    return notFound();
  }

  if (session?.user.id == user.id) {
    if (!session.user.username) {
      return redirect("/register/username");
    }
  }

  return (
    <>
      <Navbar session={session} />
      <main role="main" className="container mx-auto mt-16 min-h-screen py-8">
        <article
          itemScope
          itemType="http://schema.org/Person"
          className="xxl:gap-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 xl:gap-6"
        >
          <meta itemProp="identifier" content={user.id} />
          <div className="static flex flex-col pb-8 md:sticky md:top-20 md:overflow-y-scroll md:px-6 md:py-4 xl:border-0">
            {user?.image && (
              <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full bg-secondary">
                <Image
                  itemProp="image"
                  fill
                  sizes="100%"
                  className="scale-110 object-cover object-center"
                  src={user.image}
                  alt={user?.name + " Photo"}
                />
              </div>
            )}
            <h2 itemProp="alternateName" className="mb-6 text-lg font-bold">
              @{user?.username}
            </h2>
            <h1
              itemProp="name"
              className="mb-3 text-wrap text-xl font-semibold"
            >
              {user?.name}
            </h1>

            {user?.departments?.at(-1) && (
              <>
                {user?.departments?.at(-1)?.name === "pimpinan" ? (
                  <p
                    itemProp="jobTitle"
                    className="mb-1 text-lg capitalize"
                  >{`${user?.positions?.at(-1)?.name}`}</p>
                ) : (
                  <p itemProp="jobTitle" className="mb-1 text-lg capitalize">
                    {`${user?.positions?.at(-1)?.name} ${user?.departments?.at(-1)?.acronym}`}
                  </p>
                )}

                <p itemProp="jobTitle" className="mb-6 text-lg capitalize">
                  {`${user?.departments?.at(-1)?.type === "BE" ? "Badan Eksekutif" : "Dewan Perwakilan"}`}
                </p>
              </>
            )}

            <p itemProp="description" className="mb-6 text-wrap">
              {user?.bio}
            </p>

            <h4 className="mb-2 text-lg font-semibold">Media Sosial</h4>
            <div className="flex flex-col gap-1">
              {user?.socialMedias.map((social, i) => (
                <Link
                  itemProp="url"
                  key={i}
                  href={social.url}
                  target="_blank"
                  className="flex w-fit items-center gap-x-2 underline-offset-4 hover:underline"
                >
                  {social.name === "instagram" ? (
                    <SiInstagram className="h-4 w-4" />
                  ) : (
                    <SiGithub className="h-4 w-4" />
                  )}
                  {social.username}
                </Link>
              ))}
            </div>

            {/* Kondisional berdasar session */}
            {session?.user?.id === user?.id && (
              <Link href={"/me"} className={cn(buttonVariants(), "mt-8")}>
                Edit Profile
              </Link>
            )}
          </div>

          <div className="col-span-1 flex flex-col gap-y-4 md:col-span-2 md:gap-y-6">
            <h2 className="font-serif text-3xl font-bold italic tracking-wide first:mt-0">
              Postingan Terbaru
            </h2>
            <Articles authorId={user?.id} />
          </div>
        </article>
      </main>
    </>
  );
}
