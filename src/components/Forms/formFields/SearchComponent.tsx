import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchResult {
  id: number;
  title: string;
  category?: string;
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample data - replace with your actual data source
  const sampleData: SearchResult[] = [
    { id: 1, title: "Homepage", category: "Pages" },
    { id: 2, title: "Products", category: "Pages" },
    { id: 3, title: "About Us", category: "Pages" },
    { id: 4, title: "Contact", category: "Pages" },
    { id: 5, title: "User Guide", category: "Documents" },
    { id: 6, title: "API Documentation", category: "Documents" },
    { id: 7, title: "Getting Started", category: "Articles" },
  ];

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = sampleData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }

    setSelectedResultIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedResultIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedResultIndex >= 0) {
      e.preventDefault();
      const selectedResult = searchResults[selectedResultIndex];
      console.log("Selected:", selectedResult);
      setSearchQuery(selectedResult.title);
      setSearchResults([]);
      setIsFocused(false);
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

  // Close search when clicking overlay
  // const handleOverlayClick = () => {
  //   setIsFocused(false);
  //   setSearchResults([]);
  // };

  // Group results by category for better display
  const groupedResults = searchResults.reduce<Record<string, SearchResult[]>>(
    (acc, result) => {
      const category = result.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(result);
      return acc;
    },
    {},
  );

  return (
    <div className="relative mx-4" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="What are you looking for?"
          className="w-full rounded-md border border-gray-300 py-1 pl-10 pr-8 transition-all duration-200 focus:border-gray-500 focus:outline-none"
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

      {/* Overlay and search results */}
      {isFocused && (
        <>
          {/* Search results dropdown */}
          {searchResults.length > 0 ? (
            <div className="absolute left-1/2 top-[105%] z-50 max-h-[60vh] w-full max-w-xl -translate-x-1/2 overflow-y-auto rounded-sm border border-gray-200 bg-white shadow-sm">
              {Object.entries(groupedResults).map(([category, results]) => (
                <div key={category}>
                  <div className="bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {category}
                  </div>
                  {results.map((result) => {
                    const globalIndex = searchResults.findIndex(
                      (r) => r.id === result.id,
                    );
                    const isSelected = selectedResultIndex === globalIndex;

                    return (
                      <div
                        key={result.id}
                        className={`cursor-pointer px-4 py-2 transition-colors duration-150 ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}
                        onClick={() => {
                          console.log("Selected", result);
                          setSearchQuery(result.title);
                          setSearchResults([]);
                          setIsFocused(false);
                        }}
                      >
                        <div className="font-medium text-gray-800">
                          {result.title}
                        </div>
                        {result.category && (
                          <div className="text-xs text-gray-500">
                            {result.category}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="absolute left-1/2 top-[105%] z-50 w-full max-w-xl -translate-x-1/2 rounded-sm border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-sm">
              No results found for {searchQuery}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default SearchComponent;
