import { notFound } from "next/navigation";

export default async function ProfileLayout({
  params,
  children,
}: {
  params: {
    username: string;
    slug: string;
  };
  children: React.ReactNode;
}) {
  // handle route without @ symbol
  if (!params.username.startsWith("%40")) {
    return notFound();
  }

  return children;
}
