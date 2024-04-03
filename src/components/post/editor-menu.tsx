"use client";

import { useContext } from "react";
import {
  Undo2,
  Redo2,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
  Superscript,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EditorContext } from "./editor-context";

export function EditorMenu() {
  const { editor } = useContext(EditorContext);

  return (
    <div className="flex h-10 items-center gap-x-1 rounded-full bg-muted/50 px-3 py-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.commands.undo()}
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
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{`Redo (Ctrl + Shift + Z)`}</TooltipContent>
        </Tooltip>

        {editor?.getAttributes("heading")?.level !== 1 && (
          <>
            <Separator orientation="vertical" />

            <ToggleGroup
              type="single"
              value={String(editor?.getAttributes("heading")?.level)}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ToggleGroupItem
                      value="2"
                      onClick={() =>
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run()
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
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 3 })
                          .run()
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
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 4 })
                          .run()
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
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 5 })
                          .run()
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
              value={[
                editor?.isActive("bold") ? "bold" : "",
                editor?.isActive("italic") ? "italic" : "",
                editor?.isActive("underline") ? "underline" : "",
                editor?.isActive("strike") ? "strike" : "",
                editor?.isActive("highlight") ? "highlight" : "",
                editor?.isActive("superscript") ? "superscript" : "",
                editor?.isActive("subscript") ? "subscript" : "",
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
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
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
                      value="strike"
                      onClick={() =>
                        editor?.chain().focus().toggleStrike().run()
                      }
                    >
                      <Strikethrough className="h-4 w-4" />
                    </ToggleGroupItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{`Strikethrough`}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ToggleGroupItem
                      value="highlight"
                      onClick={() =>
                        editor?.chain().focus().toggleHighlight().run()
                      }
                    >
                      <Highlighter className="h-4 w-4" />
                    </ToggleGroupItem>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{`Highlight`}</TooltipContent>
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
                <TooltipContent>{`Superscript`}</TooltipContent>
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
                <TooltipContent>{`Subscript`}</TooltipContent>
              </Tooltip>
            </ToggleGroup>

            <Separator orientation="vertical" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{`Insert Link`}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{`Insert Image`}</TooltipContent>
            </Tooltip>
          </>
        )}
      </TooltipProvider>
    </div>
  );
}
