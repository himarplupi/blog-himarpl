import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import { notFound, redirect } from "next/navigation";

export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await api.post.getBySlug.query(slug);
  const session = await getServerAuthSession();

  if (!post) {
    return notFound();
  }

  if (!post.publishedAt && session?.user.id === post.authorId) {
    return redirect(`/post/${post.slug}/edit`);
  }

  if (!post.publishedAt) {
    return notFound();
  }

  return (
    <main className="container mt-16">
      <h1 className="mb-2 scroll-m-20 font-serif text-4xl font-extrabold tracking-wide lg:text-5xl">
        {post.title}
      </h1>
      <article className="prose-invert lg:prose-xl">{post.content}</article>
    </main>
  );
}
