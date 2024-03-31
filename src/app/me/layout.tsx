import { Navbar } from "@/components/common/navbar";
import { MeHeader, LayoutAnimationProvider } from "@/components/post/me-header";
import { MePostProvider } from "@/components/post/me-post-context";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

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
      <MePostProvider draftPosts={draftPosts} publishedPosts={publishedPosts}>
        <LayoutAnimationProvider>{children}</LayoutAnimationProvider>
      </MePostProvider>
    </>
  );
}
