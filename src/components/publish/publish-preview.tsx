"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { type Session } from "next-auth";
import { AlertCircle, TagsIcon, UsersRoundIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreateableSelect } from "@/components/ui/react-select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type TagOption,
  useDebounceTagOptions,
} from "@/hooks/useDebounceTagOptions";
import { useDebounceTagSave } from "@/hooks/useDebounceTagSave";
import { usePublishPost } from "@/hooks/usePublishPost";
import { isWordInSentenceMoreThan, isWordMoreThan } from "@/lib/utils";

export function PublishPreview({ session }: { session: Session | null }) {
  const { username, slug } = useParams<{
    username: string;
    slug: string;
  }>();
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [tags, setTags] = React.useState<TagOption[]>([]);
  const { postQuery } = useDebounceTagSave({ tags, delay: 1000 });
  const { tagOptions, handleCreateTag, isLoading } = useDebounceTagOptions({
    input,
    setTags,
    delay: 1000,
  });
  const { publish, isPublishing } = usePublishPost();

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

  if (isPublishing) {
    return (
      <div className="container">
        <div className="flex h-screen flex-col items-center justify-center gap-y-2">
          <div className="publish-loader"></div>
          <p className="mt-2 text-lg leading-7">Mempublish postingan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen pt-6 md:pt-12">
      <div>
        <h2 className="font-serif text-4xl font-bold italic tracking-wide">
          Publish Postingan
        </h2>
        <p className="mt-2 text-lg leading-7">
          {`Postingan yang telah dipublikasi tidak akan dapat diubah
                kembali. Pastikan postingan telah sesuai.`}
        </p>
      </div>
      <div className="my-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="grid-cols-4 md:grid ">
              <div className="md:col-span-3 md:mr-12">
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
                  <Label htmlFor="label-select" className="font-serif text-lg">
                    Label
                  </Label>
                  {!postQuery.isLoading && (
                    <CreateableSelect
                      isMulti
                      maxMenuHeight={128}
                      inputId="label-select"
                      placeholder="Beri label..."
                      classNames={{
                        container: () => "no-lenis",
                      }}
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
              <div className="my-10 md:m-0">
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="secondary"
              className="md:min-w-40"
              onClick={() => {
                router.push(`/@${username?.substring(3)}/${slug}/edit`);
              }}
            >
              Kembali
            </Button>

            <Button
              variant="success"
              className="md:min-w-40"
              onClick={handleSubmit}
              disabled={tags.length === 0 || isLoading}
            >
              Publish
            </Button>
          </CardFooter>
        </Card>
        <div className="-order-1 space-y-4">
          <Alert>
            <TagsIcon className="h-4 w-4" />
            <AlertTitle className="font-serif">
              Tuliskan label yang sesuai dengan isi postingan kamu
            </AlertTitle>
            <AlertDescription className="text-pretty text-xs text-muted-foreground">
              Beberapa rekomendasi label populer diantaranya yaitu berita,
              penelitian, kompetisi, pengembangan diri, perkuliahan, perangkat
              lunak, teknologi, dan media.
            </AlertDescription>
          </Alert>

          <Alert>
            <UsersRoundIcon className="h-4 w-4" />
            <AlertTitle className="font-serif">
              Info Untuk Departemen Advokastra
            </AlertTitle>
            <AlertDescription className="text-pretty text-xs text-muted-foreground">
              Berikut ini adalah label yang direkomendasikan agar postingan
              dapat masuk ke website pmb-himarpl: berita pmb, snbp, snbt, sm
              upi, dan prestasi istimewa.
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
    </div>
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
