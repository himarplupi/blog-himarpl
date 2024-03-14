"use client";

import { useContext } from "react";
import { EditorContext } from "@/components/post/editor-context";
import { EditorContent } from "@tiptap/react";

export function Editor() {
  const { editor } = useContext(EditorContext);

  return <EditorContent editor={editor} />;
}
