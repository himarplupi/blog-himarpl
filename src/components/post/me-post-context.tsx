"use client";

import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Post } from "@prisma/client";
import type { Session } from "next-auth";

type PostWithCategoryAndTags = Post & {
  tags:
    | {
        title: string;
        slug: string;
      }[]
    | null;
  category: {
    title: string;
    slug: string;
  } | null;
};

type MePostContextType = {
  draftPosts: PostWithCategoryAndTags[];
  setDraftPosts: Dispatch<SetStateAction<PostWithCategoryAndTags[]>> | null;
  publishedPosts: PostWithCategoryAndTags[];
  setPublishedPosts: Dispatch<SetStateAction<PostWithCategoryAndTags[]>> | null;
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
  draftPosts: PostWithCategoryAndTags[];
  publishedPosts: PostWithCategoryAndTags[];
  session: Session | null;
  children: React.ReactNode;
}) {
  const [draftPostsState, setDraftPostsState] =
    useState<PostWithCategoryAndTags[]>(draftPosts);
  const [publishedPostsState, setPublishedPostsState] =
    useState<PostWithCategoryAndTags[]>(publishedPosts);

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
