import { Search, X, Clock, ArrowUpLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchResult } from "@/types";
import { dummyKeywords } from "@/constants/keywords";

const translations = {
  en: {
    placeholder: "What are you looking for?",
    recent: "Recent Searches",
    clear: "Clear all",
    suggestions: "Suggestions",
    noResults: "No suggestions found for",
    searchFor: "Search for",
  },
  ar: {
    placeholder: "عن ماذا تبحث؟",
    recent: "عمليات البحث الأخيرة",
    clear: "مسح الكل",
    suggestions: "اقتراحات",
    noResults: "لم يتم العثور على اقتراحات لـ",
    searchFor: "البحث عن",
  },
};

interface SearchComponentProps {
  locale?: "en" | "ar";
}

const SearchComponent = ({ locale = "en" }: SearchComponentProps) => {
  const t = translations[locale];
  const isRtl = locale === "ar";

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const matchedKeywords = dummyKeywords
        .filter((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase()),
        )
        .map((keyword, index) => ({
          id: `keyword-${index}`,
          title: keyword,
          type: "recent" as const,
        }));

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

  const saveToRecentSearches = (title: string) => {
    if (
      !recentSearches.some(
        (item) => item.title.toLowerCase() === title.toLowerCase(),
      )
    ) {
      setRecentSearches((prev) => [
        { id: `recent-${Date.now()}`, title, type: "recent" },
        ...prev.slice(0, 4),
      ]);
    }
  };

  const performSearch = (query: string) => {
    if (query.trim()) {
      saveToRecentSearches(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
    setIsFocused(false);
    setSearchResults([]);
  };

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

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div
      className="static w-full md:relative"
      ref={searchRef}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={t.placeholder}
          className={`w-full rounded-sm border border-gray-300 py-1 ${
            isRtl ? "pl-8 pr-10" : "pl-10 pr-8"
          } outline-none placeholder:text-sm`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
            isRtl ? "right-3" : "left-3"
          }`}
        >
          <Search size={18} />
        </div>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
              inputRef.current?.focus();
            }}
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${
              isRtl ? "left-3" : "right-3"
            }`}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute left-0 right-0 top-full z-50 w-full">
          {!searchQuery && recentSearches.length > 0 && (
            <div className="border border-t-0 border-gray-200 bg-white p-2 shadow-lg md:rounded-sm">
              <div className="mb-2 flex items-center justify-between px-2 py-1">
                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <Clock className={`${isRtl ? "ml-2" : "mr-2"} h-3 w-3`} />
                  {t.recent}
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  {t.clear}
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

          {searchQuery && (
            <div className="rounded-sm border border-gray-200 bg-white p-2 shadow-lg">
              {searchResults.length > 0 ? (
                <>
                  <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t.suggestions}
                  </div>
                  {searchResults.map((result, index) => (
                    <div
                      key={`result-${result.id}`}
                      className={`cursor-pointer rounded px-3 py-2 ${
                        selectedResultIndex === index
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
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
                  {t.noResults} {searchQuery}
                </div>
              )}

              <div
                className="mt-1 cursor-pointer rounded bg-gray-50 px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => performSearch(searchQuery)}
              >
                {t.searchFor} {searchQuery}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
