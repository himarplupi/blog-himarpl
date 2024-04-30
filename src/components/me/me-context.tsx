"use client";

import { createContext } from "react";

import type { Department, SocialMedia, User } from "@prisma/client";

type MeContextValue =
  | (User & {
      socialMedia: SocialMedia[];
      department: Department | null;
    })
  | null;

export const MeContext = createContext<MeContextValue>(null);

type MeProviderProps = {
  children: React.ReactNode;
  me: MeContextValue;
};
export function MeProvider({ children, me }: MeProviderProps) {
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
}
