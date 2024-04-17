import { unstable_noStore as noStore } from "next/cache";
import { notFound, redirect } from "next/navigation";

import {
  EditorContent,
  EditorMenu,
  EditorNavbar,
  EditorProvider,
} from "@/components/editor";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

type PostEditPageProps = {
  params: { username: string; slug: string };
};

export default async function PostEditPage({ params }: PostEditPageProps) {
  noStore();
  const session = await getServerAuthSession();

  // handle route without @ symbol
  if (!params.username.startsWith("%40")) {
    return notFound();
  }

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
    <EditorProvider post={post}>
      <EditorNavbar session={session} />
      <EditorMenu />
      <main className="container mt-24 min-h-screen space-y-8 py-8">
        <EditorContent />
      </main>
    </EditorProvider>
  );
}
