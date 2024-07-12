import { Navbar } from "@/components/common/navbar";
import { getServerAuthSession } from "@/server/auth";

export const metadata = {
  title: "Telusuri Label | HIMARPL",
  description: "Telusuri label-label postingan yang umum di sini!",
};

export default async function ExploreTagsLayout({
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
