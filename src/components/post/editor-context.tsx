"use client";

import { createContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, textblockTypeInputRule, type Editor } from "@tiptap/react";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

import type { User, Post } from "@prisma/client";

type PostExpanded = Post & {
  category: {
    title: string;
    slug: string;
  } | null;
  tags: {
    title: string;
    slug: string;
  }[];
};

type EditorProviderProps = {
  post: PostExpanded;
  author: User & { posts: PostExpanded[] };
  children: React.ReactNode;
};

const DocumentWithTitle = Document.extend({
  content: "heading block+",
});

const CustomHeading = Heading.extend({
  parseHTML() {
    return this.options.levels.map((level) => {
      return {
        tag: `h${level}`,
        attrs: { level: level == 1 ? 2 : level },
      };
    });
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () =>
            this.editor.commands.toggleHeading({
              level: level == 1 ? 2 : level,
            }),
        },
      }),
      {},
    );
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level: level == 1 ? 2 : level,
        },
      });
    });
  },
});

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
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
        heading: false,
      }),
      DocumentWithTitle,
      CustomHeading,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Judul";
          }

          return "Jelaskan lebih lanjut tentang apa yang ingin kamu bagikan...";
        },
      }),
    ],
    content: post.title + post.content,
    editorProps: {
      attributes: {
        class: cn(
          "p-4 prose prose-invert lg:prose-xl prose-headings:border-b prose-headings:font-serif prose-headings:tracking-wide min-h-screen max-w-none rounded-md border border-input bg-background",
        ),
      },
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);
  const savePost = api.post.save.useMutation();

  useEffect(() => {
    if (!editor) {
      return;
    }
    const rawHtml = editor?.getHTML();
    const titleMatch = /<h1>(.*?)<\/h1>/.exec(rawHtml);
    const title = titleMatch?.[1] ?? "";
    const content = rawHtml.replace(/<h1>(.*?)<\/h1>/, "");

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
      editor.commands.setHeading({ level: 1 });
    }
  }, [editor, editor?.state.doc.content, post.content, post.title]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const rawHtml = editor.getHTML();
    const titleMatch = /<h1>(.*?)<\/h1>/.exec(rawHtml);
    const title = titleMatch?.[1] ?? "";
    const content = rawHtml.replace(/<h1>(.*?)<\/h1>/, "");

    if (savePost.data?.content === content && savePost.data?.title === title) {
      return setIsSaving(false);
    }

    setIsSaving(true);
  }, [editor, editor?.state.selection, savePost.data]);

  useEffect(() => {
    if (savePost.data) {
      setIsSaving(false);
    }
  }, [savePost.data]);

  return (
    <EditorContext.Provider value={{ editor, savePost, isSaving }}>
      {children}
    </EditorContext.Provider>
  );
}
