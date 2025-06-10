"use client";
import Link from "next/link";
import { Filter, PencilIcon, Plus, Search, TrashIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DynamicTable from "@/components/UI/tables/DTable";
import Dropdown from "@/components/UI/DropDownMenu";
import { Filters } from "@/components/UI/filter/FilterDrawer";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "active" | "out_of_stock";
  category: string;
  onOffer?: boolean;
};

const products: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    stock: 45,
    status: "active",
    category: "Electronics",
    onOffer: true,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: 29.99,
    stock: 120,
    status: "active",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    stock: 0,
    status: "out_of_stock",
    category: "Clothing",
    onOffer: false,
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 89.99,
    stock: 15,
    status: "active",
    category: "Electronics",
    onOffer: true,
  },
  {
    id: "5",
    name: "Yoga Mat",
    price: 39.99,
    stock: 0,
    status: "out_of_stock",
    category: "Fitness",
  },
];

const columns = [
  {
    key: "id",
    header: "Product ID",
    sortable: true,
  },
  {
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    key: "price",
    header: "Price",
    render: (item: Product) => (
      <div className="flex items-center">
        ${item.price.toFixed(2)}
        {item.onOffer && (
          <span className="ml-2 rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
            Offer
          </span>
        )}
      </div>
    ),
    sortable: true,
    align: "left",
  },
  {
    key: "stock",
    header: "Stock",
    render: (item: Product) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          item.stock > 0
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.stock > 0 ? item.stock : "Out of stock"}
      </span>
    ),
    sortable: true,
    align: "center",
  },
  {
    key: "status",
    header: "Status",
    render: (item: Product) => {
      const statusColor =
        item.status === "active"
          ? "bg-green-100 text-green-800"
          : "bg-gray-100 text-gray-600";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {item.status.replace("_", " ")}
        </span>
      );
    },
    sortable: true,
    align: "center",
  },
  {
    key: "category",
    header: "Category",
    sortable: true,
  },
];

const statusOptions = [
  { id: "all", name: "All Statuses" },
  { id: "active", name: "Active" },
  { id: "out_of_stock", name: "Out of Stock" },
];

const stockOptions = [
  { id: "all", name: "All Stock" },
  { id: "in_stock", name: "In Stock" },
  { id: "out_of_stock", name: "Out of Stock" },
];

const offerOptions = [
  { id: "all", name: "All Products" },
  { id: "yes", name: "On Offer" },
  { id: "no", name: "Not on Offer" },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Get current filter values from URL
  const statusFilter = searchParams.get("status") || "all";
  const stockFilter = searchParams.get("stock") || "all";
  const offerFilter = searchParams.get("offer") || "all";
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // Filter products based on URL params
  const filteredProducts = products.filter((product) => {
    if (statusFilter !== "all" && product.status !== statusFilter) return false;
    if (stockFilter === "in_stock" && product.stock <= 0) return false;
    if (stockFilter === "out_of_stock" && product.stock > 0) return false;
    if (offerFilter === "yes" && !product.onOffer) return false;
    if (offerFilter === "no" && product.onOffer) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery))
      return false;

    return true;
  });

  // Update URL params when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(filterType, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <button className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          <Link href="/seller/products/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </button>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {/* Filter Controls */}
        <div className="flex flex-col items-end gap-4 pb-4 xl:flex-row">
          <div className="flex w-full gap-4 xl:w-fit xl:min-w-[350px]">
            <div className="relative w-full">
              <input
                type="text"
                defaultValue={searchQuery}
                onChange={(e) =>
                  handleFilterChange("search", e.target.value.trim())
                }
                placeholder="Search for product"
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 pl-10 outline-none placeholder:text-sm"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
            </div>
            <div className="block lg:hidden">
              <button
                onClick={() => setFiltersOpen(true)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-500"
              >
                <Filter size={16} />
              </button>

              <Filters
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
              />
            </div>
          </div>
          <div className="flex w-full flex-1 items-end gap-2">
            <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-3">
              {/* Status Filter */}
              <div className="w-full min-w-[120px]">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Status
                </label>
                <Dropdown
                  options={statusOptions}
                  selected={statusFilter}
                  onSelect={(value) =>
                    handleFilterChange("status", value.toString())
                  }
                />
              </div>

              {/* Stock Filter */}
              <div className="w-full min-w-[120px]">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Stock
                </label>
                <Dropdown
                  options={stockOptions}
                  selected={stockFilter}
                  onSelect={(value) =>
                    handleFilterChange("stock", value.toString())
                  }
                />
              </div>

              {/* Offer Filter */}
              <div className="w-full min-w-[120px]">
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  On Offer
                </label>
                <Dropdown
                  options={offerOptions}
                  selected={offerFilter}
                  onSelect={(value) =>
                    handleFilterChange("offer", value.toString())
                  }
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <button
                onClick={() => setFiltersOpen(true)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-500"
              >
                <Filter size={16} />
              </button>

              <Filters
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
              />
            </div>
          </div>
        </div>
        <div>
          <DynamicTable
            data={filteredProducts}
            columns={columns}
            pagination={true}
            itemsPerPage={5}
            selectable={true}
            defaultSort={{ key: "name", direction: "asc" }}
            actions={[
              {
                label: "Edit",
                onClick: () => console.log("Edited"),
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
            actionsColumnHeader="Actions"
            actionsColumnWidth="40px"
          />
        </div>
      </div>
    </div>
  );
}
