import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect, notFound } from "next/navigation";

type PostEditPageProps = {
  params: { username: string; slug: string };
};

export default async function PostEditPage({ params }: PostEditPageProps) {
  const session = await getServerAuthSession();
  const username = params.username.substring(3);

  if (!session) {
    return redirect("/login");
  }

  const author = await api.user.byUsername.query(username);

  if (!author || session.user.id !== author.id) {
    return notFound();
  }

  if (!session.user.username) {
    return redirect("/register/username");
  }

  return (
    <main className="container mt-16 min-h-screen py-8">
      <h2 className="scroll-m-20 border-b pb-2 font-serif text-3xl font-semibold uppercase tracking-wide first:mt-0">
        Post Edit Page
      </h2>
      {params.slug}
      {params.username}
    </main>
  );
}
