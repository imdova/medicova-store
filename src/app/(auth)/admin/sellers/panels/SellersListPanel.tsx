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
import { Filters } from "@/components/UI/filter/FilterDrawer";
import { useMemo, useState } from "react";
import { Seller } from "@/types/product";
import DateRangeSelector from "@/components/UI/DateRangeSelector";
import { Pagination } from "@/components/UI/Pagination";
import { formatDate } from "@/util/dateUtils";
import Image from "next/image";
import { Sellers } from "@/constants/sellers";
import StatusToggle from "@/components/UI/Buttons/StatusToggle";
import { productFilters } from "@/constants/drawerFilter";
import SellerCard from "@/components/UI/cards/SellerCard";
type Status = "active" | "pending" | "draft" | "best_seller";

export const sellerColumns = [
  {
    key: "name",
    header: "Seller Name",
    sortable: true,
    render: (item: Seller) => (
      <div className="flex items-center gap-3">
        <Image
          className="h-10 w-10 rounded-full object-cover"
          src={item.image || "/images/placeholder.jpg"}
          width={40}
          height={40}
          alt={item.name}
        />
        <Link
          href={`/sellers/${item.id}`}
          className="font-medium hover:underline"
        >
          {item.name}
        </Link>
      </div>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    sortable: false,
    render: () => "01X-XXXX-XXXX",
  },
  {
    key: "address",
    header: "Address",
    sortable: true,
    render: (item: Seller) => `${item.city}, ${item.country}`,
  },
  {
    key: "joinDate",
    header: "Join Date",
    sortable: true,
    render: () => "25/12/2023",
  },
  {
    key: "type",
    header: "Type",
    sortable: true,
    render: () => "Online Store",
  },
  {
    key: "products",
    header: "Products",
    sortable: true,
    render: (item: Seller) => item.products,
  },
  {
    key: "customers",
    header: "Customers",
    sortable: true,
    render: (item: Seller) => item.customers?.toLocaleString(),
  },
  {
    key: "sales",
    header: "Total Sales",
    sortable: true,
    render: (item: Seller) => `${item.sales?.toLocaleString()} EGP`,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (item: Seller) => {
      const currentStatus = item.isActive;
      const handleStatusChange = (newStatus: boolean) => {
        console.log(`Status changed to: ${newStatus ? "Active" : "Inactive"}`);
      };
      return (
        <StatusToggle
          initialStatus={currentStatus}
          onToggle={handleStatusChange}
        />
      );
    },
  },
];

const statusOptions = [
  { id: "all", name: "All Sellers" },
  { id: "best_seller", name: "Best Sellers" },
  { id: "active", name: "Active" },
  { id: "pending", name: "Pending" },
  { id: "inactive", name: "Inactive" },
];

export default function SellersListPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const statusFilter = searchParams.get("status") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 6;

  const statusCounts = Sellers.reduce<Record<Status, number>>(
    (acc, seller) => {
      if (
        seller.status === "active" ||
        seller.status === "pending" ||
        seller.status === "draft" ||
        seller.status === "best_seller"
      ) {
        acc[seller.status] += 1;
      }
      return acc;
    },
    {
      active: 0,
      pending: 0,
      draft: 0,
      best_seller: 0,
    },
  );

  const handleDateChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (range.startDate)
      params.set("start_date", formatDate(range.startDate, "yyyy-MM-dd"));
    else params.delete("start_date");
    if (range.endDate)
      params.set("end_date", formatDate(range.endDate, "yyyy-MM-dd"));
    else params.delete("end_date");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredSellers = useMemo(() => {
    return Sellers.filter((seller) => {
      if (statusFilter !== "all" && seller.status !== statusFilter)
        return false;
      if (
        searchQuery &&
        !seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [Sellers, statusFilter, searchQuery]);

  const paginatedSellers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSellers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSellers, currentPage]);

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(filterType, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleStatusClick = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("status") === status) params.delete("status");
    else params.set("status", status);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => router.replace(pathname);

  const isStatusActive = (status: string) => statusFilter === status;

  return (
    <div className="relative space-y-6">
      <div className="shadow-xs space-y-6 rounded-lg border border-gray-200 bg-white p-3">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sellers"
                className="w-full rounded-s-md border border-r-0 border-gray-300 px-3 py-1.5 pl-10 outline-none placeholder:text-sm"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
            </div>
            <button
              onClick={() => handleFilterChange("search", searchQuery)}
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

        <Filters
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filtersData={productFilters}
        />

        <div className="flex flex-col justify-between gap-4 md:flex-row">
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

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {viewMode === "list" && (
          <DynamicTable
            data={filteredSellers}
            columns={sellerColumns}
            pagination={true}
            itemsPerPage={5}
            minWidth={1000}
            selectable={true}
            defaultSort={{ key: "name", direction: "asc" }}
            actions={[
              {
                label: "Edit",
                onClick: () => console.log("edited"),
                className:
                  "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                icon: <PencilIcon className="h-4 w-4" />,
              },
              {
                label: "Delete",
                onClick: () => console.log("Deleted"),
                className:
                  "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
                icon: <TrashIcon className="h-4 w-4" />,
              },
            ]}
          />
        )}
        {viewMode === "grid" && (
          <div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedSellers.map((seller) => {
                return <SellerCard key={seller.id} seller={seller} />;
              })}
            </div>
            <Pagination
              totalItems={filteredSellers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
