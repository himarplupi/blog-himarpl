import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/common/navbar";
import { Articles } from "@/components/home/articles";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();
  const username = params.username.replace("%40", "");

  const user = await api.user.byUsername.query(username);

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
            <p className="mb-1 text-wrap text-xl font-semibold">{user?.name}</p>
            {user?.department && (
              <p className="mb-6 text-lg capitalize">{user?.department.name}</p>
            )}

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
