"use client";
import Link from "next/link";
import {
  LayoutGrid,
  List,
  PencilIcon,
  Search,
  SlidersHorizontal,
  TrashIcon,
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DynamicTable from "@/components/UI/tables/DTable";
import Dropdown from "@/components/UI/DropDownMenu";
import { Filters } from "@/components/UI/filter/FilterDrawer";
import { useMemo, useState } from "react";
import { products } from "@/constants/products";
import { Product } from "@/types/product";
import DateRangeSelector from "@/components/UI/DateRangeSelector";
import ProductCard from "@/components/UI/cards/ProductCard";
import { Pagination } from "@/components/UI/Pagination";
import { formatDate } from "@/util/dateUtils";
import { productFilters } from "@/constants/drawerFilter";

type Status = "active" | "pending" | "draft";

const columns = [
  {
    key: "title",
    header: "Product Name",
    sortable: true,
    render: (item: Product) => (
      <Link
        className="line-clamp-2 hover:underline"
        href={`/product-details/${item.id}`}
      >
        {item.title}
      </Link>
    ),
  },
  {
    key: "date",
    header: "Date",
    sortable: true,
    render: () => "15/5/2023",
  },
  {
    key: "id",
    header: "SKU",
    sortable: true,
  },
  {
    key: "seller",
    header: "Seller",
    sortable: true,
    render: () => "Brandona", // Placeholder - replace with actual seller from your data
  },
  {
    key: "category",
    header: "Category",
    sortable: true,
    render: (item: Product) => (
      <span>{item.category?.title || "Medical Wear"}</span>
    ),
  },
  {
    key: "subcategory",
    header: "Sub Category",
    sortable: true,
    render: () => "Scrubs", // Placeholder - replace with actual subcategory from your data
  },
  {
    key: "brand",
    header: "Brand",
    sortable: true,
    render: () => "Landeu", // Placeholder - replace with actual brand from your data
  },
  {
    key: "price",
    header: "Unit Price",
    render: (item: Product) => `${item.price} EGP`,
    sortable: true,
    align: "left",
  },
  {
    key: "totalPurchase",
    header: "Total Purchase",
    render: () => "160000 EGP", // Placeholder - replace with actual total purchase from your data
    sortable: true,
    align: "left",
  },
  {
    key: "status",
    header: "Status",
    render: (item: Product) => {
      const statusColor =
        item.status === "active"
          ? "bg-green-100 text-green-800"
          : item.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-600";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {(item.status ?? "unknown").charAt(0).toUpperCase() +
            (item.status ?? "unknown").slice(1)}
        </span>
      );
    },
    sortable: true,
    align: "center",
  },
  {
    key: "actions",
    header: "",
    render: () => (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800">
          <PencilIcon className="h-4 w-4" />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    ),
    align: "center",
  },
];

const statusOptions = [
  { id: "all", name: "All Statuses" },
  { id: "active", name: "Active" },
  { id: "pending", name: "Pending" },
  { id: "draft", name: "Draft" },
];

const stockOptions = [
  { id: "all", name: "All Stock" },
  { id: "in_stock", name: "In Stock" },
  { id: "out_of_stock", name: "Out of Stock" },
];

const categoryOptions = [
  { id: "all", name: "Select Category" },
  { id: "medical", name: "Medical Wear" },
  // Add more categories as needed
];

const subCategoryOptions = [
  { id: "all", name: "Select Sub Category" },
  { id: "scrubs", name: "Scrubs" },
  // Add more subcategories as needed
];

const brandOptions = [
  { id: "all", name: "All brand" },
  { id: "landeu", name: "Landeu" },
  // Add more brands as needed
];
const sellers = [
  { id: "all", name: "All Sellers" },
  { id: "mohamed", name: "mohamed" },
  // Add more brands as needed
];

