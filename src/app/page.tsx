import { MoreHorizontalIcon } from "lucide-react";

import { Navbar } from "@/components/common/navbar";
import { Articles } from "@/components/home/articles";
import Sidebar from "@/components/home/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="container mx-auto mt-16 min-h-screen py-8">
        <div className="mb-8 flex scroll-m-20 items-center justify-between pb-2">
          <h2 className="font-serif text-3xl font-bold italic tracking-wide first:mt-0">
            Postingan Terbaru
          </h2>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontalIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full px-0">
                <Sidebar type="mobile" />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="xxl:gap-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-6">
          <div className="col-span-1 flex flex-col gap-y-4 pb-6 lg:col-span-2 lg:gap-y-6">
            <Articles />
          </div>
          <Sidebar type="desktop" />
        </div>
      </main>
    </>
  );
}
