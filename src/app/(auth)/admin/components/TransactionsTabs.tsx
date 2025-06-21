import { useState } from "react";
import Link from "next/link";
import { ChevronRight, PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Download } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { LanguageType } from "@/util/translations";
import { LocalizedTitle } from "@/types/language";

// Translation object
const translations = {
  overview: {
    seller: {
      en: "Seller",
      ar: "بائع",
    },
    invoice: {
      en: "Invoice",
      ar: "فاتورة",
    },
    date: {
      en: "Date",
      ar: "تاريخ",
    },
    product: {
      en: "Product",
      ar: "منتج",
    },
    customer: {
      en: "Customer",
      ar: "عميل",
    },
    unitPrice: {
      en: "Unit Price",
      ar: "سعر الوحدة",
    },
    quantity: {
      en: "Quantity",
      ar: "الكمية",
    },
    totalSales: {
      en: "Total Sales",
      ar: "إجمالي المبيعات",
    },
    paymentMethod: {
      en: "Payment Method",
      ar: "طريقة الدفع",
    },
    status: {
      en: "Status",
      ar: "حالة",
    },
    receipt: {
      en: "Receipt",
      ar: "إيصال",
    },
    transactionId: {
      en: "Transaction ID",
      ar: "معرف المعاملة",
    },
    products: {
      en: "Products",
      ar: "منتجات",
    },
    location: {
      en: "Location",
      ar: "موقع",
    },
    customersTransactions: {
      en: "Customers Transactions",
      ar: "معاملات العملاء",
    },
    sellersTransactions: {
      en: "Sellers Transactions",
      ar: "معاملات البائعين",
    },
    viewAll: {
      en: "View All",
      ar: "عرض الكل",
    },
  },
};

type CustomerTransaction = {
  id: string;
  date: string;
  product: {
    name: LocalizedTitle;
    image: string;
  };
  customer: {
    name: string;
    phone: string;
    location: LocalizedTitle;
  };
  seller: string;
  unitPrice: LocalizedTitle;
  quantity: LocalizedTitle;
  total: LocalizedTitle;
  payment: {
    method: "visa" | "paypal" | "cash";
    last4: string;
  };
  status: "Paid" | "Pending" | "Failed";
};

type SellerTransaction = {
  id: string;
  date: string;
  seller: string;
  email: string;
  phone: string;
  productCount: number;
  totalSales: LocalizedTitle;
  location: LocalizedTitle;
  status: "Paid" | "Pending" | "Failed";
};
const customerTransactions: CustomerTransaction[] = [
  {
    id: "142548",
    date: "15/5/2025",
    product: {
      name: {
        en: "Norton Utilities Ultimate 2023 for Windows",
        ar: "نورتون يوتيليتيز ألتيميت 2023 لويندوز",
      },
      image: "/images/products/norton.png",
    },
    customer: {
      name: "Ahmed Mohamed",
      phone: "012454526885",
      location: {
        en: "Nasr City, Cairo",
        ar: "مدينة نصر، القاهرة",
      },
    },
    seller: "Brandova",
    unitPrice: {
      en: "800 EGP",
      ar: "٨٠٠ جنيه",
    },
    quantity: {
      en: "4 units",
      ar: "٤ وحدات",
    },
    total: {
      en: "3200 EGP",
      ar: "٣٢٠٠ جنيه",
    },
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
      name: {
        en: "Adobe Photoshop 2023 License",
        ar: "ترخيص أدوبي فوتوشوب 2023",
      },
      image: "/images/products/photoshop.png",
    },
    customer: {
      name: "Fatma Said",
      phone: "01001234567",
      location: {
        en: "Maadi, Cairo",
        ar: "المعادي، القاهرة",
      },
    },
    seller: "SoftMart",
    unitPrice: {
      en: "1200 EGP",
      ar: "١٢٠٠ جنيه",
    },
    quantity: {
      en: "1 unit",
      ar: "١ وحدة",
    },
    total: {
      en: "1200 EGP",
      ar: "١٢٠٠ جنيه",
    },
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
    totalSales: {
      en: "160,000 EGP",
      ar: "١٦٠٬٠٠٠ جنيه",
    },
    location: {
      en: "Alexandria",
      ar: "الإسكندرية",
    },
    status: "Paid",
  },
  {
    id: "STX-1036",
    date: "14/5/2025",
    seller: "SoftMart",
    email: "softmart@example.com",
    phone: "01233445566",
    productCount: 38,
    totalSales: {
      en: "112,500 EGP",
      ar: "١١٢٬٥٠٠ جنيه",
    },
    location: {
      en: "Giza",
      ar: "الجيزة",
    },
    status: "Pending",
  },
];

