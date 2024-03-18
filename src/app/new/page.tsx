import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function NewPostPage() {
  noStore();
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const res = await api.post.create.mutate({
    authorId: session.user.id,
    title: "New Post",
    content: "This is a new post.",
  });

  redirect(`/post/${res.slug}/edit`);
}
