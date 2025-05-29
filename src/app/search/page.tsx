"use client";

import LeftFilter from "@/components/UI/filter/LeftFilter";
import TapFilter from "@/components/UI/filter/TapFilter";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/constants/products";
import { Product } from "@/types/product";
import ProductCard from "@/components/UI/cards/ProductCard";
import { Drawer } from "@/components/UI/Drawer";
import { ArrowDownUp, Filter } from "lucide-react";
import Dropdown from "@/components/UI/DropDownMenu";
import MobileDropdown from "@/components/UI/MobileDropdown";
import ViewToggle from "@/components/UI/Buttons/ViewToggle";
import ListProductCard from "@/components/UI/cards/ListProductCard";
import { leftFilters, sortOptions, tapFilters } from "@/constants/filters";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [view, setView] = useState<"list" | "grid">("grid");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const initialPage = searchParams.get("page");
    return initialPage ? parseInt(initialPage, 10) : 1;
  });
  const itemsPerPage = 10;

  // Get current filters from URL
  const getCurrentFilters = () => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "sort" && key !== "q") {
        filters[key] = value.split(",");
      }
    });
    return filters;
  };

  // Toggle filter in URL
  const toggleFilter = (filterKey: string, filterValue: string) => {
    const currentFilters = getCurrentFilters();
    const newSearchParams = new URLSearchParams(searchParams.toString());

    const existingValues = currentFilters[filterKey] || [];

    // If filterValue exists, remove it (toggle off)
    if (existingValues.includes(filterValue)) {
      const updated = existingValues.filter((v) => v !== filterValue);
      if (updated.length > 0) {
        newSearchParams.set(filterKey, updated.join(","));
      } else {
        newSearchParams.delete(filterKey);
      }
    } else if (existingValues.length > 0) {
      // Replace the first existing value with the new one (update)
      existingValues[0] = filterValue;
      newSearchParams.set(filterKey, existingValues.join(","));
    } else {
      // Add the new filterValue
      newSearchParams.set(filterKey, filterValue);
    }

    newSearchParams.delete("page");

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const toggleSingleFilter = (filterKey: string, filterValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(filterKey, filterValue); // Overwrite with new value
    newSearchParams.delete("page"); // Reset to page 1
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  // Set sort option
  const setSortOption = (sortValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", sortValue);
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  // Set page
  const setPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.replace(`${pathname}?${newSearchParams.toString()}`);
    setCurrentPage(page); // set the number directly
  };

  // Get current sort option
  const getCurrentSort = () => {
    return searchParams.get("sort") || "recommended";
  };

  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams();
    // Preserve search term if needed
    if (searchParams.get("q")) {
      newSearchParams.set("q", searchParams.get("q")!);
    }
    // Preserve sort if needed
    if (searchParams.get("sort")) {
      newSearchParams.set("sort", searchParams.get("sort")!);
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };
  // Fetch products (mock implementation)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        setProductsData(products);
        setTotalResults(5788); // Mock total results
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Get active search term or filters to display
  const query = searchParams.get("q");
  const selectedCategoryId = searchParams.get("category");
  const selectedBrandId = searchParams.get("brand");

  const selectedCategory = leftFilters
    .find((f) => f.id === "category")
    ?.options?.flatMap((opt) => [opt, ...(opt.subcategories ?? [])])
    .find((opt) => opt.id === selectedCategoryId);

  const selectedBrand = leftFilters
    .find((f) => f.id === "brand")
    ?.options?.find((opt) => opt.id === selectedBrandId);

  let displayTitle = "";

  if (selectedCategory && selectedBrand) {
    displayTitle = `${selectedCategory.name} For ${selectedBrand.name}`;
  } else if (selectedCategory) {
    displayTitle = selectedCategory.name;
  } else if (selectedBrand) {
    displayTitle = selectedBrand.name;
  } else if (query) {
    displayTitle = query;
  } else {
    displayTitle = "Products";
  }

  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-6 py-4 lg:max-w-[1440px]">
        <div className="gap-4 lg:flex">
          <div className="hidden lg:block">
            {/* Left sidebar filters in lage screen */}
            <LeftFilter
              filterGroups={leftFilters}
              currentFilters={getCurrentFilters()}
              onFilterToggle={(key, value) => {
                const singleSelectKeys = ["category", "brand"];
                if (singleSelectKeys.includes(key)) {
                  toggleSingleFilter(key, value);
                } else {
                  toggleFilter(key, value);
                }
              }}
              onClearFilters={clearAllFilters}
            />
          </div>

          <Drawer
            position="left"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            {/* Left sidebar filters in lage screen */}
            <LeftFilter
              filterGroups={leftFilters}
              currentFilters={getCurrentFilters()}
              onFilterToggle={(key, value) => {
                const singleSelectKeys = ["category", "brand"];
                if (singleSelectKeys.includes(key)) {
                  toggleSingleFilter(key, value);
                } else {
                  toggleFilter(key, value);
                }
              }}
              onClearFilters={clearAllFilters}
            />
          </Drawer>
          <div className="fixed bottom-20 left-1/2 z-[300] flex -translate-x-1/2 items-center rounded-full bg-primary text-sm text-white md:hidden">
            <button
              onClick={() => setIsOpenDropdown(true)}
              className="flex items-center gap-1 px-3 py-2"
            >
              Sort by <ArrowDownUp size={15} />
            </button>
            |
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 px-3 py-2"
            >
              Filter <Filter size={15} />
            </button>
          </div>
          {/* Main content */}
          <div className="flex-1">
            {/* Sort and results header */}
            <div className="sticky top-0 z-20 mb-4 flex w-full items-center justify-between border-y border-gray-200 bg-white md:relative md:border-none">
              <h1 className="p-3 text-xs text-gray-900 md:text-lg">
                {totalResults.toLocaleString()} Results for{" "}
                <span className="text-xs font-semibold md:text-lg">
                  &#8220;{displayTitle}&#8220;
                </span>
              </h1>
              <div className="hidden md:block">
                <Dropdown
                  label="Sort by"
                  icon={<ArrowDownUp size={15} />}
                  options={sortOptions}
                  selected={getCurrentSort()}
                  onSelect={(value) => setSortOption(value.toString())}
                />
              </div>
              <div className="block md:hidden">
                <ViewToggle view={view} onChange={setView} />
              </div>
            </div>
            <MobileDropdown
              label="Sort by"
              options={sortOptions}
              selected={getCurrentSort()}
              onSelect={(value) => setSortOption(value.toString())}
              isOpen={isOpenDropdown}
              setIsOpen={setIsOpenDropdown}
            />
            {/* Tap filters */}
            <div className="mb-4 gap-2 border-b border-gray-200 p-4">
              <TapFilter
                filterGroups={tapFilters}
                currentFilters={getCurrentFilters()}
                onFilterToggle={toggleFilter}
              />
            </div>

            {/* Products */}
            {loading ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-lg bg-white p-4 shadow-sm"
                  ></div>
                ))}
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {productsData.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              // List view: vertically stacked full-width cards
              <div className="flex flex-col gap-4">
                {productsData.map((product) => (
                  <div key={product.id} className="w-full">
                    <ListProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalResults > itemsPerPage && (
              <div className="mt-6 flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex justify-center sm:justify-start">
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">
                      {Math.ceil(totalResults / itemsPerPage)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`hidden rounded-md border px-4 py-2 text-sm font-medium md:block ${
                      currentPage === 1
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from(
                    {
                      length: Math.min(
                        5,
                        Math.ceil(totalResults / itemsPerPage),
                      ),
                    },
                    (_, i) => {
                      let pageNum;
                      if (Math.ceil(totalResults / itemsPerPage) <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        currentPage >=
                        Math.ceil(totalResults / itemsPerPage) - 2
                      ) {
                        pageNum =
                          Math.ceil(totalResults / itemsPerPage) - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`rounded-md border px-4 py-2 text-sm font-medium ${
                            currentPage === pageNum
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    },
                  )}
                  <button
                    onClick={() =>
                      setPage(
                        Math.min(
                          Math.ceil(totalResults / itemsPerPage),
                          currentPage + 1,
                        ),
                      )
                    }
                    disabled={
                      currentPage === Math.ceil(totalResults / itemsPerPage)
                    }
                    className={`hidden rounded-md border px-4 py-2 text-sm font-medium md:block ${
                      currentPage === Math.ceil(totalResults / itemsPerPage)
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
