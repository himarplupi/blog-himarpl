"use client";

import { createContext } from "react";
import type { Post } from "@prisma/client";

type MePostContextType = {
  draftPosts: Post[];
  publishedPosts: Post[];
};

export const MePostContext = createContext<MePostContextType>({
  draftPosts: [],
  publishedPosts: [],
});

export function MePostProvider({
  draftPosts,
  publishedPosts,
  children,
}: {
  draftPosts: Post[];
  publishedPosts: Post[];
  children: React.ReactNode;
}) {
  return (
    <MePostContext.Provider value={{ draftPosts, publishedPosts }}>
      {children}
    </MePostContext.Provider>
  );
}
