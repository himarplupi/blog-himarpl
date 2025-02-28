"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle({ isCollapsed }: { isCollapsed: boolean }) {
  const [isClient, setIsClient] = React.useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={isCollapsed ? "" : "w-full gap-x-2"}
            variant="outline"
            size={isCollapsed ? "icon" : "default"}
          >
            {resolvedTheme !== "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            {!isCollapsed && <span className="capitalize">{theme}</span>}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
