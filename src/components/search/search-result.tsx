"use client";

import * as React from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useSearchHistory } from "@/hooks/useSearchHistory";

import { Button } from "../ui/button";

export function SearchResult() {
  const [searchQuery] = useQueryState("q");
  const { searchHistory, addToSearchHistory, removeFromSearchHistory } =
    useSearchHistory();

  React.useEffect(() => {
    if (searchQuery && searchQuery?.length > 0) {
      addToSearchHistory(searchQuery);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="container">
      {(!searchQuery || searchQuery?.length === 0) && (
        <ul className="max-w-screen-sm">
          {searchHistory.length > 0 && (
            <div>
              <h2 className="pb-2 font-serif text-3xl font-bold italic tracking-wide first:mt-0">
                Pencarian Terbaru
              </h2>
              {searchHistory.map((history) => (
                <div className="flex items-center" key={history}>
                  <Link
                    href={`/search?q=${history}`}
                    className="flex h-10 basis-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {history}
                  </Link>
                  <Button
                    onClick={() => {
                      removeFromSearchHistory(history);
                    }}
                    size="icon"
                    variant="ghost"
                    className="basis-auto"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}
