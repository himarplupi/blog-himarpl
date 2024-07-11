"use client";

import { createContext } from "react";

import { PublishProgress } from "@/components/editor/publish-progress";
import { type Editor, useEditorConfig } from "@/hooks/useEditorConfig";
import { usePublishPost } from "@/hooks/usePublishPost";

type EditorProviderProps = {
  children: React.ReactNode;
};

type EditorContextValue = {
  editor: Editor | null;
  isSaving: boolean;
};

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
  isSaving: false,
});

export function EditorProvider({ children }: EditorProviderProps) {
  const { editor, isSaving } = useEditorConfig();
  const { isPublishing } = usePublishPost();

  return (
    <EditorContext.Provider value={{ editor, isSaving }}>
      {children}
      {isPublishing && <PublishProgress />}
    </EditorContext.Provider>
  );
}
