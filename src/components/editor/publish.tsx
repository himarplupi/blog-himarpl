"use client";

import React from "react";
import Image from "next/image";
import { type Session } from "next-auth";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  type TagOption,
  useDebounceTagOptions,
} from "@/hooks/useDebounceTagOptions";
import { useDebounceTagSave } from "@/hooks/useDebounceTagSave";

export function Publish({ session }: { session: Session | null }) {
  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const { savePost } = useDebounceTagSave({ tags, delay: 1000 });
  const { tagOptions, handleCreateTag, isLoading } = useDebounceTagOptions({
    input,
    setTags,
    delay: 1000,
  });

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

      <DialogContent className="max-h-screen p-0 md:max-w-[768px]">
        <ScrollArea className="max-h-screen">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl tracking-wide">
                Publish Postingan
              </DialogTitle>
              <DialogDescription>
                {`Postingan yang telah dipublikasi tidak akan dapat diubah
                kembali. Pastikan postingan telah sesuai.`}
              </DialogDescription>
            </DialogHeader>
            <div className="my-6 space-y-4">
              <div className="space-y-1">
                <h4 className="scroll-m-20 truncate font-serif text-xl font-semibold tracking-tight">
                  {savePost?.data?.title}
                </h4>
                <p className="text-sm text-muted-foreground">{`Penulis: ${session?.user.name}`}</p>
              </div>
              <div className="space-y-1">
                <div className="sm:w-64">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    {!savePost?.data?.image && (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <span className="text-center text-sm lowercase">
                          Sisipkan satu gambar untuk dijadikan thumbnail
                        </span>
                      </div>
                    )}
                    {savePost?.data?.image && (
                      <Image
                        src={savePost?.data?.image ?? ""}
                        alt={savePost?.data?.title + " cover"}
                        fill
                        className="rounded-md object-cover"
                      />
                    )}
                  </AspectRatio>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="label-select">Label</Label>
                <CreateableSelect
                  isMulti
                  maxMenuHeight={128}
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
              <div className="flex flex-col gap-y-1 text-pretty text-sm tracking-wide text-muted-foreground">
                <p>
                  Tuliskan label yang sesuai dengan isi postingan kamu. Beberapa
                  rekomendasi label populer diantaranya yaitu berita,
                  penelitian, kompetisi, pengembangan diri, perkuliahan,
                  perangkat lunak, teknologi, dan media.
                  <span className="text-destructive">
                    *Postingan sangat direkomendasikan untuk diberi label!
                  </span>
                </p>
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
          </div>
        </ScrollArea>
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
