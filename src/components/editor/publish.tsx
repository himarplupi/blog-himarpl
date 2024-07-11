"use client";

import * as React from "react";
import Image from "next/image";
import { type Session } from "next-auth";
import {
  AlertCircle,
  Loader2Icon,
  TagsIcon,
  UsersRoundIcon,
} from "lucide-react";

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
import { useEditor } from "@/hooks/useEditor";
import { usePublishPost } from "@/hooks/usePublishPost";
import { isWordInSentenceMoreThan, isWordMoreThan } from "@/lib/utils";

import { CharacterCount } from "./character-count";

export function Publish({ session }: { session: Session | null }) {
  const [input, setInput] = React.useState("");
  const { isPublishable, isSaving } = useEditor();
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const { postQuery } = useDebounceTagSave({ tags, delay: 1000 });
  const { tagOptions, handleCreateTag, isLoading } = useDebounceTagOptions({
    input,
    setTags,
    delay: 1000,
  });
  const { publish } = usePublishPost();

  React.useEffect(() => {
    setTags(
      postQuery.data?.post?.tags?.map((tag) => ({
        label: tag.title,
        value: tag.title,
      })) ?? [],
    );
  }, [postQuery.data]);

  const handleSubmit = () => {
    if (!session) throw new Error("Session is required");
    if (!postQuery.data?.post) throw new Error("Post not found");

    const { post } = postQuery.data;

    publish(post.id, post.title);
  };

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="success"
          size="sm"
          disabled={!isPublishable || isSaving}
        >
          {isSaving && (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          )}
          {!isSaving && "Publish"}
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
                  {!postQuery.isLoading && (
                    <h4 className="scroll-m-20 truncate font-serif text-2xl font-semibold tracking-tight duration-300 animate-in fade-in">
                      {postQuery.data?.post?.title}
                    </h4>
                  )}
                  {postQuery.isLoading && (
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
                    {!postQuery.isLoading && (
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
                    {postQuery.isLoading && <Skeleton className="h-9 w-full" />}
                  </div>
                </div>
                <div className="my-10 self-end md:m-0">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    {!postQuery.data?.post?.image && (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <span className="text-center text-sm lowercase">
                          Sisipkan satu gambar untuk dijadikan thumbnail
                        </span>
                      </div>
                    )}
                    {postQuery.data?.post?.image && (
                      <Image
                        src={postQuery.data?.post?.image ?? ""}
                        alt={postQuery.data?.post?.title + " cover"}
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
