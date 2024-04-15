"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

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

export function Image() {
  const { editor, isHeading } = useEditor();
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");

  const handleSubmit = () => {
    editor
      ?.chain()
      .focus()
      .setImage({
        src,
        alt,
        title: alt,
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
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent>{`Insert Image`}</TooltipContent>
        </Tooltip>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sisipkan Gambar</DialogTitle>
            <DialogDescription>
              {"Pastikan link gambar yang Anda masukkan benar dan valid."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="src">Link Gambar</Label>
              <Input
                id="src"
                type="url"
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="alt">Judul Gambar</Label>
              <Input
                id="alt"
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Kucing Lucu"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleSubmit}>Sisipkan</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </TooltipProvider>
    </Dialog>
  );
}
