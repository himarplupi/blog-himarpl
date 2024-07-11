"use client";

import { createContext } from "react";
import type { Session } from "next-auth";

type MePostContextType = {
  session: Session | null;
};

export const MePostContext = createContext<MePostContextType>({
  session: null,
});

export function MePostProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <MePostContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </MePostContext.Provider>
  );
}
