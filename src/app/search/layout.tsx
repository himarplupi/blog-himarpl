import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";

export default async function SearchLayout({
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
