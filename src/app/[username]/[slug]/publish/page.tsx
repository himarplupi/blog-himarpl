import { notFound, redirect } from "next/navigation";

import { PublishPreview } from "@/components/publish/publish-preview";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

type PostPublishPageProps = {
  params: { username: string; slug: string };
};

export default async function PostPublishPage({
  params,
}: PostPublishPageProps) {
  const session = await getServerAuthSession();

  const username = params.username.substring(3);

  if (!session) {
    return redirect("/login");
  }

  const { author, post } = await api.post.byParams.query({
    slug: params.slug,
    username,
  });

  if (!author || session.user.id !== author.id) {
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  if (!session.user.username) {
    return redirect("/register/username");
  }

  const characterCount = post.title.length + post.content.length;
  const wordCount =
    post.title.split(/\s+/).length + post.content.split(/\s+/).length;

  if (characterCount < 100 || wordCount < 20) {
    return redirect(`/@${username}/${params.slug}/edit`);
  }

  return (
    <main>
      <PublishPreview session={session} />
    </main>
  );
}
