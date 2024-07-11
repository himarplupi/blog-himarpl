"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontalIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { Sidebar } from "@/components/home/sidebar";
import { useSearchHistory } from "@/hooks/useSearchHistory";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { SearchResultItems } from "./search-result-items";

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

  if (!searchQuery || searchQuery?.length === 0) {
    return (
      <div className="container">
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
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-8 flex scroll-m-20 items-center justify-between pb-2">
        <h2 className="font-serif text-3xl font-bold italic tracking-wide first:mt-0">
          Hasil Pencarian Untuk {searchQuery}
        </h2>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontalIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full px-0">
              <Sidebar type="mobile" />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="xxl:gap-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-4 xl:gap-6">
        <div className="col-span-1 flex flex-col gap-y-4 pb-6 lg:col-span-2 lg:gap-y-6">
          <SearchResultItems searchQuery={searchQuery} />
        </div>
        <Sidebar type="desktop" />
      </div>
    </div>
  );
}
