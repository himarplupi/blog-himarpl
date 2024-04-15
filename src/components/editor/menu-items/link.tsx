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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .extendMarkRange("link")
      .setLink({
        href: currentHref,
        target: "_blank",
      })
      .run();
  }, [currentHref, editor]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            disabled={isHeading}
            onClick={() => {
              if (!setCurrentHref || !inputLinkRef) return;
              editor
                ?.chain()
                .setLink({
                  href: "https://example.com",
                  target: "_blank",
                })
                .run();
              setCurrentHref("https://example.com");
              inputLinkRef.current?.focus();
            }}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
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
        "duration-400 container fixed top-24 z-10 w-full bg-primary-foreground px-10 py-4 ease-in-out fill-mode-forwards",
        editor?.isActive("link")
          ? "animate-in fade-in slide-in-from-top-16"
          : "animate-out fade-out slide-out-to-top-16",
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
