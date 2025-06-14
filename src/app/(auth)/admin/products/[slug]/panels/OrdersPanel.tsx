"use client";
import { PencilIcon, Search, SlidersHorizontal, TrashIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DynamicTable from "@/components/UI/tables/DTable";
import { useState } from "react";
import DateRangeSelector from "@/components/UI/DateRangeSelector";
import { formatDate } from "@/util/dateUtils";
import Avatar from "@/components/UI/Avatar";
import { Filters } from "@/components/UI/filter/FilterDrawer";
import { productFilters } from "@/constants/drawerFilter";

type InvoiceRow = {
  id: string;
  customer: {
    name: string;
    image?: string;
  };
  date: string;
  seller: string;
  category: string;
  brand: string;
  unitPrice: number;
  quantity: number;
  total: number;
  status: "Paid" | "Pending" | "Canceled";
};
const invoiceData: InvoiceRow[] = [
  {
    id: "INV001",
    customer: {
      name: "Dianne Russell",
    },
    date: "15/5/2025",
    seller: "25487",
    category: "Medical Wear",
    brand: "Brandova",
    unitPrice: 800,
    quantity: 4,
    total: 3200,
    status: "Paid",
  },
  {
    id: "INV002",
    customer: {
      name: "Dianne Russell",
    },
    date: "15/5/2025",
    seller: "25487",
    category: "Medical Wear",
    brand: "Brandova",
    unitPrice: 800,
    quantity: 4,
    total: 3200,
    status: "Paid",
  },
  {
    id: "INV003",
    customer: {
      name: "Dianne Russell",
    },
    date: "15/5/2025",
    seller: "25487",
    category: "Medical Wear",
    brand: "Brandova",
    unitPrice: 800,
    quantity: 4,
    total: 3200,
    status: "Paid",
  },
  {
    id: "INV004",
    customer: {
      name: "Dianne Russell",
    },
    date: "15/5/2025",
    seller: "25487",
    category: "Medical Wear",
    brand: "Brandova",
    unitPrice: 800,
    quantity: 4,
    total: 3200,
    status: "Paid",
  },
];

const columns = [
  { key: "id", header: "Invoice", sortable: true },
  {
    key: "customer",
    header: "customer",
    render: (item: InvoiceRow) => (
      <div className="flex items-center gap-2">
        <Avatar
          className="h-9 w-9"
          imageUrl={item.customer.image}
          name={item.customer.name}
        />
        <span>{item.customer.name}</span>
      </div>
    ),
    sortable: true,
  },
  { key: "date", header: "Date", sortable: true },
  { key: "seller", header: "Seller", sortable: true },
  { key: "category", header: "Category", sortable: true },
  { key: "brand", header: "Brand", sortable: true },
  {
    key: "unitPrice",
    header: "Unit Price",
    render: (item: InvoiceRow) => `${item.unitPrice} EGP`,
  },
  {
    key: "quantity",
    header: "Quantity",
    render: (item: InvoiceRow) => `${item.quantity} units`,
  },
  {
    key: "total",
    header: "Total Purchase",
    render: (item: InvoiceRow) => `${item.total} EGP`,
  },
  {
    key: "status",
    header: "Status",
    render: (item: InvoiceRow) => {
      const statusColor =
        item.status === "Paid"
          ? "bg-green-100 text-green-800"
          : item.status === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </span>
      );
    },
  },
];

export default function OrdersPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [seachQuary, setSeachQuary] = useState("");

  // Get current filter values from URL

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

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
      </div>

      {/* Products Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <DynamicTable
          data={invoiceData}
          columns={columns}
          pagination={true}
          itemsPerPage={5}
          selectable={true}
          minWidth={1000}
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
        />
      </div>
      <Filters
        filtersData={productFilters}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
    </div>
  );
}
