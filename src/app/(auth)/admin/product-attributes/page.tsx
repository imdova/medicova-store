"use client";
import Link from "next/link";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { useState } from "react";
import { ProductAttribute } from "@/types/product";
import { productFilters } from "@/constants/drawerFilter";
import { LanguageType } from "@/util/translations";
import DynamicFilter from "@/components/UI/filter/DynamicFilter";
import SearchInput from "@/components/Forms/formFields/SearchInput";
import { DynamicFilterItem } from "@/types/filters";
import { useLanguage } from "@/contexts/LanguageContext";

type Status = "published" | "draft";

// Translation dictionary
const translations = {
  en: {
    id: "ID",
    name: "Name",
    slug: "Slug",
    sortOrder: "Sort Order",
    createdAt: "Created At",
    status: "Status",
    operations: "Operations",
    productName: "Product Name",
    date: "Date",
    sku: "SKU",
    seller: "Seller",
    category: "Category",
    subCategory: "Sub Category",
    brand: "Brand",
    unitPrice: "Unit Price",
    totalPurchase: "Total Purchase",
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
    quickFilters: "Quick Filters",
    addFilter: "Add Filter",
    hideFilters: "Hide Filters",
    showFilters: "Show Filters",
    filters: "Filters",
    create: "Create",
  },
  ar: {
    id: "المعرف",
    name: "الاسم",
    slug: "الرابط",
    sortOrder: "ترتيب الفرز",
    createdAt: "تاريخ الإنشاء",
    status: "الحالة",
    operations: "العمليات",
    productName: "اسم المنتج",
    date: "التاريخ",
    sku: "SKU",
    seller: "البائع",
    category: "الفئة",
    subCategory: "الفئة الفرعية",
    brand: "العلامة التجارية",
    unitPrice: "سعر الوحدة",
    totalPurchase: "إجمالي المشتريات",
    searchPlaceholder: "بحث",
    search: "بحث",
    moreFilters: "المزيد من الفلاتر",
    download: "تحميل",
    allStatuses: "كل الحالات",
    active: "نشط",
    pending: "نشر",
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
    quickFilters: "الفلاتر السريعة",
    addFilter: "إضافة فلتر",
    hideFilters: "إخفاء الفلاتر",
    showFilters: "عرض الفلاتر",
    filters: "فلاتر",
    create: "انشاء",
  },
};

// Dummy data for product attributes
const ProductAttributes: ProductAttribute[] = [
  {
    id: 1,
    name: { en: "Color", ar: "اللون" },
    slug: "color",
    sortOrder: 1,
    createdAt: "2024-01-15T10:30:00Z",
    status: { en: "published", ar: "نشط" },
  },
  {
    id: 2,
    name: { en: "Size", ar: "المقاس" },
    slug: "size",
    sortOrder: 2,
    createdAt: "2024-01-16T14:20:00Z",
    status: { en: "published", ar: "نشط" },
  },
  {
    id: 3,
    name: { en: "Material", ar: "المادة" },
    slug: "material",
    sortOrder: 3,
    createdAt: "2024-01-17T09:15:00Z",
    status: { en: "published", ar: "نشر" },
  },
  {
    id: 4,
    name: { en: "Weight", ar: "الوزن" },
    slug: "weight",
    sortOrder: 4,
    createdAt: "2024-01-18T16:45:00Z",
    status: { en: "draft", ar: "مسودة" },
  },
  {
    id: 5,
    name: { en: "Brand", ar: "العلامة التجارية" },
    slug: "brand",
    sortOrder: 5,
    createdAt: "2024-01-19T11:20:00Z",
    status: { en: "published", ar: "نشط" },
  },
  {
    id: 6,
    name: { en: "Style", ar: "النمط" },
    slug: "style",
    sortOrder: 6,
    createdAt: "2024-01-20T13:10:00Z",
    status: { en: "published", ar: "نشط" },
  },
  {
    id: 7,
    name: { en: "Season", ar: "الموسم" },
    slug: "season",
    sortOrder: 7,
    createdAt: "2024-01-21T15:30:00Z",
    status: { en: "published", ar: "نشر" },
  },
  {
    id: 8,
    name: { en: "Gender", ar: "الجنس" },
    slug: "gender",
    sortOrder: 8,
    createdAt: "2024-01-22T12:00:00Z",
    status: { en: "draft", ar: "مسودة" },
  },
];

