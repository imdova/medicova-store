"use client";
import Link from "next/link";
import { ExternalLink, TrashIcon, Star, EyeIcon, Plus } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { useState } from "react";
import { LanguageType } from "@/util/translations";
import DynamicFilter from "@/components/UI/filter/DynamicFilter";
import SearchInput from "@/components/Forms/formFields/SearchInput";
import { DynamicFilterItem } from "@/types/filters";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { productFilters } from "@/constants/drawerFilter";
import Image from "next/image";
import { ReviewType } from "@/types/product";
import { dummyReviews } from "@/constants/reviews";

// Translation dictionary
const translations = {
  en: {
    title: "Reviews Management",
    description: "Manage and moderate customer reviews and ratings",
    id: "ID",
    product: "Product",
    user: "User",
    rating: "Rating",
    comment: "Comment",
    images: "Images",
    status: "Status",
    createdAt: "Created At",
    operations: "Operations",
    searchPlaceholder: "Search reviews...",
    search: "Search",
    moreFilters: "More Filters",
    download: "Download",
    allStatuses: "All Statuses",
    active: "Active",
    draft: "Draft",
    reset: "Reset",
    showData: "Show Data",
    unknown: "Unknown",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    quickFilters: "Quick Filters",
    addFilter: "Add Filter",
    hideFilters: "Hide Filters",
    showFilters: "Show Filters",
    filters: "Filters",
    create: "Create",
    approve: "Approve",
    reject: "Reject",
    statuses: {
      published: "Published",
      pending: "Pending",
      rejected: "Rejected",
    },
    ratings: {
      excellent: "Excellent",
      good: "Good",
      average: "Average",
      poor: "Poor",
      terrible: "Terrible",
    },
  },
  ar: {
    title: "إدارة التقييمات",
    description: "إدارة ومراجعة تقييمات وتقييمات العملاء",
    id: "المعرف",
    product: "المنتج",
    user: "المستخدم",
    rating: "التقييم",
    comment: "التعليق",
    images: "الصور",
    status: "الحالة",
    createdAt: "تاريخ الإنشاء",
    operations: "العمليات",
    searchPlaceholder: "ابحث في التقييمات...",
    search: "بحث",
    moreFilters: "المزيد من الفلاتر",
    download: "تحميل",
    allStatuses: "كل الحالات",
    active: "نشط",
    draft: "مسودة",
    reset: "إعادة تعيين",
    showData: "عرض البيانات",
    unknown: "غير معروف",
    delete: "حذف",
    edit: "تعديل",
    view: "عرض",
    quickFilters: "الفلاتر السريعة",
    addFilter: "إضافة فلتر",
    hideFilters: "إخفاء الفلاتر",
    showFilters: "عرض الفلاتر",
    filters: "فلاتر",
    create: "إنشاء",
    approve: "موافقة",
    reject: "رفض",
    statuses: {
      published: "منشور",
      pending: "قيد الانتظار",
      rejected: "مرفوض",
    },
    ratings: {
      excellent: "ممتاز",
      good: "جيد",
      average: "متوسط",
      poor: "ضعيف",
      terrible: "سيء",
    },
  },
};