export default function ProductListPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [seachQuary, setSeachQuary] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Get current filter values from URL
  const statusFilter = searchParams.get("status") || "all";
  const stockFilter = searchParams.get("stock") || "all";
  const categoryFilter = searchParams.get("category") || "all";
  const subCategoryFilter = searchParams.get("subcategory") || "all";
  const brandFilter = searchParams.get("brand") || "all";
  const sellersFilter = searchParams.get("sellerId") || "all";
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 6;

  const handleDateChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (range.startDate) {
      params.set("start_date", formatDate(range.startDate, "yyyy-MM-dd"));
    } else {
      params.delete("start_date");
    }

    if (range.endDate) {
      params.set("end_date", formatDate(range.endDate, "yyyy-MM-dd"));
    } else {
      params.delete("end_date");
    }

    router.replace(`${pathname}?${params.toString()}`);

    console.log("Selected range:", range);
  };

  // Count products by status for the summary cards
  const statusCounts = products.reduce(
    (acc: Record<Status, number>, product) => {
      if (
        product.status === "active" ||
        product.status === "pending" ||
        product.status === "draft"
      ) {
        acc[product.status] += 1;
      }
      return acc;
    },
    { active: 0, pending: 0, draft: 0 },
  );

  // Filter products based on URL params
  const filteredProducts = products.filter((product) => {
    if (statusFilter !== "all" && product.status !== statusFilter) return false;
    if (stockFilter === "in_stock" && (product.stock ?? 0) <= 0) return false;
    if (stockFilter === "out_of_stock" && (product.stock ?? 0) > 0)
      return false;
    if (categoryFilter !== "all" && product.category?.id !== categoryFilter)
      return false;
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery))
      return false;
    if (stockFilter === "in_stock" && (product.stock ?? 0) <= 0) return false;
    if (stockFilter === "out_of_stock" && (product.stock ?? 0) > 0)
      return false;

    return true;
  });

  //   const handleEditProduct = (slug: string) => {
  //     router.push(`products/edit-product/${slug}`);
  //   };
  // handle pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  // Update URL params when filters change
  const handleFilterChange = (
    filterType: string,
    value: string | Date | null,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(filterType);
    } else {
      const formattedValue =
        value instanceof Date ? value.toISOString() : value;
      params.set(filterType, formattedValue);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Handle status card click to filter by status
  const handleStatusClick = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("status") === status) {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.replace(pathname);
  };

  // Check if a status card is active (filter is applied)
  const isStatusActive = (status: string) => {
    return statusFilter === status;
  };

  return (
    <div className="relative space-y-6">
      <div className="shadow-xs space-y-6 rounded-lg border border-gray-200 bg-white p-3">
        {/* search content  */}
        <div>
          <div className="flex flex-col gap-2 md:flex-row">
            <DateRangeSelector
              onDateChange={handleDateChange}
              formatString="MM/dd/yyyy"
              className="w-full md:w-fit"
            />
            <div className="flex flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  defaultValue={searchQuery}
                  onChange={(e) => setSeachQuary(e.target.value)}
                  placeholder="Search"
                  className="w-full rounded-s-md border border-r-0 border-gray-300 px-3 py-1.5 pl-10 outline-none placeholder:text-sm"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  size={15}
                />
              </div>
              <button
                onClick={() => handleFilterChange("search", seachQuary)}
                className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
              >
                Search
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} />
                More Filters
              </button>
              <button className="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700">
                Download
              </button>
            </div>
          </div>
        </div>
        {/* Filter Controls */}
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Brand */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Sellers</h3>
              <div className="mt-2">
                <Dropdown
                  options={sellers}
                  selected={sellersFilter}
                  onSelect={(value) =>
                    handleFilterChange("sellerId", value.toString())
                  }
                />
              </div>
            </div>
            {/* Brand */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Brand</h3>
              <div className="mt-2">
                <Dropdown
                  options={brandOptions}
                  selected={brandFilter}
                  onSelect={(value) =>
                    handleFilterChange("brand", value.toString())
                  }
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Category</h3>
              <Dropdown
                options={categoryOptions}
                selected={categoryFilter}
                onSelect={(value) =>
                  handleFilterChange("category", value.toString())
                }
              />
            </div>

            {/* Sub Category */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Sub Category</h3>
              <Dropdown
                options={subCategoryOptions}
                selected={subCategoryFilter}
                onSelect={(value) =>
                  handleFilterChange("subcategory", value.toString())
                }
              />
            </div>
            {/* Stock Level */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Stock Level</h3>
              <Dropdown
                options={stockOptions}
                selected={stockFilter}
                onSelect={(value) =>
                  handleFilterChange("stock", value.toString())
                }
              />
            </div>
          </div>

          <Filters
            filtersData={productFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {/* Status Summary Cards */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleStatusClick(option.id)}
                className={`w-full rounded-lg border px-4 py-2 text-xs shadow-sm transition-colors sm:w-fit ${
                  isStatusActive(option.id)
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                <h3 className="text-xs font-medium">
                  {option.name} (
                  {statusCounts[option.id as keyof typeof statusCounts] || 0})
                </h3>
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center rounded border border-primary text-sm text-primary transition hover:bg-primary hover:text-white ${viewMode === "list" ? "bg-primary text-white" : ""}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded border border-primary text-sm text-primary transition hover:bg-primary hover:text-white ${viewMode === "grid" ? "bg-primary text-white" : ""}`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="rounded border border-primary px-3 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white"
              >
                Reset
              </button>
              <button className="rounded bg-light-primary px-3 py-1.5 text-sm text-white transition hover:brightness-95">
                Show Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {viewMode === "list" && (
          <DynamicTable
            data={filteredProducts}
            columns={columns}
            pagination={true}
            itemsPerPage={5}
            selectable={true}
            defaultSort={{ key: "title", direction: "asc" }}
            actions={[
              {
                label: "Edit",
                onClick: () => console.log("edited"),
                className:
                  "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50 ",
                icon: <PencilIcon className="h-4 w-4" />,
              },
              {
                label: "Delete",
                onClick: () => console.log("Deleted"),
                className:
                  "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 ",
                icon: <TrashIcon className="h-4 w-4" />,
              },
            ]}
          />
        )}
        {viewMode === "grid" && (
          <div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {paginatedProducts.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })}
            </div>
            {/* Pagination */}
            <Pagination
              totalItems={products.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
