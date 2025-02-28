"use client";

import * as React from "react";
import { ReactLenis as RL } from "lenis/react";

export function ReactLenis({ children }: { children: React.ReactNode }) {
  return (
    <RL
      options={{
        prevent: (node) => {
          const classList = node.classList;
          if (classList.contains("no-lenis")) {
            return true;
          }
          return false;
        },
      }}
      className="max-h-screen overflow-y-auto"
    >
      {children}
    </RL>
  );
}
