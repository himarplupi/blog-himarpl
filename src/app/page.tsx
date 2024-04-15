
import Link from "next/link";

import Article from "@/components/common/article";
import { Navbar } from "@/components/common/navbar";
import { Sidebar } from "@/components/home/sidebar";
import { badgeVariants } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerAuthSession } from "@/server/auth";




export default async function Home() {
  const session = await getServerAuthSession();

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
                  <Article
                    profileUrl="/" photo={`https://github.com/shadcn.png`} image={`https://github.com/shadcn.png`}
                    name={"Ini nama user"} title={"Mahasiswa RPL membuat revolusi pada bidang teknologi"} description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro itaque repellat pariatur facere, asperiores hic esse qui eius! Debitis sed possimus nulla hic ex?"} dateTime={new Date()}>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                  </Article>
                  <Separator />
                  <Article
                    profileUrl="/" photo={`https://github.com/shadcn.png`} image={`https://github.com/shadcn.png`}
                    name={"Ini nama user"} title={"Mahasiswa RPL membuat revolusi pada bidang teknologi"} description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro itaque repellat pariatur facere, asperiores hic esse qui eius! Debitis sed possimus nulla hic ex?"} dateTime={new Date()}>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                    <Link href="/" className={badgeVariants()}>Label</Link>
                  </Article>
                  <Separator />
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
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
