"use client";

import { Strikethrough } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Strike() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
}
