"use client";

import LeftFilter from "@/components/UI/filter/LeftFilter";
import TapFilter from "@/components/UI/filter/TapFilter";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { products } from "@/constants/products";
import { Product } from "@/types/product";
import ProductCard from "@/components/UI/cards/ProductCard";

type FilterOption = {
  id: string;
  name: string;
  count?: number;
  subcategories?: FilterOption[];
};

type FilterGroup = {
  id: string;
  name: string;
  options: FilterOption[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  //   const [currentPage, setCurrentPage] = useState(1);
  const currentPage = 1;
  const itemsPerPage = 10;

  // Mock data for filters
  const leftFilters: FilterGroup[] = [
    {
      id: "category",
      name: "Category",
      options: [
        {
          id: "electronics",
          name: "Electronics & Mobiles",
          subcategories: [
            { id: "smartphones", name: "Smartphones" },
            { id: "laptops", name: "Laptops" },
            { id: "smartwatches", name: "Smartwatches" },
          ],
        },
        {
          id: "health",
          name: "Health & Nutrition",
          subcategories: [
            { id: "vitamins", name: "Vitamins" },
            { id: "protein", name: "Protein" },
            { id: "weight-loss", name: "Weight Loss" },
          ],
        },
        { id: "all-health", name: "All Health & Nutrition" },
        { id: "medical", name: "Medical Supplies & Equipment" },
        { id: "fashion", name: "Fashion" },
        { id: "baby", name: "Baby Products" },
        { id: "toys", name: "Toys & Games" },
        { id: "books", name: "Books" },
      ],
    },
    {
      id: "brand",
      name: "Brand",
      options: [
        { id: "apple", name: "Apple", count: 124 },
        { id: "samsung", name: "Samsung", count: 89 },
        { id: "huawei", name: "Huawei", count: 76 },
        { id: "amazfit", name: "Amazfit", count: 42 },
        { id: "fitbit", name: "Fitbit", count: 35 },
        { id: "xiaomi", name: "Xiaomi", count: 28 },
        { id: "garmin", name: "Garmin", count: 22 },
        { id: "fossil", name: "Fossil", count: 18 },
      ],
    },
    {
      id: "price",
      name: "Price",
      options: [
        { id: "deals", name: "Deals" },
        { id: "price-drop", name: "Price drop" },
        { id: "under-1000", name: "Under EGP 1000" },
        { id: "1000-2000", name: "EGP 1000 - EGP 2000" },
        { id: "2000-5000", name: "EGP 2000 - EGP 5000" },
        { id: "over-5000", name: "Over EGP 5000" },
      ],
    },
    {
      id: "rating",
      name: "Customer Rating",
      options: [
        { id: "4.5", name: "4.5 & Up", count: 1245 },
        { id: "4", name: "4 & Up", count: 1890 },
        { id: "3.5", name: "3.5 & Up", count: 2345 },
        { id: "3", name: "3 & Up", count: 2890 },
      ],
    },
    {
      id: "availability",
      name: "Availability",
      options: [
        { id: "in-stock", name: "In Stock", count: 3456 },
        { id: "out-of-stock", name: "Out of Stock", count: 123 },
        { id: "pre-order", name: "Pre-order", count: 45 },
      ],
    },
  ];

  const tapFilters: FilterGroup[] = [
    {
      id: "brand-tap",
      name: "Brand",
      options: leftFilters.find((f) => f.id === "brand")?.options || [],
    },
    {
      id: "material",
      name: "Material",
      options: [
        { id: "stainless-steel", name: "Stainless Steel", count: 45 },
        { id: "aluminum", name: "Aluminum", count: 32 },
        { id: "plastic", name: "Plastic", count: 28 },
        { id: "titanium", name: "Titanium", count: 12 },
        { id: "ceramic", name: "Ceramic", count: 8 },
      ],
    },
    {
      id: "color",
      name: "Colour",
      options: [
        { id: "black", name: "Black", count: 67 },
        { id: "silver", name: "Silver", count: 45 },
        { id: "blue", name: "Blue", count: 32 },
        { id: "red", name: "Red", count: 24 },
        { id: "gold", name: "Gold", count: 18 },
        { id: "white", name: "White", count: 15 },
        { id: "green", name: "Green", count: 12 },
      ],
    },
  ];

  const sortOptions = [
    { id: "recommended", name: "Recommended" },
    { id: "price-asc", name: "Price: Low to High" },
    { id: "price-desc", name: "Price: High to Low" },
    { id: "rating", name: "Customer Rating" },
    { id: "newest", name: "Newest Arrivals" },
  ];

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

    if (currentFilters[filterKey]?.includes(filterValue)) {
      // Remove filter
      const updated = currentFilters[filterKey].filter(
        (v) => v !== filterValue,
      );
      if (updated.length > 0) {
        newSearchParams.set(filterKey, updated.join(","));
      } else {
        newSearchParams.delete(filterKey);
      }
    } else {
      // Add filter
      const existing = currentFilters[filterKey] || [];
      newSearchParams.set(filterKey, [...existing, filterValue].join(","));
    }

    // Reset to first page when filters change
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-4 lg:max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left sidebar filters */}
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

          {/* Main content */}
          <div className="flex-1">
            {/* Search header */}
            <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
              <h1 className="text-xl font-semibold text-gray-900">
                {totalResults.toLocaleString()} Results for smart watch
              </h1>
            </div>

            {/* Tap filters */}
            <div className="mb-4 flex flex-wrap gap-2 rounded-lg bg-white p-4 shadow-sm">
              <TapFilter
                filterGroups={tapFilters}
                currentFilters={getCurrentFilters()}
                onFilterToggle={toggleFilter}
              />
            </div>

            {/* Sort and results header */}
            <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalResults)} of{" "}
                {totalResults} products
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={getCurrentSort()}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 animate-pulse rounded-lg bg-white p-4 shadow-sm"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {productsData.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalResults > itemsPerPage && (
              <div className="mt-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">
                      {Math.ceil(totalResults / itemsPerPage)}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`rounded-md border px-4 py-2 text-sm font-medium ${
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
                    className={`rounded-md border px-4 py-2 text-sm font-medium ${
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
