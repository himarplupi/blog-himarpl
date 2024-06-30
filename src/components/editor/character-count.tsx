"use client";

import { useEditor } from "@/hooks/useEditor";

export function CharacterCount() {
  const { isPublishable, editor } = useEditor();

  return (
    <div className="text-sm text-muted-foreground">
      <p>
        <span
          className={
            isPublishable ? "text-emerald-600 dark:text-emerald-400" : ""
          }
        >
          {/* eslint-disable-next-line */}
          {editor?.storage.characterCount.characters()} / 100
        </span>{" "}
        karakter
      </p>
      <p>
        <span
          className={
            isPublishable ? "text-emerald-600 dark:text-emerald-400" : ""
          }
        >
          {/* eslint-disable-next-line */}
          {editor?.storage.characterCount.words()} / 20
        </span>{" "}
        kata
      </p>
      <p>untuk publish artikel</p>
    </div>
  );
}
