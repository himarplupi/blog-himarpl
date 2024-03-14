import { Navbar } from "@/components/common/navbar";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8">
        <h2 className="scroll-m-20 border-b pb-2 font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
          Home
        </h2>
      </main>
    </>
  );
}
