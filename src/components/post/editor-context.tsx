"use client";

import { createContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { Post, User } from "@prisma/client";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { type Editor, textblockTypeInputRule, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type PostExpanded = Post & {
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
      Link.configure({
        openOnClick: false,
      }),
      TextAlign,
      Highlight,
      CharacterCount,
      Superscript,
      Subscript,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "sm:w-2/3 w-full h-auto",
        },
      }),
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
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [debouncedEditor] = useDebounce(editor?.state.doc.content, 1000);
  const savePost = api.post.save.useMutation();

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

  return (
    <EditorContext.Provider value={{ editor, savePost, isSaving }}>
      {children}
    </EditorContext.Provider>
  );
}
