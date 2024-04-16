"use client";

import { Quote as QuoteIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Blockquote() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="blockquote"
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            >
              <QuoteIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>
        <TooltipContent>{`Blockquote (Ctrl + Shift + B)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
