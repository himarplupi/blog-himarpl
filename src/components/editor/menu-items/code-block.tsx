"use client";

import { FileCode } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function CodeBlock() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
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
        <TooltipContent>{`Code Block (Ctrl + Alt + C)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