const getColumns = (locale: LanguageType) => [
  {
    key: "id",
    header: translations[locale].id,
    sortable: true,
    render: (item: ProductAttribute) => (
      <span className="font-mono text-sm">#{item.id}</span>
    ),
  },
  {
    key: "name",
    header: translations[locale].name,
    sortable: true,
    render: (item: ProductAttribute) => (
      <Link
        className="font-medium text-primary hover:underline"
        href={`/admin/products-attributes/edit/${item.id}`}
      >
        {item.name[locale]}
      </Link>
    ),
  },
  {
    key: "slug",
    header: translations[locale].slug,
    sortable: true,
    render: (item: ProductAttribute) => (
      <span className="text-sm text-gray-600">{item.slug}</span>
    ),
  },
  {
    key: "sortOrder",
    header: translations[locale].sortOrder,
    sortable: true,
    render: (item: ProductAttribute) => (
      <span className="text-sm text-gray-600">{item.sortOrder}</span>
    ),
  },
  {
    key: "createdAt",
    header: translations[locale].createdAt,
    sortable: true,
    render: (item: ProductAttribute) => {
      const date = new Date(item.createdAt);
      return (
        <span className="text-sm text-gray-600">
          {date.toLocaleDateString(locale === "en" ? "en-US" : "ar-EG")}
        </span>
      );
    },
  },
  {
    key: "status",
    header: translations[locale].status,
    render: (item: ProductAttribute) => {
      const statusColor =
        item.status?.en === "published"
          ? "bg-green-100 text-green-800"
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

export default function AttributesListPanel() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";
  const ITEMS_PER_PAGE = 6;
  const toggle = () => setIsOpen((prev) => !prev);

  const predefinedFilters: DynamicFilterItem[] = [
    {
      id: "status",
      label: { en: "Status", ar: "الحالة" },
      type: "dropdown",
      options: [
        { id: "active", name: { en: "published", ar: "نشر" } },
        { id: "draft", name: { en: "Draft", ar: "مسودة" } },
      ],
      visible: true,
    },
    {
      id: "dateRange",
      label: { en: "Date Range", ar: "نطاق التاريخ" },
      type: "date-range",
      visible: true,
    },
  ];

  // Count attributes by status for the summary cards
  const statusCounts = ProductAttributes.reduce(
    (acc: Record<Status, number>, attribute) => {
      if (
        attribute.status?.en === "published" ||
        attribute.status?.en === "draft"
      ) {
        const statusKey = attribute.status.en as Status;
        acc[statusKey] += 1;
      }
      return acc;
    },
    { published: 0, draft: 0 },
  );

  return (
    <div className="relative space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <DynamicFilter
        t={t}
        isOpen={isOpen}
        onToggle={() => setIsOpen(false)}
        locale={language}
        isRTL={isRTL}
        drawerFilters={productFilters}
        showViewToggle={false}
        statusCounts={statusCounts}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        filters={predefinedFilters}
        quickFiltersGridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
      />

      {/* Attributes Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={toggle}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm"
          >
            {t.filters}
          </button>
          <SearchInput locale={language} />
          <Link
            href={`/admin/products-attributes/create`}
            className="flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-auto"
          >
            <Plus size={15} /> {t.create}
          </Link>
        </div>
        <DynamicTable
          data={ProductAttributes}
          columns={getColumns(language)}
          pagination={true}
          itemsPerPage={ITEMS_PER_PAGE}
          selectable={true}
          defaultSort={{ key: "name", direction: "asc" }}
          solidActions={[
            {
              label: "Edit",
              onClick: () => console.log("edited"),
              icon: <PencilIcon className="h-3 w-3" />,
              color: "#2563eb",
            },
            {
              label: "Delete",
              onClick: () => console.log("Deleted"),
              color: "#dc2626",
              icon: <TrashIcon className="h-3 w-3" />,
            },
          ]}
          locale={language}
        />
      </div>
    </div>
  );
}
