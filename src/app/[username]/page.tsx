import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { Navbar } from "@/components/common/navbar";
import { Articles } from "@/components/home/articles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

type UserPageProps = {
  params: { username: string };
};

export async function generateMetadata(
  { params }: UserPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username.replace("%40", "");
  const user = await api.user.byUsername.query(username);
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: `${user?.name?.toUpperCase()} ${user?.position?.toUpperCase()} ${user?.department?.acronym.toUpperCase()}`,
    description: `Mengenal lebih dekat ${user?.name}, simak selengkapnya di sini!`,
    openGraph: {
      images: [`${user?.image}`, ...previousImages],
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
      <main className="container mx-auto mt-16 min-h-screen py-8">
        <div className="xxl:gap-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 xl:gap-6">
          <div className="static flex flex-col pb-8 md:sticky md:top-20 md:overflow-y-scroll md:px-6 md:py-4 xl:border-0">
            <div className="mb-8 h-32 w-32 overflow-hidden rounded-full bg-secondary">
              <Image
                width={128}
                height={128}
                src={user?.image ?? ""}
                alt={"Photo " + user?.username}
              />
            </div>
            <p className="mb-6 text-lg font-bold">@{user?.username}</p>
            <p className="mb-3 text-wrap text-xl font-semibold">{user?.name}</p>

            {user?.department?.name === "pimpinan" ? (
              <p className="mb-1 text-lg capitalize">{`${user?.position}`}</p>
            ) : (
              <p className="mb-1 text-lg capitalize">
                {`${user?.position} ${user?.department?.acronym}`}
              </p>
            )}

            <p className="mb-6 text-lg capitalize">
              {`${user?.department?.type === "BE" ? "Badan Eksekutif" : "Dewan Perwakilan"}`}
            </p>

            <p className="mb-6 text-wrap">{user?.bio}</p>

            <h4 className="mb-2 text-lg font-semibold">Link Sosial Media</h4>
            <div className="flex flex-col gap-1">
              {user?.socialMedia.map((social, i) => (
                <Link
                  key={i}
                  href={social.url}
                  className="underline-offset-4 hover:underline"
                >
                  {social.name} - {social.username}
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
        </div>
      </main>
    </>
  );
}
