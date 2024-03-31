import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

async function RedirectMeToMyDrafts() {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  if (!session.user.username) {
    return redirect("/register/username");
  }

  return redirect(`/me/posts/drafts`);
}

export { RedirectMeToMyDrafts as GET };