export default function ReviewsListPanel() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";
  const ITEMS_PER_PAGE = 6;
  const router = useRouter();
  const toggle = () => setIsOpen((prev) => !prev);

  const getColumns = (locale: LanguageType) => [
    {
      key: "id",
      header: translations[locale].id,
      sortable: true,
      render: (item: ReviewType) => (
        <span className="font-mono text-sm">#{item.id}</span>
      ),
    },
    {
      key: "product",
      header: translations[locale].product,
      sortable: true,
      render: (item: ReviewType) => (
        <Link
          className="flex items-center gap-2 font-medium text-primary hover:underline"
          href={`/admin/products/edit/${item.product.id}`}
        >
          <span className="max-w-[150px] truncate">
            {item.product.title[locale]}
          </span>
          <ExternalLink className="h-3 w-3 flex-shrink-0" />
        </Link>
      ),
    },
    {
      key: "user",
      header: translations[locale].user,
      sortable: true,
      render: (item: ReviewType) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {item.user.avatar && (
              <Image
                src={item.user.avatar}
                alt={item.user.firstName}
                width={80}
                height={80}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-medium text-gray-900">{`${item.user.firstName} ${item.user.lastName}`}</div>
              <div className="text-xs text-gray-600">{item.user.email}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "rating",
      header: translations[locale].rating,
      sortable: true,
      render: (item: ReviewType) => (
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= item.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "comment",
      header: translations[locale].comment,
      render: (item: ReviewType) => (
        <div className="max-w-[200px]">
          <p className="line-clamp-2 text-sm text-gray-600">{item.comment}</p>
        </div>
      ),
    },
    {
      key: "images",
      header: translations[locale].images,
      render: (item: ReviewType) => (
        <div className="flex gap-1">
          {item.product.images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className="relative h-8 w-8 overflow-hidden rounded-md border"
            >
              <Image
                src={image}
                alt={`Review image ${index + 1}`}
                fill
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {item.images.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-gray-100 text-xs text-gray-500">
              +{item.images.length - 3}
            </div>
          )}
          {item.images.length === 0 && (
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: translations[locale].status,
      render: (item: ReviewType) => {
        const statusColors: Record<
          "Published" | "Pending" | "Rejected",
          string
        > = {
          Published: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Rejected: "bg-red-100 text-red-800",
        };

        const statusEn = item.status.en as "Published" | "Pending" | "Rejected";
        return (
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColors[statusEn]}`}
          >
            {item.status[language]}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: "createdAt",
      header: translations[locale].createdAt,
      sortable: true,
      render: (item: ReviewType) => {
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

  const predefinedFilters: DynamicFilterItem[] = [
    {
      id: "status",
      label: { en: "Status", ar: "حالة التقييم" },
      type: "dropdown",
      options: [
        { id: "published", name: { en: "Published", ar: "منشور" } },
        { id: "pending", name: { en: "Pending", ar: "قيد الانتظار" } },
        { id: "rejected", name: { en: "Rejected", ar: "مرفوض" } },
      ],
      visible: true,
    },
    {
      id: "rating",
      label: { en: "Rating", ar: "التقييم" },
      type: "dropdown",
      options: [
        { id: "5", name: { en: "5 Stars - Excellent", ar: "5 نجوم - ممتاز" } },
        { id: "4", name: { en: "4 Stars - Good", ar: "4 نجوم - جيد" } },
        { id: "3", name: { en: "3 Stars - Average", ar: "3 نجوم - متوسط" } },
        { id: "2", name: { en: "2 Stars - Poor", ar: "2 نجوم - ضعيف" } },
        { id: "1", name: { en: "1 Star - Terrible", ar: "1 نجمة - سيء" } },
      ],
      visible: true,
    },
    {
      id: "hasImages",
      label: { en: "Has Images", ar: "يحتوي على صور" },
      type: "dropdown",
      options: [
        { id: "true", name: { en: "With Images", ar: "بصور" } },
        { id: "false", name: { en: "Without Images", ar: "بدون صور" } },
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

  // Count reviews by status for the summary cards
  const statusCounts = dummyReviews.reduce(
    (acc: Record<string, number>, review) => {
      acc[review.status[language]] = (acc[review.status[language]] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <div className="relative space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h2 className="mb-1 text-2xl font-bold">{t.title}</h2>
        <p className="max-w-lg text-sm text-gray-600">{t.description}</p>
      </div>

      <DynamicFilter
        t={t}
        isOpen={isOpen}
        onToggle={() => setIsOpen(false)}
        locale={language}
        isRTL={isRTL}
        drawerFilters={productFilters}
        showViewToggle={false}
        statusCounts={statusCounts}
        showMoreFilters={true}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        filters={predefinedFilters}
        quickFiltersGridCols="grid-cols-1 md:grid-cols-2"
      />

      {/* Reviews Table */}
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
            href={`/admin/reviews/create`}
            className="flex items-center justify-center gap-1 rounded-md border border-gray-200 bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-auto"
          >
            <Plus size={15} /> {t.create}
          </Link>
        </div>

        <DynamicTable
          data={dummyReviews}
          columns={getColumns(language)}
          pagination={true}
          itemsPerPage={ITEMS_PER_PAGE}
          selectable={true}
          defaultSort={{ key: "createdAt", direction: "desc" }}
          solidActions={[
            {
              label: "View",
              onClick: (item) => router.push(`/admin/reviews/${item.id}`),
              icon: <EyeIcon className="h-3 w-3" />,
              color: "#059669",
            },
            {
              label: "Delete",
              onClick: (item) => console.log(`Delete review: ${item.id}`),
              color: "#dc2626",
              icon: <TrashIcon className="h-3 w-3" />,
            },
          ]}
          locale={language}
          minWidth={1200}
        />
      </div>
    </div>
  );
}
