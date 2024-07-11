import { useEffect, useState } from "react";

type SearchHistory = {
  title: string;
  slug: string;
};

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem("searchHistory");

    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory) as SearchHistory[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);
  const addToSearchHistory = (search: SearchHistory) => {
    // Check if the search already exists in the history
    const isSearchExist = searchHistory.some(
      (item) => item.slug === search.slug,
    );

    if (isSearchExist) {
      // Move the existing search to the first index
      const updatedSearchHistory = searchHistory.filter(
        (item) => item.slug !== search.slug,
      );
      setSearchHistory([search, ...updatedSearchHistory]);
    } else {
      setSearchHistory((prevSearchHistory) => [...prevSearchHistory, search]);
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addToSearchHistory, clearSearchHistory };
};
