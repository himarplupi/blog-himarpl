import { redirect } from "next/navigation";
import { RegisterUsername } from "@/components/common/auth";
import { getServerAuthSession } from "@/server/auth";

export default async function RegisterUsernamePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  if (session.user.username) {
    return redirect(`/@${session.user.username}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <RegisterUsername />
    </main>
  );
}
