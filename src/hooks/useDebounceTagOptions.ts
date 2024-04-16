"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { api } from "@/trpc/react";

export const useDebounceTagOptions = (input: string, delay: number) => {
  const tagOptions = api.postTag.search.useMutation();
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
    setIsLoading(tagOptions.isLoading);
  }, [tagOptions.isLoading]);

  return { tagOptions, isLoading };
};
