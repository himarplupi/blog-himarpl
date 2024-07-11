"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";

import { editorConfig } from "@/lib/editor-config";
import { getFirstImageSrc } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  type Editor as TipTapEditor,
  useEditor as useTipTapEditor,
} from "@tiptap/react";

export type Editor = TipTapEditor;

export const useEditorConfig = () => {
  const pathname = usePathname();
  const postId = pathname.split("/")[2] ?? "";
  const postQuery = api.post.byId.useQuery({ id: postId });

  const editor = useTipTapEditor(
    {
      ...editorConfig,
      content: postQuery?.data
        ? postQuery?.data.title + postQuery?.data.rawHtml
        : "Loading...",
      editable: !postQuery.isLoading,
    },
    [postQuery.data],
  );
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [rawHtml, setRawHtml] = useState("Loading...");
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 2000);

  const savePost = api.post.save.useMutation();
  const utils = api.useUtils();

  useEffect(() => {
    if (postQuery.isLoading) return;
    if (!postQuery.data) return;
    if (!editor) return;
    if (savePost.data?.content === rawHtml && savePost.data?.title === title) {
      return;
    }
    if (!editor.isEditable) return;

    if (debouncedEditor) {
      const post = postQuery.data;

      savePost.mutate({
        content: editor.getText().replace(title, ""),
        rawHtml: rawHtml,
        title: title,
        slug: post.slug,
        image: getFirstImageSrc(rawHtml) ?? "",
        tagTitles: post.tags.map((tag) => tag.title),
      });

      // eslint-disable-next-line
      utils.post.byParamsForTagSave.invalidate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEditor]);

  useEffect(() => {
    if (!editor) return;

    const rawHtml = editor?.getHTML();

    if (!rawHtml.includes("<h1>")) {
      editor.chain().focus().setHeading({ level: 1 }).run();
      return;
    }

    const titleMatch = /<h1>(.*?)<\/h1>/.exec(rawHtml);
    const title = titleMatch?.[1] ?? "";
    // replace any tag and its content inside the title
    const cleanTitle = title.replace(/<[^>]*>?/gm, "");
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

    setTitle(cleanTitle);
    setRawHtml(rawHtmlWithoutTitle);
  }, [editor, editor?.state.doc.content]);

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

  return {
    editor,
    isSaving,
    title,
    setTitle,
    rawHtml,
    setRawHtml,
  };
};
