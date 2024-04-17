"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { editorConfig } from "@/lib/editor-config";
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

export const useEditorConfig = (post: PostExpanded, author: Author) => {
  const editor = useTipTapEditor({
    ...editorConfig,
    content: post.title + post.content,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const savePost = api.post.save.useMutation();
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (savePost.data?.content === content && savePost.data?.title === title) {
      return;
    }

    if (debouncedEditor) {
      savePost.mutate({ authorId: author.id, content, title, slug: post.slug });
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
    const content = rawHtml.replace(titleMatch?.[0] ?? "", "").trim();

    const headingCount = (rawHtml.match(/<h1>/g) ?? []).length;
    if (headingCount > 1) {
      const content = rawHtml
        .split("</h1>")
        .join("</p>")
        .split("<h1>")
        .join("<p>")
        .trim();
      editor.commands.setContent(content);
      editor.commands.focus("start");
    }

    setTitle(title);
    setContent(content);
  }, [editor, editor?.state.doc.content, post.content, post.title]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    setIsSaving(true);

    if (savePost.data?.content === content && savePost.data?.title === title) {
      return setIsSaving(false);
    }
  }, [editor, content, title, savePost.data]);

  useEffect(() => {
    if (savePost.data) {
      setIsSaving(false);
    }
  }, [savePost.data]);

  return { editor, isSaving, title, setTitle, content, setContent, savePost };
};
