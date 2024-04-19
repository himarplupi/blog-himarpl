import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

import { Navbar } from "@/components/common/navbar";
import { LayoutAnimationProvider, MeHeader } from "@/components/me/me-header";
import { MePostProvider } from "@/components/me/me-post-context";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

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

  const draftPostsPromise = api.post.selectSelfDrafts.query();
  const publishedPostsPromise = api.post.selectSelfPublished.query();

  const [draftPosts, publishedPosts] = await Promise.all([
    draftPostsPromise,
    publishedPostsPromise,
  ]);

  return (
    <>
      <Navbar session={session} />
      <MeHeader />
      <MePostProvider
        session={session}
        draftPosts={draftPosts}
        publishedPosts={publishedPosts}
      >
        <LayoutAnimationProvider>{children}</LayoutAnimationProvider>
      </MePostProvider>
    </>
  );
}
