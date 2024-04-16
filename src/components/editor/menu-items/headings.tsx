"use client";

import {
  Heading2 as Heading2Icon,
  Heading3 as Heading3Icon,
  Heading4 as Heading4Icon,
  Heading5 as Heading5Icon,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function HeadingsProvider({ children }: { children: React.ReactNode }) {
  const { editor, isHeading } = useEditor();

  return (
    <ToggleGroup
      type="single"
      value={String(editor?.getAttributes("heading")?.level)}
      disabled={isHeading}
      asChild
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ToggleGroup>
  );
}

export function Heading2() {
  const { editor } = useEditor();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="2"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2Icon className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>
      <TooltipContent>{`Heading 2 (Ctrl + Alt + 2)`}</TooltipContent>
    </Tooltip>
  );
}

export function Heading3() {
  const { editor } = useEditor();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="3"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3Icon className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>
      <TooltipContent>{`Heading 3 (Ctrl + Alt + 3)`}</TooltipContent>
    </Tooltip>
  );
}

export function Heading4() {
  const { editor } = useEditor();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="4"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Heading4Icon className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>
      <TooltipContent>{`Heading 4 (Ctrl + Alt + 4)`}</TooltipContent>
    </Tooltip>
  );
}

export function Heading5() {
  const { editor } = useEditor();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="5"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Heading5Icon className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>
      <TooltipContent>{`Heading 5 (Ctrl + Alt + 5)`}</TooltipContent>
    </Tooltip>
  );
}
