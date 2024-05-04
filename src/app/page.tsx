
import Link from "next/link";

import Article from "@/components/common/article";
import { Navbar } from "@/components/common/navbar";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";



export default async function Home() {
  const session = await getServerAuthSession();
  // const popularPostTags = await api.postTag.popular.query();
  const posts = await api.post.all.query();

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8 mx-auto">
        <div className="scroll-m-20 border-b pb-2 flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
            Home
          </h2>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-6 xxl:gap-8">
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-4 lg:gap-y-6">
            {posts.map((post) => (
              <Article key={post.id}
                userUrl={post.author.username ?? ""}
                userImage={post.author.image ?? ""}
                userName={post.author.name ?? ""}
                published={post.publishedAt ?? ""}
                articleUrl={post.slug ?? ""}
                title={post.title}
                teaser={post.content}
                articleImage={post.image ?? ""}
              >
                {post.tags.map((tag) => (
                  <Link key={tag.slug} href={`/tag/${tag.slug}`} >
                    <Button className="rounded-full" variant={"secondary"} size={"sm"}>{tag.title}</Button>
                  </Link>
                ))}
              </Article>
            ))}
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            <Sidebar />
          </div>
        </div>

      </main>
      {/* <div>
        <div className="flex gap-1 md:gap-2 items-center mb-2">
          <Link href={""} className="font-light hover:underline underline-offset-4 flex items-center gap-2 md:gap-3 text-sm">
            <div className="aspect-square overflow-hidden rounded-full">
              <Image className="h-5 w-5" src={"https://avatars.githubusercontent.com/u/130320055?v=4"} width={16} height={16} alt="" />
            </div>
            <p className="mb-0">
              Muhammad Padli
            </p>
          </Link>
          <span className="block rounded-full w-1 h-1 border border-foreground"></span>
          <p className="font-extralight text-sm">Kam, 27 Apr 24</p>
        </div>
        <div className="grid grid-cols-3 gap-x-4 ">
          <div className="col-span-2">
            <Link href={""} className="font-semibold hover:underline underline-offset-4">Ini judul artikel Lorem ipsum dolor sit amet.</Link>
            <p className="mt-2 hidden lg:inline-block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed fuga voluptatibus, provident in, neque nam iste dolorem explicabo ipsum rerum quod deserunt nisi repudiandae. Tempore!</p>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
              <Link href={""} >
                <Button className="rounded-full" variant={"secondary"} size={"sm"}>Link</Button>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden aspect-video rounded-md">
            <Image src={"https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfDB8MHx8fDI%3D"} width={32} height={32} alt="" className="w-full" />
          </div>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 border-b">
          {popularPostTags.map((tag) => (
            <div key={tag.id} className="rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold">{tag.title}</h3>
              <p className="text-muted-foreground">{tag._count.posts} posts</p>
            </div>
          ))}
        </div>
        <div className="border-2">
          {posts.map((post) => (
            <div key={post.id}>
              <h3 className="text-lg font-semibold">{post.title}</h3>

            </div>
          ))}
        </div> */}
    </>
  );
}
