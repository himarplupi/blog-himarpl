"use client";

import { Redo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Redo() {
  const { editor } = useEditor();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.commands.redo()}
            disabled={!editor?.can().redo()}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent side="bottom">{`Redo (Ctrl + Shift + Z)`}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
