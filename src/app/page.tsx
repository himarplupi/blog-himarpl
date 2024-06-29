import { Navbar } from "@/components/common/navbar";
import Articles from "@/components/home/Articles";
import Sidebar from "@/components/home/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const topic = null;

  return (
    <>
      <Navbar session={session} />
      <main className="container mx-auto mt-16 min-h-screen py-8">
        <div className="mb-8 flex scroll-m-20 items-center justify-between border-b pb-2">
          <h2 className="font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
            Beranda
          </h2>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="xxl:gap-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-6">
          <div className="col-span-1 flex flex-col gap-y-4 lg:col-span-2 lg:gap-y-6">
            <Articles user={""} topic={topic} />
          </div>
          <div className="hidden lg:col-span-1 lg:block">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}
