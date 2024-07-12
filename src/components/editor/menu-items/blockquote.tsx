"use client";

import { Quote as QuoteIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Blockquote() {
  const { editor } = useEditor();

  return (
    <TooltipProvider delayDuration={0}>
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

        <TooltipPortal>
          <TooltipContent side="bottom">{`Blockquote (Ctrl + Shift + B)`}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
