"use client";

import React, { useEffect, useRef } from "react";
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
import { usePublishPost } from "@/hooks/usePublishPost";

type InitialState = {
  tags: TagOption[] | null;
  image: string | null;
};

export function Publish({ session }: { session: Session | null }) {
  const [initialState, setInitialState] = React.useState<InitialState>({
    tags: null,
    image: null,
  });
  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const { savePost } = useDebounceTagSave({ tags, delay: 1000 });
  const { tagOptions, handleCreateTag, isLoading } = useDebounceTagOptions({
    input,
    setTags,
    delay: 1000,
  });
  const { publish } = usePublishPost();
  const hasRun = useRef(false);

  // Set initial tags
  useEffect(() => {
    if (!savePost) return;
    if (!savePost.data) return;
    if (!savePost.data.tags) return;

    if (!hasRun.current && tags !== initialState.tags) {
      hasRun.current = true;
      const tags = savePost.data.tags.map((tag) => ({
        label: tag.title,
        value: tag.title,
      }));

      setTags(tags);
      setInitialState({
        tags,
        image: savePost.data.image,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savePost]);

  const handleSubmit = () => {
    if (!session) throw new Error("Session is required");
    if (!savePost) throw new Error("Post not found");
    if (!savePost.data) throw new Error("Post data not found");
    if (!savePost.data.title) throw new Error("Post title not found");
    const { id, title } = savePost.data;

    publish(id, title);
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
                    {!initialState.image && (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <span className="text-center text-sm lowercase">
                          Sisipkan satu gambar untuk dijadikan thumbnail
                        </span>
                      </div>
                    )}
                    {initialState.image && (
                      <Image
                        src={initialState.image ?? ""}
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
