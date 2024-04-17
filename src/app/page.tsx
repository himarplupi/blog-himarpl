
import Link from "next/link";

import Article from "@/components/common/article";
import { Navbar } from "@/components/common/navbar";
import { type PostType } from "@/components/common/type";
import { Sidebar } from "@/components/home/sidebar";
import { badgeVariants } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { momentId } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getData } from "@/services/getData";

export default async function Home() {
  const session = await getServerAuthSession();
  const articles = (await getData(`${process.env.NEXT_BASE_URL}/api/post`) as PostType[]);

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8">
        <div className="grid grid-cols-3 gap-8 lg:gap-16 relative">
          <div className="col-span-3 lg:col-span-2 h-[200vh]">
            <Tabs defaultValue="for-you" className="w-full">
              <TabsList className="bg-background py-6 border-b gap-2 border-slate-600 w-fit justify-start mb-6">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="password">Berita</TabsTrigger>
              </TabsList>
              <TabsContent value="for-you">
                <div className="flex flex-col gap-4 w-full">
                  {/* Start Looping artikel */}
                  {articles.length > 0 && articles.map((article) => (
                    <>
                      <Article key={article.id}
                        profileUrl={`@${article.author.username}`} photo={article.author.image ?? `https://github.com/shadcn.png`} image={`https://github.com/shadcn.png`}
                        name={article.author.name ?? ""} title={article.title} description={article.content}
                        dateTime={momentId(article.publishedAt).format("DD MMM YY HH:mm")}
                      >
                        {article.tags.length > 0 && article.tags.map((tag) => (
                          <Link key={tag.id} href={`${process.env.NEXT_BASE_URL}/tag/${tag.slug}`} className={badgeVariants()}>{tag.title}</Link>
                        ))}
                      </Article>
                      <Separator />
                    </>
                  ))}
                  {/* End looping artikel */}
                </div>
              </TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 relative hidden lg:block">
            <Sidebar className="lg:sticky top-20 h-[85vh] w-full px-6 py-3 border rounded-md" />
          </div>
        </div>

        {/* Sheet Sidebar */}
        <Sheet>
          <SheetTrigger className="fixed right-8 bottom-12 p-3 rounded-md bg-zinc-800 text-foreground hover:bg-foreground/30 block lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

          </SheetTrigger>
          <SheetContent side={"right"} className="overflow-y-auto">
            <div className="relative mt-8">
              <Sidebar className="h-fit w-full" />
            </div>
          </SheetContent>
        </Sheet>

      </main>
    </>
  );
}
