import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  noStore();
  const session = await getServerAuthSession();

  if (!session) redirect("/login");

  if (!session.user.username) {
    return redirect("/register/username");
  }

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
