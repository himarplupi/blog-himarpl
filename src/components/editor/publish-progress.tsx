"use client";
import * as React from "react";
import { Loader2 } from "lucide-react";

export function PublishProgress() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 m-0 flex flex-col items-center justify-center gap-y-4 bg-muted/80 animate-in zoom-in">
      <h2 className="font-serif text-4xl tracking-tight">Publishing...</h2>
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
