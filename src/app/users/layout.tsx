import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
