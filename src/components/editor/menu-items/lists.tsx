"use client";

import { List, ListOrdered } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function ListsProvider({ children }: { children: React.ReactNode }) {
  const { editor, isHeading } = useEditor();

  return (
    <ToggleGroup
      type="multiple"
      disabled={isHeading}
      value={[
        editor?.isActive("orderedList") ? "orderedlist" : "",
        editor?.isActive("bulletList") ? "bulletlist" : "",
      ]}
      asChild
    >
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </ToggleGroup>
  );
}

export function OrderedList() {
  const { editor } = useEditor();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="orderedlist"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent side="bottom">{`Ordered List (Ctrl + Shift + 7)`}</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}

export function BulletList() {
  const { editor } = useEditor();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ToggleGroupItem
            value="bulletlist"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </div>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent side="bottom">{`Bullet List (Ctrl + Shift + 8)`}</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
}
