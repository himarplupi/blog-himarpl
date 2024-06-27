"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/hooks/useEditor";
import { SiYoutube } from "@icons-pack/react-simple-icons";

export function Youtube() {
  const { editor, isHeading } = useEditor();
  const [src, setSrc] = useState("");

  const handleSubmit = () => {
    editor
      ?.chain()
      .focus()
      .setYoutubeVideo({
        src,
      })
      .run();
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" disabled={isHeading}>
                  {/* @ts-expect-error: Entahlah SimpleIcon gaje */}
                  <SiYoutube
                    color="hsl(var(--foreground))"
                    className="h-4 w-4"
                  />
                </Button>
              </DialogTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>{`Insert Youtube Video`}</TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sisipkan Video Youtube</DialogTitle>
            <DialogDescription>
              {"Pastikan link Youtube yang Anda masukkan benar dan valid."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="src">Link Youtube</Label>
              <Input
                id="src"
                type="url"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=s33x6tCNkiE"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={src.length < 1} onClick={handleSubmit}>
                Sisipkan
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </TooltipProvider>
    </Dialog>
  );
}
