"use client";

import {
  createContext,
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link as LinkIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";
import { cn } from "@/lib/utils";

export function Link() {
  const { editor, isHeading } = useEditor();
  const { currentHref, setCurrentHref, inputLinkRef } = useLink();

  useEffect(() => {
    if (!setCurrentHref) return;
    if (!editor) return;

    type Link = {
      class: null | string;
      href: string;
      rel: string;
      target: string;
    };

    // @ts-expect-error - entah cara ngambil type Tiptap nya gimana?
    const link: Link = editor.getAttributes("link");

    if (link.href !== currentHref && link.href) {
      setCurrentHref(link.href);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.state.selection, editor]);

  useEffect(() => {
    if (!editor) return;

    if (currentHref === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
  }, [currentHref, editor]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              disabled={isHeading}
              pressed={editor?.isActive("link")}
              onClick={() => {
                if (!setCurrentHref || !inputLinkRef) return;
                editor
                  ?.chain()
                  .toggleLink({
                    href: currentHref || "https://example.com",
                    target: "_blank",
                  })
                  .run();

                if (!editor?.isActive("link")) {
                  editor?.chain().focus().run();
                } else {
                  inputLinkRef.current?.focus();
                }
              }}
            >
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>{`Insert Link`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function LinkInput() {
  const { editor } = useEditor();
  const { currentHref, setCurrentHref, inputLinkRef } = useLink();

  return (
    <div
      key="link-input"
      className={cn(
        "duration-400 fixed bottom-12 z-10 w-full bg-primary-foreground px-2 py-4 ease-in-out fill-mode-forwards md:container md:bottom-auto md:top-28 md:px-10",
        editor?.isActive("link")
          ? "animate-in fade-in slide-in-from-bottom-16 md:slide-in-from-top-16"
          : "animate-out fade-out slide-out-to-bottom-16 md:slide-out-to-top-16",
      )}
    >
      <Input
        className="border-primary/50 bg-primary/10"
        type="text"
        value={currentHref}
        ref={inputLinkRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editor?.chain().focus().setLink({ href: currentHref }).run();
          }
        }}
        onChange={(e) => {
          if (!setCurrentHref) return;
          setCurrentHref(e.target.value);
        }}
      />
    </div>
  );
}

export type LinkContextType = {
  currentHref: string;
  setCurrentHref: Dispatch<SetStateAction<string>> | null;
  inputLinkRef: RefObject<HTMLInputElement> | null;
};

export const LinkContext = createContext<LinkContextType>({
  currentHref: "",
  setCurrentHref: null,
  inputLinkRef: null,
});

export function LinkMenuProvider({ children }: { children: React.ReactNode }) {
  const [currentHref, setCurrentHref] = useState<string>("");
  const inputLinkRef = useRef<HTMLInputElement>(null);

  return (
    <LinkContext.Provider value={{ currentHref, setCurrentHref, inputLinkRef }}>
      {children}
    </LinkContext.Provider>
  );
}

export const useLink = () => {
  const context = useContext(LinkContext);

  if (!context) {
    throw new Error("useLink must be used within a LinkMenuProvider");
  }

  return context;
};
