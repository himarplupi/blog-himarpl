"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useState,
} from "react";
import type { Session } from "next-auth";

import type { Post } from "@prisma/client";

type PostWithTags = Post & { tags: { title: string; slug: string }[] | null };

type MePostContextType = {
  draftPosts: PostWithTags[];
  setDraftPosts: Dispatch<SetStateAction<PostWithTags[]>> | null;
  publishedPosts: PostWithTags[];
  setPublishedPosts: Dispatch<SetStateAction<PostWithTags[]>> | null;
  session: Session | null;
};

export const MePostContext = createContext<MePostContextType>({
  draftPosts: [],
  setDraftPosts: null,
  publishedPosts: [],
  setPublishedPosts: null,
  session: null,
});

export function MePostProvider({
  draftPosts,
  publishedPosts,
  session,
  children,
}: {
  draftPosts: PostWithTags[];
  publishedPosts: PostWithTags[];
  session: Session | null;
  children: React.ReactNode;
}) {
  const [draftPostsState, setDraftPostsState] =
    useState<PostWithTags[]>(draftPosts);
  const [publishedPostsState, setPublishedPostsState] =
    useState<PostWithTags[]>(publishedPosts);

  return (
    <MePostContext.Provider
      value={{
        draftPosts: draftPostsState,
        setDraftPosts: setDraftPostsState,
        publishedPosts: publishedPostsState,
        setPublishedPosts: setPublishedPostsState,
        session,
      }}
    >
      {children}
    </MePostContext.Provider>
  );
}
