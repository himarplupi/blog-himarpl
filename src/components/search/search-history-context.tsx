"use client";

import * as React from "react";

export const SearchHistoryContext = React.createContext<{
  searchHistory: string[];
  addToSearchHistory: (search: string) => void;
  removeFromSearchHistory: (search: string) => void;
  clearSearchHistory: () => void;
}>({
  searchHistory: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToSearchHistory: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFromSearchHistory: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearSearchHistory: () => {},
});

export function SearchHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchHistory, setSearchHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!window) return;

    const storedSearchHistory = window.localStorage.getItem("searchHistory");

    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory) as string[]);
    }
  }, []);

  const addToSearchHistory = (search: string) => {
    if (!window) return;

    const rawStoredSearchHistory = window.localStorage.getItem("searchHistory");
    let storedSearchHistory: string[] = [];

    if (rawStoredSearchHistory) {
      storedSearchHistory = JSON.parse(rawStoredSearchHistory) as string[];
    }

    // Check if the search already exists in the history
    const isSearchExist = storedSearchHistory.some((item) => item === search);

    if (isSearchExist) {
      // Move the existing search to the first index
      const updatedSearchHistory = storedSearchHistory.filter(
        (item) => item !== search,
      );
      const updatedSearch = [search, ...updatedSearchHistory];
      window.localStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedSearch),
      );
      setSearchHistory(updatedSearch);
    } else {
      setSearchHistory((prevSearchHistory) => {
        const updatedSearch = [search, ...prevSearchHistory];
        window.localStorage.setItem(
          "searchHistory",
          JSON.stringify(updatedSearch),
        );
        return updatedSearch;
      });
    }
  };

  const removeFromSearchHistory = (search: string) => {
    if (!window) return;

    const rawStoredSearchHistory = window.localStorage.getItem("searchHistory");
    let storedSearchHistory: string[] = [];

    if (rawStoredSearchHistory) {
      storedSearchHistory = JSON.parse(rawStoredSearchHistory) as string[];
    }

    const updatedSearchHistory = storedSearchHistory.filter(
      (item) => item !== search,
    );

    window.localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedSearchHistory),
    );
    setSearchHistory(updatedSearchHistory);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        addToSearchHistory,
        removeFromSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}
