import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  const newPost = await api.post.new.mutate();

  return redirect(`/@${session?.user?.username}/${newPost.slug}/edit`);
}
