"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { editorConfig } from "@/lib/editor-config";
import { getFirstImageSrc } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Post } from "@prisma/client";
import { type User } from "@prisma/client";
import {
  type Editor as TipTapEditor,
  useEditor as useTipTapEditor,
} from "@tiptap/react";

export type Editor = TipTapEditor;

export type PostExpanded = Post & {
  tags: {
    title: string;
    slug: string;
  }[];
};

export type Author = User & { posts: PostExpanded[] };

export const useEditorConfig = (post: PostExpanded) => {
  const editor = useTipTapEditor({
    ...editorConfig,
    content: post.title + post.rawHtml,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [rawHtml, setRawHtml] = useState(post.rawHtml);
  const savePost = api.post.save.useMutation();
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (savePost.data?.content === rawHtml && savePost.data?.title === title) {
      return;
    }

    if (debouncedEditor) {
      savePost.mutate({
        content: editor.getText().replace(title, ""),
        rawHtml: rawHtml,
        title: title,
        slug: post.slug,
        image: getFirstImageSrc(rawHtml) ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEditor, editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const rawHtml = editor?.getHTML();

    if (!rawHtml.includes("<h1>")) {
      editor.chain().focus().setHeading({ level: 1 }).run();
      return;
    }

    const titleMatch = /<h1>(.*?)<\/h1>/.exec(rawHtml);
    const title = titleMatch?.[1] ?? "";
    const rawHtmlWithoutTitle = rawHtml
      .replace(titleMatch?.[0] ?? "", "")
      .trim();

    const headingCount = (rawHtml.match(/<h1>/g) ?? []).length;
    if (headingCount > 1) {
      const rawHtmlWithoutTitle = rawHtml
        .split("</h1>")
        .join("</p>")
        .split("<h1>")
        .join("<p>")
        .trim();
      editor.commands.setContent(rawHtmlWithoutTitle);
      editor.commands.focus("start");
    }

    setTitle(title);
    setRawHtml(rawHtmlWithoutTitle);
  }, [editor, editor?.state.doc.content, post.content, post.title]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    setIsSaving(true);

    if (savePost.data?.rawHtml === rawHtml && savePost.data?.title === title) {
      return setIsSaving(false);
    }
  }, [editor, rawHtml, title, savePost.data]);

  useEffect(() => {
    if (savePost.data) {
      setIsSaving(false);
    }
  }, [savePost.data]);

  return { editor, isSaving, title, setTitle, rawHtml, setRawHtml, savePost };
};
