"use client";

import { useContext } from "react";

import { MeContext } from "@/components/me/me-context";

export function useMe() {
  return useContext(MeContext);
}
