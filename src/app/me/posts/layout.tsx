import { redirect } from "next/navigation";

import { Navbar } from "@/components/common/navbar";
import { LayoutAnimationProvider, MeHeader } from "@/components/me/me-header";
import { MePostProvider } from "@/components/me/me-post-context";
import { getServerAuthSession } from "@/server/auth";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  if (!session.user.username) {
    return redirect("/register/username");
  }

  return (
    <>
      <Navbar session={session} />
      <MeHeader />
      <MePostProvider session={session}>
        <LayoutAnimationProvider>{children}</LayoutAnimationProvider>
      </MePostProvider>
    </>
  );
}
