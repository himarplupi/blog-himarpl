"use client";

import { Input } from "@/components/ui/input";
import type { Post } from "@prisma/client";

export function InputTitle({ post }: { post: Post }) {
  return (
    <Input
      className="mb-2 scroll-m-20 py-6 font-serif text-4xl font-extrabold tracking-wide lg:text-5xl"
      value={post.title}
    />
  );
}
