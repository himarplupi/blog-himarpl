"use client";

import { createContext } from "react";
import { type api } from "@/trpc/server";

type MeContextValue =
  | Awaited<ReturnType<typeof api.user.me.query>>
  | undefined
  | null;

export const MeContext = createContext<MeContextValue>(null);

type MeProviderProps = {
  children: React.ReactNode;
  me: MeContextValue;
};
export function MeProvider({ children, me }: MeProviderProps) {
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
}
