"use client";

import { Italic as ItalicIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Italic() {
  const { editor } = useEditor();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="italic"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side="bottom">{`Italic (Ctrl + I)`}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
