"use client";
import Link from "next/link";
import { PencilIcon, Plus, TrashIcon } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { useState } from "react";
import { productFilters } from "@/constants/drawerFilter";
import { LanguageType } from "@/util/translations";
import DynamicFilter from "@/components/UI/filter/DynamicFilter";
import SearchInput from "@/components/Forms/formFields/SearchInput";
import { DynamicFilterItem } from "@/types/filters";
import { useLanguage } from "@/contexts/LanguageContext";

// Define ProductOption type
type ProductOption = {
  id: number;
  name: { en: string; ar: string };
  isRequired: boolean;
  createdAt: string;
};

// Translation dictionary
const translations = {
  en: {
    id: "ID",
    name: "Name",
    isRequired: "Is Required?",
    createdAt: "Created At",
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
    yes: "Yes",
    no: "No",
    required: "Required",
    optional: "Optional",
  },
  ar: {
    id: "المعرف",
    name: "الاسم",
    isRequired: "مطلوب؟",
    createdAt: "تاريخ الإنشاء",
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
    yes: "نعم",
    no: "لا",
    required: "مطلوب",
    optional: "اختياري",
  },
};

// Dummy data for product options
const ProductOptions: ProductOption[] = [
  {
    id: 1,
    name: { en: "Processor (CPU)", ar: "المعالج (CPU)" },
    isRequired: true,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: { en: "Graphics Card (GPU)", ar: "كرت الشاشة (GPU)" },
    isRequired: true,
    createdAt: "2024-01-16T14:20:00Z",
  },
  {
    id: 3,
    name: { en: "Memory (RAM)", ar: "الذاكرة (RAM)" },
    isRequired: true,
    createdAt: "2024-01-17T09:15:00Z",
  },
  {
    id: 4,
    name: { en: "Storage (HDD/SSD)", ar: "التخزين (HDD/SSD)" },
    isRequired: true,
    createdAt: "2024-01-18T16:45:00Z",
  },
  {
    id: 5,
    name: { en: "Motherboard", ar: "اللوحة الأم" },
    isRequired: false,
    createdAt: "2024-01-19T11:00:00Z",
  },
  {
    id: 6,
    name: { en: "Power Supply (PSU)", ar: "مزود الطاقة (PSU)" },
    isRequired: false,
    createdAt: "2024-01-20T13:30:00Z",
  },
  {
    id: 7,
    name: { en: "Cooling System", ar: "نظام التبريد" },
    isRequired: false,
    createdAt: "2024-01-21T15:20:00Z",
  },
  {
    id: 8,
    name: { en: "Operating System", ar: "نظام التشغيل" },
    isRequired: false,
    createdAt: "2024-01-22T12:10:00Z",
  },
];

const getColumns = (locale: LanguageType) => [
  {
    key: "id",
    header: translations[locale].id,
    sortable: true,
    render: (item: ProductOption) => (
      <span className="font-mono text-sm">#{item.id}</span>
    ),
  },
  {
    key: "name",
    header: translations[locale].name,
    sortable: true,
    render: (item: ProductOption) => (
      <Link
        className="font-medium text-primary hover:underline"
        href={`/admin/product-options/edit/${item.id}`}
      >
        {item.name[locale]}
      </Link>
    ),
  },
  {
    key: "isRequired",
    header: translations[locale].isRequired,
    sortable: true,
    render: (item: ProductOption) => {
      const isRequired = item.isRequired;
      const bgColor = isRequired ? "bg-red-100" : "bg-green-100";
      const textColor = isRequired ? "text-red-800" : "text-green-800";
      const text = isRequired
        ? translations[locale].yes
        : translations[locale].no;
      const badgeText = isRequired
        ? translations[locale].required
        : translations[locale].optional;

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}
        >
          {text} ({badgeText})
        </span>
      );
    },
  },
  {
    key: "createdAt",
    header: translations[locale].createdAt,
    sortable: true,
    render: (item: ProductOption) => {
      const date = new Date(item.createdAt);
      return (
        <span className="text-sm text-gray-600">
          {date.toLocaleDateString(locale === "en" ? "en-US" : "ar-EG", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
];

export default function ProductOptionsListPanel() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";
  const ITEMS_PER_PAGE = 6;
  const toggle = () => setIsOpen((prev) => !prev);

  const predefinedFilters: DynamicFilterItem[] = [
    {
      id: "isRequired",
      label: { en: "Required", ar: "مطلوب" },
      type: "dropdown",
      options: [
        { id: "true", name: { en: "Required", ar: "مطلوب" } },
        { id: "false", name: { en: "Optional", ar: "اختياري" } },
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

  // Count options by required status for the summary cards
  const requiredCounts = ProductOptions.reduce(
    (acc: { required: number; optional: number }, option) => {
      if (option.isRequired) {
        acc.required += 1;
      } else {
        acc.optional += 1;
      }
      return acc;
    },
    { required: 0, optional: 0 },
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
        statusCounts={requiredCounts}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        filters={predefinedFilters}
        quickFiltersGridCols="grid-cols-1 md:grid-cols-2  "
      />

      {/* Product Options Table */}
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
            href={`/admin/product-options/create`}
            className="flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-auto"
          >
            <Plus size={15} /> {t.create}
          </Link>
        </div>
        <DynamicTable
          data={ProductOptions}
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
