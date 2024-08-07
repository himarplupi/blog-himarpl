import { cn } from "@/lib/utils";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { type EditorOptions } from "@tiptap/react";
import { textblockTypeInputRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { ControlClickLink } from "./control-click-link";

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

export const editorConfig: Partial<EditorOptions> = {
  extensions: [
    StarterKit.configure({
      document: false,
      heading: false,
    }),
    Youtube.configure({
      HTMLAttributes: {
        class:
          "mx-auto sm:w-[60vw] w-full h-auto aspect-video max-w-full rounded",
      },
    }),
    DocumentWithTitle,
    CustomHeading,
    ControlClickLink,
    TextAlign,
    Highlight,
    CharacterCount,
    Superscript,
    Subscript,
    Underline,
    Image.configure({
      HTMLAttributes: {
        class: "mx-auto sm:w-[60vw] w-full h-auto max-w-full rounded",
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
  editorProps: {
    attributes: {
      class: cn(
        "p-4 prose dark:prose-invert lg:prose-xl prose-headings:border-b prose-headings:border-border prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-wide prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg sm:prose-h1:text-6xl sm:prose-h2:text-5xl sm:prose-h3:text-3xl sm:prose-h4:text-2xl sm:prose-h5:text-xl min-h-screen max-w-none rounded-md border border-input bg-background",
      ),
    },
  },
};
