"use client";

import React from "react";

import { ToggleGroup } from "@/components/ui/toggle-group";
import { useEditor } from "@/hooks/useEditor";

export function TextFormatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { editor, isHeading } = useEditor();

  return (
    <ToggleGroup
      type="multiple"
      disabled={isHeading}
      value={[
        editor?.isActive("bold") ? "bold" : "",
        editor?.isActive("italic") ? "italic" : "",
        editor?.isActive("underline") ? "underline" : "",
        editor?.isActive("strike") ? "strike" : "",
        editor?.isActive("code") ? "code" : "",
        editor?.isActive("highlight") ? "highlight" : "",
        editor?.isActive("superscript") ? "superscript" : "",
        editor?.isActive("subscript") ? "subscript" : "",
        editor?.isActive("blockquote") ? "blockquote" : "",
        editor?.isActive("codeBlock") ? "codeblock" : "",
      ]}
    >
      {children}
    </ToggleGroup>
  );
}
