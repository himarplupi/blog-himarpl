"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { type Session } from "next-auth";
import { AlertCircle, TagsIcon, UsersRoundIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  type TagOption,
  useDebounceTagOptions,
} from "@/hooks/useDebounceTagOptions";
import { useDebounceTagSave } from "@/hooks/useDebounceTagSave";
import { usePublishPost } from "@/hooks/usePublishPost";
import { isWordInSentenceMoreThan, isWordMoreThan } from "@/lib/utils";

type InitialState = {
  tags: TagOption[] | null;
  image: string | null;
  title: string | null;
};

export function Publish({ session }: { session: Session | null }) {
  const [initialState, setInitialState] = React.useState<InitialState>({
    tags: null,
    image: null,
    title: null,
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
        title: savePost.data.title,
        image: savePost.data.image,
      });
    }

    if (initialState.title !== savePost.data.title) {
      setInitialState({
        ...initialState,
        title: savePost.data.title,
      });
    }

    if (initialState.image !== savePost.data.image) {
      setInitialState({
        ...initialState,
        image: savePost.data.image,
      });
    }

    if (initialState.tags !== tags) {
      setInitialState({
        ...initialState,
        tags,
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
        <Button
          variant="success"
          size="sm"
          disabled={
            savePost?.data?.content.length === 0 ||
            savePost?.data?.title.length === 0
          }
        >
          Publish
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen p-0 md:max-w-[768px]">
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
              <div className="grid-cols-4 md:grid">
                <div className="md:col-span-3 md:mr-32">
                  {initialState.title && (
                    <h4 className="scroll-m-20 truncate font-serif text-2xl font-semibold tracking-tight duration-300 animate-in fade-in">
                      {initialState.title}
                    </h4>
                  )}
                  {!initialState.title && (
                    <Skeleton className="h-8 w-full md:w-1/2" />
                  )}

                  <p className="mb-3 text-sm text-muted-foreground duration-300 animate-in fade-in">{`Penulis: ${session?.user.name}`}</p>

                  <div className="space-y-1">
                    <Label
                      htmlFor="label-select"
                      className="font-serif text-lg"
                    >
                      Label
                    </Label>
                    {initialState.tags && (
                      <CreateableSelect
                        isMulti
                        maxMenuHeight={128}
                        inputId="label-select"
                        placeholder="Beri label..."
                        className="duration-300 animate-in fade-in"
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
                    )}
                    {!initialState.tags && <Skeleton className="h-9 w-full" />}
                  </div>
                </div>
                <div className="my-10 self-end md:m-0">
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
              <div className="space-y-4">
                <Alert>
                  <TagsIcon className="h-4 w-4" />
                  <AlertTitle className="font-serif">
                    Tuliskan label yang sesuai dengan isi postingan kamu
                  </AlertTitle>
                  <AlertDescription className="text-pretty text-xs text-muted-foreground">
                    Beberapa rekomendasi label populer diantaranya yaitu berita,
                    penelitian, kompetisi, pengembangan diri, perkuliahan,
                    perangkat lunak, teknologi, dan media.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <UsersRoundIcon className="h-4 w-4" />
                  <AlertTitle className="font-serif">
                    Info Untuk Departemen Advokastra
                  </AlertTitle>
                  <AlertDescription className="text-pretty text-xs text-muted-foreground">
                    Berikut ini adalah label yang direkomendasikan agar
                    postingan dapat masuk ke website pmb-himarpl: pmb, snbp,
                    snbt, sm upi, dan prestasi istimewa.
                  </AlertDescription>
                </Alert>

                {tags.length === 0 && (
                  <Alert
                    variant="destructive"
                    className="duration-300 animate-in zoom-in slide-in-from-top"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-serif">
                      Postingan sangat direkomendasikan untuk diberi label!
                    </AlertTitle>
                  </Alert>
                )}
                {isWordMoreThan(input, 3) && (
                  <Alert
                    variant="destructive"
                    className="duration-300 animate-in zoom-in slide-in-from-top"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-serif">
                      Maksimum 3 kata untuk setiap label
                    </AlertTitle>
                  </Alert>
                )}
                {isWordInSentenceMoreThan(input, 16) && (
                  <Alert
                    variant="destructive"
                    className="duration-300 animate-in zoom-in slide-in-from-top"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-serif">
                      Maksimum 16 huruf untuk setiap kata dalam label
                    </AlertTitle>
                  </Alert>
                )}
                {tags.length > 4 && (
                  <Alert
                    variant="warning"
                    className="duration-300 animate-in zoom-in slide-in-from-top"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-serif">
                      Jumlah label terlalu banyak
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      Direkomendiasikan untuk memilih maksimal 4 label.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="success"
                  onClick={handleSubmit}
                  disabled={
                    tags.length === 0 ||
                    isLoading ||
                    savePost?.data?.content.length === 0 ||
                    savePost?.data?.title.length === 0
                  }
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
