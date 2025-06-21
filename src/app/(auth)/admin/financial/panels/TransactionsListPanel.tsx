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
import { LocalizedTitle } from "@/types/language";
import { LanguageType } from "@/util/translations";

type PaymentMethod = "visa" | "paypal" | "mastercard" | "cash";

type Customer = {
  name: string;
  phone: string;
  location: LocalizedTitle;
};

type Product = {
  name: LocalizedTitle;
  image: string;
};

type CustomerTransaction = {
  id: string;
  date: string;
  product: Product;
  customer: Customer;
  seller: string;
  unitPrice: LocalizedTitle;
  quantity: LocalizedTitle;
  total: LocalizedTitle;
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
  totalSales: LocalizedTitle;
  location: LocalizedTitle;
  status: "Paid" | "Pending" | "Failed" | "Refunded";
};
type TranslationValue = string | { [key: string]: TranslationValue };

// Translation data
const translations: Record<"en" | "ar", TranslationValue> = {
  en: {
    invoice: "Invoice",
    date: "Date",
    product: "Product",
    customer: "Customer",
    seller: "Seller",
    unitPrice: "Unit Price",
    quantity: "Quantity",
    totalSales: "Total Sales",
    paymentMethod: "Payment Method",
    status: "Status",
    receipt: "Receipt",
    transactionID: "Transaction ID",
    products: "Products",
    location: "Location",
    customersTransactions: "Customers Transactions",
    sellersTransactions: "Sellers Transactions",
    searchTransactions: "Search transactions",
    moreFilters: "More Filters",
    download: "Download",
    showData: "Show Data",
    reset: "Reset",
    viewAll: "View All",
    edit: "Edit",
    delete: "Delete",
    allSellers: "All Sellers",
    allCustomers: "All Customers",
    allProducts: "All Products",
    allMethods: "All Methods",
    allStatuses: "All Statuses",
    paid: "Paid",
    pending: "Pending",
    failed: "Failed",
    refunded: "Refunded",
    visa: "Visa",
    mastercard: "Mastercard",
    paypal: "PayPal",
    cash: "Cash",
    search: "Search",
    filter: {
      seller: "Seller",
      customer: "Customer",
      product: "Product",
      paymentMethod: "Payment Method",
      status: "Status",
    },
  },
  ar: {
    invoice: "فاتورة",
    date: "التاريخ",
    product: "المنتج",
    customer: "العميل",
    seller: "البائع",
    unitPrice: "سعر الوحدة",
    quantity: "الكمية",
    totalSales: "إجمالي المبيعات",
    paymentMethod: "طريقة الدفع",
    status: "الحالة",
    receipt: "إيصال",
    transactionID: "معرف المعاملة",
    products: "المنتجات",
    location: "الموقع",
    customersTransactions: "معاملات العملاء",
    sellersTransactions: "معاملات البائعين",
    searchTransactions: "بحث في المعاملات",
    moreFilters: "المزيد من الفلاتر",
    download: "تحميل",
    showData: "عرض البيانات",
    reset: "إعادة تعيين",
    viewAll: "عرض الكل",
    edit: "تعديل",
    delete: "حذف",
    allSellers: "كل البائعين",
    allCustomers: "كل العملاء",
    allProducts: "كل المنتجات",
    allMethods: "كل الطرق",
    allStatuses: "كل الحالات",
    paid: "مدفوع",
    pending: "قيد الانتظار",
    failed: "فشل",
    refunded: "تم الاسترداد",
    visa: "فيزا",
    mastercard: "ماستركارد",
    paypal: "باي بال",
    cash: "نقدي",
    search: "بحث",
    filter: {
      seller: "البائع",
      customer: "العميل",
      product: "المنتج",
      paymentMethod: "طريقة الدفع",
      status: "الحالة",
    },
  },
};

const getTranslation = (key: string, locale: "en" | "ar"): string => {
  const keys = key.split(".");
  let result: TranslationValue = translations[locale];

  for (const k of keys) {
    if (typeof result === "string") return key; // Not navigable
    result = result[k];
    if (result === undefined) return key;
  }

  return typeof result === "string" ? result : key;
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
    unitPrice: { en: "800 EGP", ar: "٨٠٠ جنيه" },
    quantity: { en: "4 units", ar: "٤ وحدات" },
    total: { en: "3200 EGP", ar: "٣٢٠٠ جنيه" },
    payment: { method: "visa", last4: "1452" },
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
    totalSales: { en: "160,000 EGP", ar: "١٦٠,٠٠٠ جنيه" },
    location: { en: "Alexandria", ar: "الإسكندرية" },
    status: "Paid",
  },
  {
    id: "STX-1036",
    date: "14/5/2025",
    seller: "SoftMart",
    email: "softmart@example.com",
    phone: "01233445566",
    productCount: 38,
    totalSales: { en: "112,500 EGP", ar: "١١٢,٥٠٠ جنيه" },
    location: { en: "Giza", ar: "الجيزة" },
    status: "Pending",
  },
];

