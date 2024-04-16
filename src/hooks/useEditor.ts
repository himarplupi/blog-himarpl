"use client";

import { useContext, useEffect, useState } from "react";

import { EditorContext } from "@/components/editor";

export const useEditor = () => {
  const context = useContext(EditorContext);
  const [isHeading, setIsHeading] = useState(true);

  if (!context) {
    throw new Error("useEditor must be used within a <EditorProvider />");
  }

  useEffect(() => {
    const { editor } = context;
    if (!editor) return;

    setIsHeading(editor.getAttributes("heading")?.level === 1);
  }, [context.editor?.state.selection, context]);

  return { ...context, isHeading };
};
