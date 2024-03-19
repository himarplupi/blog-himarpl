"use client";

import type { Post } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

export function InputContent({ post }: { post: Post }) {
  return <Textarea>{post.content}</Textarea>;
}
