"use client";

import { useContext } from "react";
import { MePostContext } from "@/components/post/me-post-context";

export default function DraftsPage() {
  const { draftPosts: posts } = useContext(MePostContext);

  return (
    <main className="container min-h-screen">
      {posts.map((post) => (
        <div key={post.slug}>
          <h1>{post.title}</h1>
        </div>
      ))}
    </main>
  );
}
