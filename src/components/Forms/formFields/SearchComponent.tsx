import { Search, X, Clock, ArrowUpLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResult } from "@/types";
import { dummyKeywords } from "@/constants/keywords";

const SearchComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      // Match against dummy keywords
      const matchedKeywords = dummyKeywords
        .filter((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase()),
        )
        .map((keyword, index) => ({
          id: `keyword-${index}`,
          title: keyword,
          type: "recent" as const,
        }));

      // Also include recent searches that match
      const matchedRecentSearches = recentSearches
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        )
        .map((item) => ({
          ...item,
          type: "recent" as const,
        }));

      const results = [...matchedKeywords, ...matchedRecentSearches];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }

    setSelectedResultIndex(-1);
  };

  // Save a search to recent searches
  const saveToRecentSearches = (title: string) => {
    // Avoid duplicates
    if (
      !recentSearches.some(
        (item) => item.title.toLowerCase() === title.toLowerCase(),
      )
    ) {
      setRecentSearches((prev) => [
        { id: `recent-${Date.now()}`, title, type: "recent" },
        ...prev.slice(0, 4), // Keep only 5 most recent
      ]);
    }
  };

  // Perform search and update URL
  const performSearch = (query: string) => {
    if (query.trim()) {
      saveToRecentSearches(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
    setIsFocused(false);
    setSearchResults([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedResultIndex >= 0 && searchResults.length > 0) {
        const selectedResult = searchResults[selectedResultIndex];
        setSearchQuery(selectedResult.title);
        performSearch(selectedResult.title);
      } else if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    }
  };

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="What are you looking for?"
          className="w-full rounded-sm border border-gray-300 py-1.5 pl-10 pr-8 outline-none transition-all duration-200 placeholder:text-sm focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search results dropdown */}
      {isFocused && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full">
          {/* Show recent searches and keyword suggestions when there's no query */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="rounded-sm border border-gray-200 bg-white p-2 shadow-lg">
              <div className="mb-2 flex items-center justify-between px-2 py-1">
                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <Clock className="mr-2 h-3 w-3" />
                  Recent Searches
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((result) => (
                <div
                  key={`recent-${result.id}`}
                  className="flex cursor-pointer items-center justify-between rounded px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSearchQuery(result.title);
                    performSearch(result.title);
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-sm">{result.title}</span>
                  </div>
                  <ArrowUpLeft className="text-gray-400" size={15} />
                </div>
              ))}
            </div>
          )}

          {/* Show keyword suggestions when there's a query */}
          {searchQuery && (
            <div className="rounded-sm border border-gray-200 bg-white p-2 shadow-lg">
              {searchResults.length > 0 ? (
                <>
                  <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Suggestions
                  </div>
                  {searchResults.map((result, index) => (
                    <div
                      key={`result-${result.id}`}
                      className={`cursor-pointer rounded px-3 py-2 ${selectedResultIndex === index ? "bg-gray-100" : "hover:bg-gray-100"}`}
                      onClick={() => {
                        setSearchQuery(result.title);
                        performSearch(result.title);
                      }}
                    >
                      <div className="text-sm">{result.title}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-3 text-center text-sm text-gray-500">
                  No suggestions found for {searchQuery}
                </div>
              )}

              <div
                className="mt-1 cursor-pointer rounded bg-gray-50 px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => performSearch(searchQuery)}
              >
                Search for {searchQuery}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
