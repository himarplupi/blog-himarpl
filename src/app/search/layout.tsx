import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";

export const metadata = {
  title: "Cari | HIMARPL",
  description: "Cari artikel, label, atau pengguna Blog HIMARPL disini!",
};

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
