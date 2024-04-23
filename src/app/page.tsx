import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const popularPostTags = await api.postTag.popular.query();

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8">
        <h2 className="scroll-m-20 border-b pb-2 font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
          Home
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularPostTags.map((tag) => (
            <div key={tag.id} className="rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold">{tag.title}</h3>
              <p className="text-muted-foreground">{tag._count.posts} posts</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
