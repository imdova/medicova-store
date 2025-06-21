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
import Image from "next/image";
import { LanguageType } from "@/util/translations";

type Status = "active" | "pending" | "draft";

// Translation dictionary
const translations = {
  en: {
    productName: "Product Name",
    date: "Date",
    sku: "SKU",
    seller: "Seller",
    category: "Category",
    subCategory: "Sub Category",
    brand: "Brand",
    unitPrice: "Unit Price",
    totalPurchase: "Total Purchase",
    status: "Status",
    searchPlaceholder: "Search",
    search: "Search",
    moreFilters: "More Filters",
    download: "Download",
    allStatuses: "All Statuses",
    active: "Active",
    pending: "Pending",
    draft: "Draft",
    allStock: "All Stock",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    selectCategory: "Select Category",
    medicalWear: "Medical Wear",
    selectSubCategory: "Select Sub Category",
    scrubs: "Scrubs",
    allBrand: "All brand",
    landeu: "Landeu",
    allSellers: "All Sellers",
    reset: "Reset",
    showData: "Show Data",
    unknown: "Unknown",
    delete: "Delete",
    edit: "Edit",
  },
  ar: {
    productName: "اسم المنتج",
    date: "التاريخ",
    sku: "SKU",
    seller: "البائع",
    category: "الفئة",
    subCategory: "الفئة الفرعية",
    brand: "العلامة التجارية",
    unitPrice: "سعر الوحدة",
    totalPurchase: "إجمالي المشتريات",
    status: "الحالة",
    searchPlaceholder: "بحث",
    search: "بحث",
    moreFilters: "المزيد من الفلاتر",
    download: "تحميل",
    allStatuses: "كل الحالات",
    active: "نشط",
    pending: "قيد الانتظار",
    draft: "مسودة",
    allStock: "كل المخزون",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    selectCategory: "اختر الفئة",
    medicalWear: "ملابس طبية",
    selectSubCategory: "اختر الفئة الفرعية",
    scrubs: "سكراب",
    allBrand: "كل العلامات",
    landeu: "لاندو",
    allSellers: "كل البائعين",
    reset: "إعادة تعيين",
    showData: "عرض البيانات",
    unknown: "غير معروف",
    delete: "حذف",
    edit: "تعديل",
  },
};

const getColumns = (locale: LanguageType) => [
  {
    key: "title",
    header: translations[locale].productName,
    sortable: true,
    render: (item: Product) => (
      <div className="flex gap-2">
        <Image
          className="w-10 rounded-md object-cover"
          src={item.images?.[0] || "/images/placeholder.jpg"}
          width={300}
          height={300}
          alt={item.title[locale]}
        />
        <Link
          className="line-clamp-2 hover:underline"
          href={`products/${item.id}`}
        >
          {item.title[locale]}
        </Link>
      </div>
    ),
  },
  {
    key: "date",
    header: translations[locale].date,
    sortable: true,
    render: () => "15/5/2023",
  },
  {
    key: "id",
    header: translations[locale].sku,
    sortable: true,
  },
  {
    key: "seller",
    header: translations[locale].seller,
    sortable: true,
    render: () => "Brandona",
  },
  {
    key: "category",
    header: translations[locale].category,
    sortable: true,
    render: (item: Product) => (
      <span>
        {item.category?.title[locale] || translations[locale].medicalWear}
      </span>
    ),
  },
  {
    key: "subcategory",
    header: translations[locale].subCategory,
    sortable: true,
    render: () => translations[locale].scrubs,
  },
  {
    key: "brand",
    header: translations[locale].brand,
    sortable: true,
    render: () => translations[locale].landeu,
  },
  {
    key: "price",
    header: translations[locale].unitPrice,
    render: (item: Product) => `${item.price} EGP`,
    sortable: true,
  },
  {
    key: "totalPurchase",
    header: translations[locale].totalPurchase,
    render: () => "160000 EGP",
    sortable: true,
  },
  {
    key: "status",
    header: translations[locale].status,
    render: (item: Product) => {
      const statusColor =
        item.status?.en === "active"
          ? "bg-green-100 text-green-800"
          : item.status?.en === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-600";

      const statusText = item.status?.[locale] || translations[locale].unknown;
      const displayStatus =
        statusText.charAt(0).toUpperCase() + statusText.slice(1);

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {displayStatus}
        </span>
      );
    },
    sortable: true,
  },
];

const getStatusOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Statuses", ar: "كل الحالات" } },
  { id: "active", name: { en: "Active", ar: "نشط" } },
  { id: "pending", name: { en: "Pending", ar: "قيد الانتظار" } },
  { id: "draft", name: { en: "Draft", ar: "مسودة" } },
];

const getStockOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Stock", ar: "كل المخزون" } },
  { id: "in_stock", name: { en: "In Stock", ar: "متوفر" } },
  { id: "out_of_stock", name: { en: "Out of Stock", ar: "غير متوفر" } },
];

const getCategoryOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Categories", ar: "كل الفئات" } },
  { id: "medical", name: { en: "Medical Wear", ar: "ملابس طبية" } },
];

const getSubCategoryOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Subcategories", ar: "كل الفئات الفرعية" } },
  { id: "scrubs", name: { en: "Scrubs", ar: "الملابس الطبية" } },
];

const getBrandOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Brands", ar: "كل العلامات التجارية" } },
  { id: "landeu", name: { en: "Landeu", ar: "لاندو" } },
];

const getSellersOptions = (): {
  id: string;
  name: { en: string; ar: string };
}[] => [
  { id: "all", name: { en: "All Sellers", ar: "كل البائعين" } },
  { id: "mohamed", name: { en: "Mohamed", ar: "محمد" } },
];