const getCustomerColumns = (locale: LanguageType) => [
  {
    key: "id",
    header: translations.overview.invoice[locale],
    sortable: true,
  },
  {
    key: "date",
    header: translations.overview.date[locale],
    sortable: true,
  },
  {
    key: "product",
    header: translations.overview.product[locale],
    render: (item: CustomerTransaction) => (
      <div className="flex items-center gap-2">
        <Image
          className="h-10 w-10 rounded object-cover"
          src={item.product.image}
          alt={item.product.name[locale] ?? "image product"}
          width={40}
          height={40}
        />
        <span className="line-clamp-2 text-sm">
          {item.product.name[locale]}
        </span>
      </div>
    ),
  },
  {
    key: "customer",
    header: translations.overview.customer[locale],
    render: (item: CustomerTransaction) => (
      <div className="text-sm leading-5">
        <div className="font-medium">{item.customer.name}</div>
        <div className="text-xs text-gray-500">{item.customer.phone}</div>
        <div className="text-xs text-gray-500">
          {item.customer.location[locale]}
        </div>
      </div>
    ),
  },
  {
    key: "seller",
    header: translations.overview.seller[locale],
  },
  {
    key: "unitPrice",
    header: translations.overview.unitPrice[locale],
    render: (item: CustomerTransaction) => (
      <span>{item.unitPrice[locale]}</span>
    ),
  },
  {
    key: "quantity",
    header: translations.overview.quantity[locale],
    render: (item: CustomerTransaction) => <span>{item.quantity[locale]}</span>,
  },
  {
    key: "total",
    header: translations.overview.totalSales[locale],
    render: (item: CustomerTransaction) => <span>{item.total[locale]}</span>,
  },
  {
    key: "payment",
    header: translations.overview.paymentMethod[locale],
    render: (item: CustomerTransaction) => (
      <div className="flex items-center gap-1">
        <Image src="/icons/card-visa.svg" alt="visa" width={24} height={16} />
        <span className="text-xs text-gray-600">{item.payment.last4}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: translations.overview.status[locale],
    render: (item: CustomerTransaction) => (
      <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
        {item.status}
      </span>
    ),
  },
  {
    key: "receipt",
    header: translations.overview.receipt[locale],
    render: () => (
      <button className="rounded border p-1 hover:bg-gray-100">
        <Download className="h-4 w-4 text-gray-600" />
      </button>
    ),
  },
];

const getSellerColumns = (locale: LanguageType) => [
  {
    key: "id",
    header: translations.overview.transactionId[locale],
  },
  {
    key: "date",
    header: translations.overview.date[locale],
  },
  {
    key: "seller",
    header: translations.overview.seller[locale],
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
    header: translations.overview.products[locale],
  },
  {
    key: "totalSales",
    header: translations.overview.totalSales[locale],
    render: (item: SellerTransaction) => <span>{item.totalSales[locale]}</span>,
  },
  {
    key: "location",
    header: translations.overview.location[locale],
    render: (item: SellerTransaction) => <span>{item.location[locale]}</span>,
  },
  {
    key: "status",
    header: translations.overview.status[locale],
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

const TransactionsTabs = ({ locale = "en" }: { locale: LanguageType }) => {
  const [activeTab, setActiveTab] = useState<"customers" | "sellers">(
    "customers",
  );

  const tabs = [
    {
      key: "customers",
      label: translations.overview.customersTransactions[locale],
      count: 35,
    },
    {
      key: "sellers",
      label: translations.overview.sellersTransactions[locale],
      count: 20,
    },
  ];

  const renderTable = () => {
    if (activeTab === "customers") {
      return (
        <DynamicTable
          data={customerTransactions}
          columns={getCustomerColumns(locale)}
          minWidth={1000}
          pagination={true}
          itemsPerPage={5}
          selectable={true}
          actions={[
            {
              label: locale === "ar" ? "تعديل" : "Edit",
              onClick: () => console.log("edited"),
              className:
                "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
              icon: <PencilIcon className="h-4 w-4" />,
            },
            {
              label: locale === "ar" ? "حذف" : "Delete",
              onClick: () => console.log("Deleted"),
              className:
                "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
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
      );
    } else {
      return (
        <DynamicTable
          data={sellerTransactions}
          columns={getSellerColumns(locale)}
          minWidth={1000}
          pagination={true}
          itemsPerPage={5}
          selectable={true}
          actions={[
            {
              label: locale === "ar" ? "تعديل" : "Edit",
              onClick: () => console.log("edited"),
              className:
                "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
              icon: <PencilIcon className="h-4 w-4" />,
            },
            {
              label: locale === "ar" ? "حذف" : "Delete",
              onClick: () => console.log("Deleted"),
              className:
                "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
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
      );
    }
  };

  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* Tabs */}
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex flex-col gap-6 sm:flex-row">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "customers" | "sellers")}
              className={`relative flex items-center gap-1 pb-2 text-sm font-medium transition ${
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
          {translations.overview.viewAll[locale]} <ChevronRight size={14} />
        </Link>
      </div>

      {/* Table */}
      {renderTable()}
    </div>
  );
};

export default TransactionsTabs;
