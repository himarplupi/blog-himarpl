"use client";

import { useContext } from "react";
import { MePostContext } from "@/components/post/me-post-context";

export default function PublishedPage() {
  const { publishedPosts: posts } = useContext(MePostContext);

  return (
    <main className="container min-h-screen">
      {posts.map((post) => (
        <div key={post.slug}>
          <h1>{post.title}</h1>
          <p>{post.publishedAt?.toLocaleDateString()}</p>
        </div>
      ))}
    </main>
  );
}
