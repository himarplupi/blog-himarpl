"use client";

import { List, ListOrdered } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";

export function Lists() {
  const { editor, isHeading } = useEditor();

  return (
    <ToggleGroup
      type="multiple"
      disabled={isHeading}
      value={[
        editor?.isActive("orderedList") ? "orderedlist" : "",
        editor?.isActive("bulletList") ? "bulletlist" : "",
      ]}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <ToggleGroupItem
                value="orderedlist"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
              >
                <ListOrdered className="h-4 w-4" />
              </ToggleGroupItem>
            </div>
          </TooltipTrigger>
          <TooltipContent>{`Ordered List (Ctrl + Shift + 7)`}</TooltipContent>
        </Tooltip>

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
          <TooltipContent>{`Bullet List (Ctrl + Shift + 8)`}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ToggleGroup>
  );
}
