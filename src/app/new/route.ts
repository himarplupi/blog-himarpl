import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";

export async function RedirectMeToNewPost() {
  noStore();
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  if (!session.user.username) {
    return redirect("/register/username");
  }

  const newPost = await api.post.new.mutate();

  return redirect(`/@${session?.user?.username}/${newPost.slug}/edit`);
}

export { RedirectMeToNewPost as GET };
