"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { api } from "@/trpc/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    capture_pageleave: true, // Enable pageleave capture
  });
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PHAuthWrapper>{children}</PHAuthWrapper>
    </PostHogProvider>
  );
}

export function PHAuthWrapper({ children }: { children: React.ReactNode }) {
  const meQuery = api.user.me.useQuery();

  React.useEffect(() => {
    if (meQuery.isSuccess && meQuery.data) {
      const user = meQuery.data;
      posthog.identify(user.id, {
        name: user.name,
        username: user.username,
        image: user.image,
        email: user.email,
      });
    } else if (meQuery.isError) {
      posthog.reset();
    }
  }, [meQuery]);

  return children;
}
