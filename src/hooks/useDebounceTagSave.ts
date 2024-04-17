"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { type TagOption } from "@/hooks/useDebounceTagOptions";
import { useEditor } from "@/hooks/useEditor";

export type Props = {
  tags: TagOption[];
  delay: number;
};

export const useDebounceTagSave = ({ tags, delay }: Props) => {
  const { savePost } = useEditor();
  const [debouncedTag] = useDebounce(tags, delay);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedTag) {
      if (!savePost) return;
      if (!savePost.data) return;

      const prevData = savePost.data;

      savePost.mutate({
        content: prevData?.content ?? "",
        rawHtml: prevData?.rawHtml ?? "",
        slug: prevData?.slug ?? "",
        title: prevData?.title ?? "",
        image: prevData?.image ?? "",
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

  return { savePost, isLoading };
};
