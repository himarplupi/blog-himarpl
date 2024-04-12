import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

async function RedirectMeToMyProfile() {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  if (!session.user.username) {
    return redirect("/register/username");
  }

  return redirect(`/@${session.user.username}`);
}

export { RedirectMeToMyProfile as GET };
