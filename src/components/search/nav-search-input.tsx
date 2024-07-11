"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CompassIcon, SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { cn } from "@/lib/utils";

export function NavSearchInput() {
  const { searchHistory, removeFromSearchHistory } = useSearchHistory();
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const shortedSearchHistory = searchHistory.slice(0, 3);

  return (
    <div className="group relative hidden md:flex">
      <Label
        htmlFor="search-input"
        className={cn(
          "absolute left-0 top-0 flex h-full w-10 items-center justify-center bg-transparent",
        )}
      >
        <SearchIcon className="h-5 w-5" />
      </Label>
      <Input
        type="search"
        className="pl-10 md:min-w-80"
        id="search-input"
        placeholder="Cari"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?q=${search}`);
          }
        }}
      />

      <ul className="absolute left-0 right-0 top-full z-50 mt-2 hidden overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md duration-300 animate-in fade-in slide-in-from-top-5 group-focus-within:block">
        {shortedSearchHistory.length > 0 && (
          <div>
            <p className="px-2 py-1.5 text-sm font-medium">Pencarian Terbaru</p>
            {shortedSearchHistory.map((history) => (
              <div className="flex items-center" key={history}>
                <Link
                  href={`/search?q=${history}`}
                  onClick={() => {
                    setSearch(history);
                  }}
                  className="flex h-10 basis-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <SearchIcon className="mr-2 h-5 w-5" />
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
        <div className="flex items-center">
          <Link
            href={"/explore-tags"}
            className="flex h-10 basis-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          >
            <CompassIcon className="mr-2 h-5 w-5" />
            Telusuri Label
          </Link>
        </div>
      </ul>
    </div>
  );
}
