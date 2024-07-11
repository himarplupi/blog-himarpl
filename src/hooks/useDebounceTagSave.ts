"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";

import { type TagOption } from "@/hooks/useDebounceTagOptions";
import { api } from "@/trpc/react";

export type Props = {
  tags: TagOption[];
  delay: number;
};

export const useDebounceTagSave = ({ tags, delay }: Props) => {
  const pathname = usePathname();
  const username = pathname.split("/")[1]?.slice(1);
  const slug = pathname.split("/")[2];

  if (!username || !slug) {
    throw new Error("Invalid pathname");
  }

  const postQuery = api.post.byParams.useQuery({
    username: username,
    slug: slug,
  });
  const savePostMutation = api.post.save.useMutation();

  const [debouncedTag] = useDebounce(tags, delay);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedTag) {
      if (!postQuery.data) return;

      const { post } = postQuery.data;

      savePostMutation.mutate({
        title: post?.title ?? "",
        slug: post?.slug ?? "",
        content: post?.content ?? "",
        rawHtml: post?.rawHtml ?? "",
        image: post?.image ?? "",
        tagTitles: debouncedTag.map((tag) => tag.value),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTag]);

  useEffect(() => {
    if (tags === debouncedTag) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [tags, debouncedTag]);

  return { postQuery, isLoading };
};
