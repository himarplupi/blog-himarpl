"use client";

import { createContext } from "react";

import { PublishProgress } from "@/components/editor/publish-progress";
import { type Editor, useEditorConfig } from "@/hooks/useEditorConfig";
import { usePublishPost } from "@/hooks/usePublishPost";
import { type api } from "@/trpc/react";

type EditorProviderProps = {
  children: React.ReactNode;
};

type EditorContextValue = {
  editor: Editor | null;
  savePost: ReturnType<typeof api.post.save.useMutation> | null;
  isSaving: boolean;
  isPublishable: boolean;
};

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
  savePost: null,
  isSaving: false,
  isPublishable: false,
});

export function EditorProvider({ children }: EditorProviderProps) {
  const { editor, isSaving, savePost, isPublishable } = useEditorConfig();
  const { isPublishing } = usePublishPost();

  return (
    <EditorContext.Provider
      value={{ editor, savePost, isSaving, isPublishable }}
    >
      {children}
      {isPublishing && <PublishProgress />}
    </EditorContext.Provider>
  );
}
