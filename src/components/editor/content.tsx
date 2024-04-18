"use client";

import { useEditor } from "@/hooks/useEditor";
import { EditorContent as TipTapContent } from "@tiptap/react";

export function EditorContent() {
  const { editor } = useEditor();

  return <TipTapContent editor={editor} />;
}
