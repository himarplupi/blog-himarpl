"use client";

import { useContext } from "react";

import { SearchHistoryContext } from "@/components/search/search-history-context";

export const useSearchHistory = () => {
  const searchHistory = useContext(SearchHistoryContext);

  return searchHistory;
};
