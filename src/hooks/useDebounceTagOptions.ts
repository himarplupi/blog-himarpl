"use client";

import { type Dispatch, useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

import { api } from "@/trpc/react";

export type TagOption = {
  label: string;
  value: string;
};

export type Props = {
  input: string;
  delay: number;
  setTags: Dispatch<React.SetStateAction<TagOption[]>>;
};

export const useDebounceTagOptions = ({ input, delay, setTags }: Props) => {
  const tagOptions = api.postTag.search.useMutation();
  const tagCreate = api.postTag.create.useMutation();
  const [debouncedInput] = useDebounce(input, delay);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (input === debouncedInput) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [input, debouncedInput]);

  useEffect(() => {
    if (debouncedInput) {
      tagOptions.mutate(debouncedInput);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    setIsLoading(tagOptions.isLoading || tagCreate.isLoading);
  }, [tagOptions.isLoading, tagCreate.isLoading]);

  const handleCreateTag = (value: string) => {
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
  };

  return { tagOptions, handleCreateTag, isLoading };
};
