"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor } from "@/hooks/useEditor";

import { CharacterCount } from "./character-count";

export function Publish() {
  const { username, slug } = useParams<{
    username: string;
    slug: string;
  }>();
  const { isPublishable, isSaving } = useEditor();
  const router = useRouter();

  if (!isPublishable) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="success" size="sm" disabled={isSaving}>
            {isSaving && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            )}
            {!isSaving && "Publish"}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-screen p-0 md:max-w-[512px]">
          <ScrollArea className="max-h-screen">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl tracking-tight">
                  Publish Postingan
                </DialogTitle>
                <DialogDescription>
                  {`Postingan yang telah dipublikasi tidak akan dapat diubah
                    kembali. Pastikan postingan telah sesuai.`}
                </DialogDescription>
              </DialogHeader>
              <div className="my-6 space-y-8">
                <p className="leading-5">
                  Untuk dapat mempublish postingan, pastikan postingan telah
                  selesai dan dapat dipublish dengan kriteria minimal 100
                  karakter dan 20 kata.
                </p>

                <CharacterCount />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Okay</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      variant="success"
      size="sm"
      onClick={() => {
        router.push(`/@${username?.substring(3)}/${slug}/publish`);
      }}
      disabled={isSaving}
    >
      {isSaving && (
        <>
          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      )}
      {!isSaving && "Publish"}
    </Button>
  );
}
