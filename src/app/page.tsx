import { type NextApiRequest } from "next";

import { Navbar } from "@/components/common/navbar";
import Articles from "@/components/home/Articles";
import Sidebar from "@/components/home/sidebar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getServerAuthSession } from "@/server/auth";

export default async function Home(req: NextApiRequest) {
  const session = await getServerAuthSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const searchParams: { topic: string } = Object.values(req)[1];
  const topic = searchParams.topic ?? null;

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8 mx-auto">
        <div className="scroll-m-20 border-b pb-2 flex justify-between items-center mb-8">
          <h2 className="font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
            Beranda
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
            <Articles user={""} topic={topic} />
          </div>
          <div className="lg:col-span-1 hidden lg:block">
            <Sidebar />
          </div>
        </div>

      </main >
    </>
  );
}
