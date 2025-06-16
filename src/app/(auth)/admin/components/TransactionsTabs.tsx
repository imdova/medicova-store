import { useState } from "react";
import Link from "next/link";
import { ChevronRight, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Download } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";

type CustomerTransaction = {
  id: string;
  date: string;
  product: {
    name: string;
    image: string;
  };
  customer: {
    name: string;
    phone: string;
    location: string;
  };
  seller: string;
  unitPrice: string;
  quantity: string;
  total: string;
  payment: {
    method: "visa" | "paypal" | "cash"; // extend as needed
    last4: string;
  };
  status: "Paid" | "Pending" | "Failed"; // extend as needed
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
  status: "Paid" | "Pending" | "Failed"; // extend as needed
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

export const sellerColumns = [
  {
    key: "id",
    header: "Transaction ID",
  },
  {
    key: "date",
    header: "Date",
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
  },
  {
    key: "totalSales",
    header: "Total Sales",
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

const TransactionsTabs = () => {
  const [activeTab, setActiveTab] = useState<"customers" | "sellers">(
    "customers",
  );

  const tabs = [
    { key: "customers", label: "Customers Transactions", count: 35 },
    { key: "sellers", label: "Sellers Transactions", count: 20 },
  ];

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
      );
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Tabs */}
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex flex-col gap-6 sm:flex-row">
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
  );
};

export default TransactionsTabs;
