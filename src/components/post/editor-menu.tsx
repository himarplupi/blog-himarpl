"use client";

import { useContext, useEffect, useState } from "react";
import {
  Bold,
  Code,
  FileCode,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  ImagePlus as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  Superscript,
  TextQuote,
  Underline,
  Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { EditorContext } from "./editor-context";

export function EditorMenu() {
  const { editor } = useContext(EditorContext);
  const [isHeading, setIsHeading] = useState(true);

  useEffect(() => {
    if (!editor) return;

    setIsHeading(editor.getAttributes("heading")?.level === 1);
  }, [editor?.state.selection, editor]);

  return (
    <div className="flex h-10 items-center gap-x-1 rounded-full bg-muted/50 px-3 py-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.commands.undo()}
              disabled={!editor?.can().undo()}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`Undo (Ctrl + Z)`}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.commands.redo()}
              disabled={!editor?.can().redo()}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`Redo (Ctrl + Shift + Z)`}</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" />

        <ToggleGroup
          type="single"
          value={String(editor?.getAttributes("heading")?.level)}
          disabled={isHeading}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="2"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Heading2 className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Heading 2 (Ctrl + Alt + 2)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="3"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <Heading3 className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Heading 3 (Ctrl + Alt + 3)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="4"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 4 }).run()
                  }
                >
                  <Heading4 className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Heading 4 (Ctrl + Alt + 4)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="5"
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 5 }).run()
                  }
                >
                  <Heading5 className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Heading 5 (Ctrl + Alt + 5)`}</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <Separator orientation="vertical" />

        <ToggleGroup
          type="multiple"
          disabled={isHeading}
          value={[
            editor?.isActive("bold") ? "bold" : "",
            editor?.isActive("italic") ? "italic" : "",
            editor?.isActive("underline") ? "underline" : "",
            editor?.isActive("strike") ? "strike" : "",
            editor?.isActive("code") ? "code" : "",
            editor?.isActive("highlight") ? "highlight" : "",
            editor?.isActive("superscript") ? "superscript" : "",
            editor?.isActive("subscript") ? "subscript" : "",
            editor?.isActive("blockquote") ? "blockquote" : "",
            editor?.isActive("codeBlock") ? "codeblock" : "",
          ]}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="bold"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Bold (Ctrl + B)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="italic"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Italic (Ctrl + I)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="underline"
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Underline (Ctrl + U)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="code"
                  onClick={() => editor?.chain().focus().toggleCode().run()}
                >
                  <Code className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Code (Ctrl + E)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="blockquote"
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                >
                  <TextQuote className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Blockquote (Ctrl + Shift + B)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="strike"
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <Strikethrough className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Strikethrough (Ctrl + Shift + S)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="codeblock"
                  onClick={() =>
                    editor?.chain().focus().toggleCodeBlock().run()
                  }
                >
                  <FileCode className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Code Block (Ctrl + Alt + C)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="superscript"
                  onClick={() =>
                    editor?.chain().focus().toggleSuperscript().run()
                  }
                >
                  <Superscript className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Superscript (Ctrl + .)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="subscript"
                  onClick={() =>
                    editor?.chain().focus().toggleSubscript().run()
                  }
                >
                  <Superscript className="h-4 w-4 rotate-180 transform" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Subscript (Ctrl + ,)`}</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <Separator orientation="vertical" />

        <ToggleGroup
          type="multiple"
          disabled={isHeading}
          value={[
            editor?.isActive("orderedList") ? "orderedlist" : "",
            editor?.isActive("bulletList") ? "bulletlist" : "",
          ]}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="orderedlist"
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                >
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Ordered List (Ctrl + Shift + 7)`}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ToggleGroupItem
                  value="bulletlist"
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                >
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </div>
            </TooltipTrigger>
            <TooltipContent>{`Bullet List (Ctrl + Shift + 8)`}</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <Separator orientation="vertical" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" disabled={isHeading}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`Insert Link`}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" disabled={isHeading}>
              <ImageIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`Insert Image`}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
