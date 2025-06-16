import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  PencilIcon,
  TrashIcon,
  Search,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import Image from "next/image";
import DynamicTable from "@/components/UI/tables/DTable";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Filters } from "@/components/UI/filter/FilterDrawer";
import DateRangeSelector from "@/components/UI/DateRangeSelector";
import { formatDate } from "@/util/dateUtils";
import Dropdown from "@/components/UI/DropDownMenu";
type PaymentMethod = "visa" | "paypal" | "mastercard" | "cash";

type Customer = {
  name: string;
  phone: string;
  location: string;
};

type Product = {
  name: string;
  image: string;
};

type CustomerTransaction = {
  id: string;
  date: string;
  product: Product;
  customer: Customer;
  seller: string;
  unitPrice: string;
  quantity: string;
  total: string;
  payment: {
    method: PaymentMethod;
    last4: string;
  };
  status: "Paid" | "Pending" | "Failed" | "Refunded";
};

type SellerTransaction = {
  id: string;
  date: string;
  seller: string;
  email: string;
  phone: string;
  productCount: number;
  totalSales: string;
  location: string;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
};

const customerTransactions: CustomerTransaction[] = [
  {
    id: "142548",
    date: "15/5/2025",
    product: {
      name: "Norton Utilities Ultimate 2023 for Windows",
      image: "/images/products/norton.png",
    },
    customer: {
      name: "Ahmed Mohamed",
      phone: "012454526885",
      location: "Nasr City, Cairo",
    },
    seller: "Brandova",
    unitPrice: "800 EGP",
    quantity: "4 units",
    total: "3200 EGP",
    payment: {
      method: "visa",
      last4: "1452",
    },
    status: "Paid",
  },
  {
    id: "142549",
    date: "14/5/2025",
    product: {
      name: "Adobe Photoshop 2023 License",
      image: "/images/products/photoshop.png",
    },
    customer: {
      name: "Fatma Said",
      phone: "01001234567",
      location: "Maadi, Cairo",
    },
    seller: "SoftMart",
    unitPrice: "1200 EGP",
    quantity: "1 unit",
    total: "1200 EGP",
    payment: {
      method: "visa",
      last4: "9901",
    },
    status: "Paid",
  },
];

const sellerTransactions: SellerTransaction[] = [
  {
    id: "STX-1035",
    date: "15/5/2025",
    seller: "Brandova",
    email: "brandova@example.com",
    phone: "01099887766",
    productCount: 52,
    totalSales: "160,000 EGP",
    location: "Alexandria",
    status: "Paid",
  },
  {
    id: "STX-1036",
    date: "14/5/2025",
    seller: "SoftMart",
    email: "softmart@example.com",
    phone: "01233445566",
    productCount: 38,
    totalSales: "112,500 EGP",
    location: "Giza",
    status: "Pending",
  },
];

// Filter options
const sellerOptions = [
  { id: "all", name: "All Sellers" },
  { id: "brandova", name: "Brandova" },
  { id: "softmart", name: "SoftMart" },
];

const customerOptions = [
  { id: "all", name: "All Customers" },
  { id: "ahmed", name: "Ahmed Mohamed" },
  { id: "fatma", name: "Fatma Said" },
];

const productOptions = [
  { id: "all", name: "All Products" },
  { id: "norton", name: "Norton Utilities" },
  { id: "photoshop", name: "Adobe Photoshop" },
];

const paymentMethodOptions = [
  { id: "all", name: "All Methods" },
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "Mastercard" },
  { id: "paypal", name: "PayPal" },
  { id: "cash", name: "Cash" },
];

const statusOptions = [
  { id: "all", name: "All Statuses" },
  { id: "paid", name: "Paid" },
  { id: "pending", name: "Pending" },
  { id: "failed", name: "Failed" },
  { id: "refunded", name: "Refunded" },
];

// Table columns remain the same as before
const customerColumns = [
  {
    key: "id",
    header: "Invoice",
    sortable: true,
  },
  {
    key: "date",
    header: "Date",
    sortable: true,
  },
  {
    key: "product",
    header: "Product",
    render: (item: CustomerTransaction) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-10 w-10 rounded object-cover"
          src={item.product.image}
          alt={item.product.name}
          width={40}
          height={40}
        />
        <span className="line-clamp-2 text-sm">{item.product.name}</span>
      </div>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    render: (item: CustomerTransaction) => (
      <div className="text-sm leading-5">
        <div className="font-medium">{item.customer.name}</div>
        <div className="text-xs text-gray-500">{item.customer.phone}</div>
        <div className="text-xs text-gray-500">{item.customer.location}</div>
      </div>
    ),
  },
  {
    key: "seller",
    header: "Seller",
  },
  {
    key: "unitPrice",
    header: "Unit Price",
  },
  {
    key: "quantity",
    header: "Quantity",
  },
  {
    key: "total",
    header: "Total Sales",
  },
  {
    key: "payment",
    header: "Payment Method",
    render: (item: CustomerTransaction) => (
      <div className="flex items-center gap-1">
        <Image src="/icons/card-visa.svg" alt="visa" width={24} height={16} />
        <span className="text-xs text-gray-600">{item.payment.last4}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item: CustomerTransaction) => (
      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
        {item.status}
      </span>
    ),
  },
  {
    key: "receipt",
    header: "Receipt",
    render: () => (
      <button className="rounded border p-1 hover:bg-gray-100">
        <Download className="h-4 w-4 text-gray-600" />
      </button>
    ),
  },
];

