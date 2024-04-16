"use client";

import { Highlighter as HighlighterIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Highlight() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="highlight"
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
            >
              <HighlighterIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>
        <TooltipContent>{`Highlight (Ctrl + Shift + H)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}