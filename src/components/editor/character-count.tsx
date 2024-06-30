"use client";

import { useEditor } from "@/hooks/useEditor";

export function CharacterCount() {
  const { editor } = useEditor();

  return (
    <div className="text-sm text-muted-foreground">
      {/* eslint-disable-next-line */}
      <p>{editor?.storage.characterCount.characters()} karakter.</p>
      {/* eslint-disable-next-line */}
      <p>{editor?.storage.characterCount.words()} kata.</p>
    </div>
  );
}