const sellerColumns = [
  {
    key: "id",
    header: "Transaction ID",
    sortable: true,
  },
  {
    key: "date",
    header: "Date",
    sortable: true,
  },
  {
    key: "seller",
    header: "Seller",
    render: (item: SellerTransaction) => (
      <div>
        <div className="font-medium">{item.seller}</div>
        <div className="text-xs text-gray-500">{item.email}</div>
        <div className="text-xs text-gray-500">{item.phone}</div>
      </div>
    ),
  },
  {
    key: "productCount",
    header: "Products",
    sortable: true,
  },
  {
    key: "totalSales",
    header: "Total Sales",
    sortable: true,
  },
  {
    key: "location",
    header: "Location",
  },
  {
    key: "status",
    header: "Status",
    render: (item: SellerTransaction) => {
      const color =
        item.status === "Paid"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700";
      return (
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
        >
          {item.status}
        </span>
      );
    },
  },
];

export default function TransactionsListPanel() {
  const [activeTab, setActiveTab] = useState<"customers" | "sellers">(
    "customers",
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get current filter values from URL
  const sellerFilter = searchParams.get("seller") || "all";
  const customerFilter = searchParams.get("customer") || "all";
  const productFilter = searchParams.get("product") || "all";
  const paymentMethodFilter = searchParams.get("paymentMethod") || "all";
  const statusFilter = searchParams.get("status") || "all";

  const tabs = [
    { key: "customers", label: "Customers Transactions", count: 35 },
    { key: "sellers", label: "Sellers Transactions", count: 20 },
  ];

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

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(filterType, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => router.replace(pathname);

  const renderTable = () => {
    if (activeTab === "customers") {
      return (
        <DynamicTable
          data={customerTransactions}
          columns={customerColumns}
          minWidth={1000}
          pagination={true}
          itemsPerPage={5}
          selectable={true}
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
      );
    } else {
      return (
        <DynamicTable
          data={sellerTransactions}
          columns={sellerColumns}
          minWidth={1000}
          pagination={true}
          itemsPerPage={5}
          selectable={true}
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
      );
    }
  };

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
                placeholder="Search transactions"
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

        {/* Filter Controls */}
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Seller Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Seller</h3>
              <div className="mt-2">
                <Dropdown
                  options={sellerOptions}
                  selected={sellerFilter}
                  onSelect={(value) =>
                    handleFilterChange("seller", value.toString())
                  }
                />
              </div>
            </div>

            {/* Customer Filter */}
            {activeTab === "customers" && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Customer</h3>
                <div className="mt-2">
                  <Dropdown
                    options={customerOptions}
                    selected={customerFilter}
                    onSelect={(value) =>
                      handleFilterChange("customer", value.toString())
                    }
                  />
                </div>
              </div>
            )}

            {/* Product Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Product</h3>
              <Dropdown
                options={productOptions}
                selected={productFilter}
                onSelect={(value) =>
                  handleFilterChange("product", value.toString())
                }
              />
            </div>

            {/* Payment Method Filter */}
            {activeTab === "customers" && (
              <div>
                <h3 className="mb-2 text-sm font-medium">Payment Method</h3>
                <Dropdown
                  options={paymentMethodOptions}
                  selected={paymentMethodFilter}
                  onSelect={(value) =>
                    handleFilterChange("paymentMethod", value.toString())
                  }
                />
              </div>
            )}

            {/* Status Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">Status</h3>
              <Dropdown
                options={statusOptions}
                selected={statusFilter}
                onSelect={(value) =>
                  handleFilterChange("status", value.toString())
                }
              />
            </div>
          </div>

          <Filters
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            filtersData={[]}
          />
        </div>

        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFilterChange("status", option.id)}
                className={`rounded-lg border px-4 py-2 text-xs shadow-sm transition-colors ${
                  statusFilter === option.id
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                {option.name}
              </button>
            ))}
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

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        {/* Tabs */}
        <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex flex-col gap-3 sm:flex-row">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "customers" | "sellers")}
                className={`relative pb-2 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "text-green-600"
                    : "text-gray-500 hover:text-green-600"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    activeTab === tab.key
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
          >
            View All <ChevronRight size={14} />
          </Link>
        </div>

        {/* Table */}
        {renderTable()}
      </div>
    </div>
  );
}
