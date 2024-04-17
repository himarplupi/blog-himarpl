"use client";

import React from "react";
import { type Session } from "next-auth";

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
import { Label } from "@/components/ui/label";
import { CreateableSelect } from "@/components/ui/react-select";
import {
  type TagOption,
  useDebounceTagOptions,
} from "@/hooks/useDebounceTagOptions";
import { useEditor } from "@/hooks/useEditor";

export function Publish({ session }: { session: Session | null }) {
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const [input, setInput] = React.useState("");
  const { title } = useEditor();
  const { tagOptions, handleCreateTag, isLoading } = useDebounceTagOptions({
    input,
    setTags,
    delay: 1000,
  });

  // TODO: Save Tags

  const handleSubmit = async () => {
    console.log("Publishing...", session);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success" size="sm">
          Publish
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Publish Postingan</DialogTitle>
          <DialogDescription>
            Postingan yang telah dipublikasi tidak akan dapat diubah kembali.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="scroll-m-20 font-serif text-xl font-semibold tracking-tight">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">{`akan dipublikasi pada akun: ${session?.user.name}`}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="label-select">Label</Label>
            <CreateableSelect
              isMulti
              inputId="label-select"
              placeholder="Beri label..."
              isLoading={isLoading}
              onInputChange={(value) => {
                setInput(value);
              }}
              onCreateOption={handleCreateTag}
              onChange={(value) => {
                setTags(value as TagOption[]);
              }}
              value={tags}
              options={tagOptions.data?.map(mapTags) ?? []}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={tags.length === 0 || isLoading}
            >
              Publish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const mapTags = (tag: {
  title: string;
  _count: { posts: number };
  id: string;
}) => ({
  label: `${tag.title} (${Intl.NumberFormat("id-ID", {
    notation: "compact",
  }).format(tag._count.posts)})`,
  value: tag.title,
});
