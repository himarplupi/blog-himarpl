

import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/common/navbar";
import Articles from "@/components/home/Articles";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function UserPage({ params }: { params: { username: string } }) {
  const session = await getServerAuthSession();
  const username = params.username.replace("%40", "");

  const user = await api.user.byUsername.query(username);

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-4 xl:gap-6 xxl:gap-8">
          <div className="lg:py-4 lg:px-6 flex flex-col border-b pb-8 xl:border-0 static lg:overflow-y-scroll lg:top-20 lg:sticky">
            <div className="overflow-hidden w-32 h-32 rounded-full bg-secondary mb-8">
              <Image width={128} height={128} src={user?.image ?? ""} alt={"Photo " + user?.username} />
            </div>
            <p className="text-lg font-bold mb-6">@{user?.username}</p>
            <p className="text-xl font-semibold text-wrap mb-1">{user?.name}</p>
            {user?.department && <p className="capitalize text-lg mb-6">{user?.department.name}</p>}

            <p className="text-wrap mb-6">{user?.bio}</p>

            <h4 className="font-semibold text-lg mb-2">Link Sosial Media</h4>
            <div className="flex flex-col gap-1">
              {user?.socialMedia.map((social, i) => (
                <Link key={i} href={social.url} className="hover:underline underline-offset-4">
                  {social.name} - {social.username}
                </Link>
              ))}
            </div>

            {/* Kondisional berdasar session */}
            {session?.user?.id === user?.id && <Link href={""} className="mt-8"><Button variant={"secondary"}>Edit Profile</Button></Link>}
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-4 lg:gap-y-6">
            <h2 className="font-serif text-2xl font-semibold uppercase tracking-wide first:mt-0">
              Terbaru
            </h2>
            <Articles user={null} topic={null} />
          </div>
        </div>

      </main >
    </>
  );
}
