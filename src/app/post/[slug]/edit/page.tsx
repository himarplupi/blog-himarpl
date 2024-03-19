import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";
import { InputContent, InputTitle } from "./_components";

export default async function PostEditPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await api.post.getBySlug.query(slug);
  const session = await getServerAuthSession();

  if (!post) {
    return notFound();
  }

  if (post.authorId !== session?.user.id) {
    return notFound();
  }

  if (post.publishedAt) {
    return redirect(`/post/${post.slug}`);
  }

  return (
    <main className="container mt-16 space-y-4">
      <InputTitle post={post} />

      <InputContent post={post} />
    </main>
  );
}
