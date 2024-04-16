"use client";

import { createContext } from "react";

import {
  type Author,
  type Editor,
  type PostExpanded,
  useEditorConfig,
} from "@/hooks/useEditorConfig";
import { type api } from "@/trpc/react";

type EditorProviderProps = {
  post: PostExpanded;
  author: Author;
  children: React.ReactNode;
};

type EditorContextValue = {
  editor: Editor | null;
  savePost: ReturnType<typeof api.post.save.useMutation> | null;
  isSaving: boolean;
};

export const EditorContext = createContext<EditorContextValue>({
  editor: null,
  savePost: null,
  isSaving: false,
});

export function EditorProvider({
  author,
  post,
  children,
}: EditorProviderProps) {
  const { editor, isSaving, savePost } = useEditorConfig(post, author);

  return (
    <EditorContext.Provider value={{ editor, savePost, isSaving }}>
      {children}
    </EditorContext.Provider>
  );
}