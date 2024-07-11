"use client";

import { useContext } from "react";
import { LoaderCircle } from "lucide-react";

import { MePostContext } from "@/components/me/me-post-context";
import { PostPublicCardItem } from "@/components/me/post-public-card-item";
import { api } from "@/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PublicPostPage() {
  const { session } = useContext(MePostContext);
  const user = session?.user;
  const publicPostsQuery = api.post.selectSelfPublished.useQuery();
  const [parentAutoAnimate] = useAutoAnimate(/* optional config */);

  return (
    <main className="container min-h-screen" ref={parentAutoAnimate}>
      {publicPostsQuery.isLoading && (
        <div className="flex h-64 items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {publicPostsQuery?.data?.map((post) => (
        <PostPublicCardItem post={post} user={user} key={post.id} />
      ))}

      {publicPostsQuery?.data?.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-pretty text-lg">Tidak ada postingan</p>
        </div>
      )}
    </main>
  );
}
