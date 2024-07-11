"use client";

import { useContext, useEffect, useState } from "react";

import { EditorContext } from "@/components/editor";

export const useEditor = () => {
  const context = useContext(EditorContext);
  const [isHeading, setIsHeading] = useState(true);
  const [isPublishable, setIsPublishable] = useState(false);

  if (!context) {
    throw new Error("useEditor must be used within a <EditorProvider />");
  }

  useEffect(() => {
    const { editor } = context;
    if (!editor) return;

    setIsHeading(editor.getAttributes("heading")?.level === 1);
  }, [context.editor?.state.selection, context]);

  useEffect(() => {
    const { editor } = context;
    if (!editor) return;

    if (
      // eslint-disable-next-line
      editor.storage.characterCount.characters() >= 100 &&
      // eslint-disable-next-line
      editor.storage.characterCount.words() >= 20
    ) {
      setIsPublishable(true);
    } else {
      setIsPublishable(false);
    }
  }, [context.editor, context]);

  return { ...context, isHeading, isPublishable };
};
