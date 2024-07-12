"use client";

import { FileCode } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function CodeBlock() {
  const { editor } = useEditor();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="code-block"
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            >
              <FileCode className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side="bottom">{`Code Block (Ctrl + Alt + C)`}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
