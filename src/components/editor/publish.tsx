"use client";

import React from "react";
import { type Session } from "next-auth";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

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
import { useEditor } from "@/hooks/useEditor";
import { api } from "@/trpc/react";

type Tag = {
  label: string;
  value: string;
};

export function Publish({ session }: { session: Session | null }) {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const tagCreate = api.postTag.create.useMutation();
  const tagOptions = api.postTag.search.useMutation();
  const [input, setInput] = React.useState("");
  const [debouncedInput] = useDebounce(input, 1000);
  const [isLoading, setIsLoading] = React.useState(false);
  const { title } = useEditor();

  // TODO: Save Tags

  React.useEffect(() => {
    if (input === debouncedInput) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [input, debouncedInput]);

  React.useEffect(() => {
    if (debouncedInput) {
      tagOptions.mutate(debouncedInput);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

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
              inputId="label-select"
              isLoading={
                tagOptions.isLoading || tagCreate.isLoading || isLoading
              }
              isMulti
              placeholder="Beri label..."
              onInputChange={(value) => {
                setInput(value);
              }}
              onCreateOption={async (value) => {
                const lowerCaseValue = value.toLowerCase();
                tagCreate.mutate(lowerCaseValue);
                tagOptions
                  .mutateAsync(lowerCaseValue)
                  .then(() => {
                    setTags((prev) => [
                      ...prev,
                      {
                        label: `${lowerCaseValue} (0)`,
                        value: lowerCaseValue,
                      },
                    ]);
                  })
                  .catch(() => {
                    toast.error("Gagal membuat label");
                  });
              }}
              onChange={(newTags) => {
                setTags(newTags as Tag[]);
              }}
              value={tags}
              options={
                tagOptions.data?.map(
                  (tag: {
                    title: string;
                    _count: { posts: number };
                    id: string;
                  }) => ({
                    label: `${tag.title} (${Intl.NumberFormat("id-ID", {
                      notation: "compact",
                    }).format(tag._count.posts)})`,
                    value: tag.title,
                  }),
                ) ?? []
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="success" onClick={handleSubmit}>
              Publish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
