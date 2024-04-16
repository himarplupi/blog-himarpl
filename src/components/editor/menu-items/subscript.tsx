"use client";

import { Subscript as SubscriptIcon } from "lucide-react";

import { ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Subscript() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <ToggleGroupItem
              value="subscript"
              onClick={() => editor?.chain().focus().toggleSubscript().run()}
            >
              <SubscriptIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </div>
        </TooltipTrigger>
        <TooltipContent>{`Subscript (Ctrl + ,)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