export default function TransactionsListPanel({
  locale = "en",
}: {
  locale: LanguageType;
}) {
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
    {
      key: "customers",
      label: getTranslation("customersTransactions", locale),
      count: 35,
    },
    {
      key: "sellers",
      label: getTranslation("sellersTransactions", locale),
      count: 20,
    },
  ];

  const sellerOptions = [
    { id: "all", name: { en: "All Sellers", ar: "كل البائعين" } },
    { id: "brandova", name: { en: "Brandova", ar: "براندوفا" } },
    { id: "softmart", name: { en: "SoftMart", ar: "سوفت مارت" } },
  ];

  const customerOptions = [
    { id: "all", name: { en: "All Customers", ar: "كل العملاء" } },
    { id: "ahmed", name: { en: "Ahmed Mohamed", ar: "أحمد محمد" } },
    { id: "fatma", name: { en: "Fatma Said", ar: "فاطمة سعيد" } },
  ];

  const productOptions = [
    { id: "all", name: { en: "All Products", ar: "كل المنتجات" } },
    { id: "norton", name: { en: "Norton Utilities", ar: "نورتون يوتيليتيز" } },
    { id: "photoshop", name: { en: "Adobe Photoshop", ar: "أدوبي فوتوشوب" } },
  ];

  const paymentMethodOptions = [
    { id: "all", name: { en: "All Methods", ar: "كل الطرق" } },
    { id: "visa", name: { en: "Visa", ar: "فيزا" } },
    { id: "mastercard", name: { en: "Mastercard", ar: "ماستركارد" } },
    { id: "paypal", name: { en: "PayPal", ar: "باي بال" } },
    { id: "cash", name: { en: "Cash", ar: "نقداً" } },
  ];

  const statusOptions = [
    { id: "all", name: { en: "All Statuses", ar: "كل الحالات" } },
    { id: "paid", name: { en: "Paid", ar: "مدفوع" } },
    { id: "pending", name: { en: "Pending", ar: "قيد الانتظار" } },
    { id: "failed", name: { en: "Failed", ar: "فشل" } },
    { id: "refunded", name: { en: "Refunded", ar: "تم الاسترجاع" } },
  ];

  const customerColumns = [
    {
      key: "id",
      header: getTranslation("invoice", locale),
      sortable: true,
    },
    {
      key: "date",
      header: getTranslation("date", locale),
      sortable: true,
    },
    {
      key: "product",
      header: getTranslation("product", locale),
      render: (item: CustomerTransaction) => (
        <div className="flex items-center gap-2">
          <Image
            className="h-10 w-10 rounded object-cover"
            src={item.product.image}
            alt={item.product.name[locale]}
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
      header: getTranslation("customer", locale),
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
      header: getTranslation("seller", locale),
    },
    {
      key: "unitPrice",
      header: getTranslation("unitPrice", locale),
      render: (item: CustomerTransaction) => item.unitPrice[locale],
    },
    {
      key: "quantity",
      header: getTranslation("quantity", locale),
      render: (item: CustomerTransaction) => item.quantity[locale],
    },
    {
      key: "total",
      header: getTranslation("totalSales", locale),
      render: (item: CustomerTransaction) => item.total[locale],
    },
    {
      key: "payment",
      header: getTranslation("paymentMethod", locale),
      render: (item: CustomerTransaction) => (
        <div className="flex items-center gap-1">
          <Image
            src={`/icons/card-${item.payment.method}.svg`}
            alt={item.payment.method}
            width={24}
            height={16}
          />
          <span className="text-xs text-gray-600">{item.payment.last4}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: getTranslation("status", locale),
      render: (item: CustomerTransaction) => (
        <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          {getTranslation(item.status.toLowerCase(), locale)}
        </span>
      ),
    },
    {
      key: "receipt",
      header: getTranslation("receipt", locale),
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
      header: getTranslation("transactionID", locale),
      sortable: true,
    },
    {
      key: "date",
      header: getTranslation("date", locale),
      sortable: true,
    },
    {
      key: "seller",
      header: getTranslation("seller", locale),
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
      header: getTranslation("products", locale),
      sortable: true,
    },
    {
      key: "totalSales",
      header: getTranslation("totalSales", locale),
      sortable: true,
      render: (item: SellerTransaction) => item.totalSales[locale],
    },
    {
      key: "location",
      header: getTranslation("location", locale),
      render: (item: SellerTransaction) => item.location[locale],
    },
    {
      key: "status",
      header: getTranslation("status", locale),
      render: (item: SellerTransaction) => {
        const color =
          item.status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";
        return (
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
          >
            {getTranslation(item.status.toLowerCase(), locale)}
          </span>
        );
      },
    },
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
          locale={locale}
          selectable={true}
          actions={[
            {
              label: getTranslation("edit", locale),
              onClick: () => console.log("edited"),
              className:
                "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
              icon: <PencilIcon className="h-4 w-4" />,
            },
            {
              label: getTranslation("delete", locale),
              onClick: () => console.log("Deleted"),
              className:
                "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
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
          locale={locale}
          actions={[
            {
              label: getTranslation("edit", locale),
              onClick: () => console.log("edited"),
              className:
                "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
              icon: <PencilIcon className="h-4 w-4" />,
            },
            {
              label: getTranslation("delete", locale),
              onClick: () => console.log("Deleted"),
              className:
                "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
              icon: <TrashIcon className="h-4 w-4" />,
            },
          ]}
        />
      );
    }
  };

  return (
    <div
      className={`relative space-y-6 ${locale === "ar" ? "text-right" : "text-left"}`}
    >
      <div className="shadow-xs space-y-6 rounded-lg border border-gray-200 bg-white p-3">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getTranslation("searchTransactions", locale)}
                className={`w-full rounded-s-md border ${locale === "ar" ? "border-l-0" : "border-r-0"} border-gray-300 px-3 py-1.5 outline-none placeholder:text-sm ${
                  locale === "ar" ? "pl-3 pr-10" : "pl-10 pr-3"
                }`}
              />
              <Search
                className={`absolute top-1/2 -translate-y-1/2 text-gray-600 ${
                  locale === "ar" ? "right-4" : "left-4"
                }`}
                size={15}
              />
            </div>
            <button
              onClick={() => handleFilterChange("search", searchQuery)}
              className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
            >
              {getTranslation("search", locale)}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal size={16} />
              {getTranslation("moreFilters", locale)}
            </button>
            <button className="rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700">
              {getTranslation("download", locale)}
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Seller Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">
                {getTranslation("filter.seller", locale)}
              </h3>
              <div className="mt-2">
                <Dropdown
                  options={sellerOptions}
                  selected={sellerFilter}
                  onSelect={(value) =>
                    handleFilterChange("seller", value.toString())
                  }
                  locale={locale}
                />
              </div>
            </div>

            {/* Customer Filter */}
            {activeTab === "customers" && (
              <div>
                <h3 className="mb-2 text-sm font-medium">
                  {getTranslation("filter.customer", locale)}
                </h3>
                <div className="mt-2">
                  <Dropdown
                    options={customerOptions}
                    selected={customerFilter}
                    onSelect={(value) =>
                      handleFilterChange("customer", value.toString())
                    }
                    locale={locale}
                  />
                </div>
              </div>
            )}

            {/* Product Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">
                {getTranslation("filter.product", locale)}
              </h3>
              <Dropdown
                options={productOptions}
                selected={productFilter}
                onSelect={(value) =>
                  handleFilterChange("product", value.toString())
                }
                locale={locale}
              />
            </div>

            {/* Payment Method Filter */}
            {activeTab === "customers" && (
              <div>
                <h3 className="mb-2 text-sm font-medium">
                  {getTranslation("filter.paymentMethod", locale)}
                </h3>
                <Dropdown
                  options={paymentMethodOptions}
                  selected={paymentMethodFilter}
                  onSelect={(value) =>
                    handleFilterChange("paymentMethod", value.toString())
                  }
                  locale={locale}
                />
              </div>
            )}

            {/* Status Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium">
                {getTranslation("filter.status", locale)}
              </h3>
              <Dropdown
                options={statusOptions}
                selected={statusFilter}
                onSelect={(value) =>
                  handleFilterChange("status", value.toString())
                }
                locale={locale}
              />
            </div>
          </div>

          <Filters
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            filtersData={[]}
            locale={locale}
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
                {option.name[locale]}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetFilters}
              className="rounded border border-primary px-3 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-white"
            >
              {getTranslation("reset", locale)}
            </button>
            <button className="rounded bg-light-primary px-3 py-1.5 text-sm text-white transition hover:brightness-95">
              {getTranslation("showData", locale)}
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
            {getTranslation("viewAll", locale)}
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Table */}
        {renderTable()}
      </div>
    </div>
  );
}