export default function ProductListPanel({
  locale = "en",
}: {
  locale: LanguageType;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const t = translations[locale];
  const isRTL = locale === "ar";

  // Get current filter values from URL
  const statusFilter = searchParams.get("status") || "all";
  const stockFilter = searchParams.get("stock") || "all";
  const categoryFilter = searchParams.get("category") || "all";
  const subCategoryFilter = searchParams.get("subcategory") || "all";
  const brandFilter = searchParams.get("brand") || "all";
  const sellersFilter = searchParams.get("sellerId") || "all";
  const currentSearchQuery = searchParams.get("search")?.toLowerCase() || "";
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
  };

  // Count products by status for the summary cards
  const statusCounts = products.reduce(
    (acc: Record<Status, number>, product) => {
      if (
        product.status?.[locale] === "active" ||
        product.status?.[locale] === "pending" ||
        product.status?.[locale] === "draft"
      ) {
        acc[product.status[locale]] += 1;
      }
      return acc;
    },
    { active: 0, pending: 0, draft: 0 },
  );

  // Filter products based on URL params
  const filteredProducts = products.filter((product) => {
    if (statusFilter !== "all" && product.status?.[locale] !== statusFilter)
      return false;
    if (stockFilter === "in_stock" && (product.stock ?? 0) <= 0) return false;
    if (stockFilter === "out_of_stock" && (product.stock ?? 0) > 0)
      return false;
    if (categoryFilter !== "all" && product.category?.id !== categoryFilter)
      return false;
    if (
      currentSearchQuery &&
      !product.title[locale].toLowerCase().includes(currentSearchQuery)
    )
      return false;
    if (stockFilter === "in_stock" && (product.stock ?? 0) <= 0) return false;
    if (stockFilter === "out_of_stock" && (product.stock ?? 0) > 0)
      return false;

    return true;
  });

  // handle pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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
    <div className="relative space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="shadow-xs space-y-6 rounded-lg border border-gray-200 bg-white p-3">
        {/* search content  */}
        <div>
          <div className="flex flex-col gap-2 md:flex-row">
            <DateRangeSelector
              onDateChange={handleDateChange}
              formatString="MM/dd/yyyy"
              className="w-full md:w-fit"
              locale={locale}
            />
            <div className="flex flex-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  defaultValue={currentSearchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full rounded-s-md border ${isRTL ? "border-l-0" : "border-r-0"} border-gray-300 px-3 py-1.5 outline-none placeholder:text-sm ${
                    isRTL ? "pr-10" : "pl-10"
                  }`}
                />
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-600 ${
                    isRTL ? "right-4" : "left-4"
                  }`}
                  size={15}
                />
              </div>
              <button
                onClick={() => handleFilterChange("search", searchQuery)}
                className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
              >
                {t.search}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} />
                {t.moreFilters}
              </button>
              <button className="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700">
                {t.download}
              </button>
            </div>
          </div>
        </div>
        {/* Filter Controls */}
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Brand */}
            <div>
              <h3 className="mb-2 text-sm font-medium">{t.seller}</h3>
              <div className="mt-2">
                <Dropdown
                  options={getSellersOptions()}
                  selected={sellersFilter}
                  onSelect={(value) =>
                    handleFilterChange("sellerId", value.toString())
                  }
                  locale={locale}
                />
              </div>
            </div>
            {/* Brand */}
            <div>
              <h3 className="mb-2 text-sm font-medium">{t.brand}</h3>
              <div className="mt-2">
                <Dropdown
                  options={getBrandOptions()}
                  selected={brandFilter}
                  onSelect={(value) =>
                    handleFilterChange("brand", value.toString())
                  }
                  locale={locale}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="mb-2 text-sm font-medium">{t.category}</h3>
              <Dropdown
                options={getCategoryOptions()}
                selected={categoryFilter}
                onSelect={(value) =>
                  handleFilterChange("category", value.toString())
                }
                locale={locale}
              />
            </div>

            {/* Sub Category */}
            <div>
              <h3 className="mb-2 text-sm font-medium">{t.subCategory}</h3>
              <Dropdown
                options={getSubCategoryOptions()}
                selected={subCategoryFilter}
                onSelect={(value) =>
                  handleFilterChange("subcategory", value.toString())
                }
                locale={locale}
              />
            </div>
            {/* Stock Level */}
            <div>
              <h3 className="mb-2 text-sm font-medium">{t.inStock}</h3>
              <Dropdown
                options={getStockOptions()}
                selected={stockFilter}
                onSelect={(value) =>
                  handleFilterChange("stock", value.toString())
                }
                locale={locale}
              />
            </div>
          </div>

          <Filters
            filtersData={productFilters}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            locale={locale}
          />
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {/* Status Summary Cards */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {getStatusOptions().map((option) => (
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
                  {option.name[locale]} (
                  {statusCounts[option.id as keyof typeof statusCounts] || 0})
                </h3>
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center rounded border border-primary text-sm text-primary transition hover:bg-primary hover:text-white ${
                  viewMode === "list" ? "bg-primary text-white" : ""
                }`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded border border-primary text-sm text-primary transition hover:bg-primary hover:text-white ${
                  viewMode === "grid" ? "bg-primary text-white" : ""
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
            {/* Filters */}
            <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <button
                onClick={resetFilters}
                className="rounded border border-primary px-3 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white"
              >
                {t.reset}
              </button>
              <button className="rounded bg-light-primary px-3 py-1.5 text-sm text-white transition hover:brightness-95">
                {t.showData}
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
            columns={getColumns(locale)}
            pagination={true}
            itemsPerPage={5}
            selectable={true}
            defaultSort={{ key: "title", direction: "asc" }}
            actions={[
              {
                label: t.edit,
                onClick: () => console.log("edited"),
                className:
                  "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50 ",
                icon: <PencilIcon className="h-4 w-4" />,
              },
              {
                label: t.delete,
                onClick: () => console.log("Deleted"),
                className:
                  "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 ",
                icon: <TrashIcon className="h-4 w-4" />,
              },
            ]}
            solidActions={[
              {
                onClick: () => console.log("edited"),
                icon: <PencilIcon className="h-4 w-4" />,
                color: "#2563eb",
              },
              {
                onClick: () => console.log("Deleted"),
                color: "#dc2626",
                icon: <TrashIcon className="h-4 w-4" />,
              },
            ]}
            locale={locale}
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
              totalItems={filteredProducts.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              locale={locale}
            />
          </div>
        )}
      </div>
    </div>
  );
}
