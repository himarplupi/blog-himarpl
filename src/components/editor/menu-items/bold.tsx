"use client";

import { Bold as BoldIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Bold() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="bold"
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <BoldIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>
        <TooltipContent>{`Bold (Ctrl + B)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
