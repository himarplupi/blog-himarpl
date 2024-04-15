"use client";

import { Heading2, Heading3, Heading4, Heading5 } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Headings() {
  const { editor, isHeading } = useEditor();

  return (
    <ToggleGroup
      type="single"
      value={String(editor?.getAttributes("heading")?.level)}
      disabled={isHeading}
    >
      <TooltipProvider>
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
      </TooltipProvider>
    </ToggleGroup>
  );
}
