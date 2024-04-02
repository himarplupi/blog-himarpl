import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect, notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { EditorProvider } from "@/components/post/editor-context";
import { Editor } from "@/components/post/editor";
import { EditorNavbar } from "@/components/post/editor-navbar";

type PostEditPageProps = {
  params: { username: string; slug: string };
};

export default async function PostEditPage({ params }: PostEditPageProps) {
  noStore();
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

  return (
    <EditorProvider author={author} post={post}>
      <EditorNavbar session={session} />
      <main className="container mt-16 min-h-screen space-y-8 py-8">
        <Editor />
      </main>
    </EditorProvider>
  );
}
