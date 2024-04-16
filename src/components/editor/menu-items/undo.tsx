"use client";

import { Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Undo() {
  const { editor } = useEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.commands.undo()}
            disabled={!editor?.can().undo()}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{`Undo (Ctrl + Z)`}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
