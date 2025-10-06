"use client";
import Link from "next/link";
import { TrashIcon, EyeIcon, Plus, Edit } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { useState } from "react";
import { LanguageType } from "@/util/translations";
import DynamicFilter from "@/components/UI/filter/DynamicFilter";
import SearchInput from "@/components/Forms/formFields/SearchInput";
import { DynamicFilterItem } from "@/types/filters";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { productFilters } from "@/constants/drawerFilter";

// Translation dictionary
const translations = {
  en: {
    title: "Pages Management",
    description: "Manage and organize website pages and content",
    id: "ID",
    name: "Name",
    template: "Template",
    createdAt: "Created At",
    status: "Status",
    operations: "Operations",
    searchPlaceholder: "Search pages...",
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
    create: "Create New Page",
    preview: "Preview",
    statuses: {
      published: "Published",
      draft: "Draft",
      archived: "Archived",
    },
    templates: {
      home: "Home Page",
      about: "About Us",
      contact: "Contact",
      blog: "Blog",
      services: "Services",
      custom: "Custom Template",
    },
  },
  ar: {
    title: "إدارة الصفحات",
    description: "إدارة وتنظيم صفحات ومحتوى الموقع",
    id: "المعرف",
    name: "الاسم",
    template: "النموذج",
    createdAt: "تاريخ الإنشاء",
    status: "الحالة",
    operations: "العمليات",
    searchPlaceholder: "ابحث في الصفحات...",
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
    create: "إنشاء صفحة جديدة",
    preview: "معاينة",
    statuses: {
      published: "منشور",
      draft: "مسودة",
      archived: "مؤرشف",
    },
    templates: {
      home: "الصفحة الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      blog: "المدونة",
      services: "الخدمات",
      custom: "نموذج مخصص",
    },
  },
};

// Page interface
interface PageType {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  template: string;
  createdAt: string;
  status: {
    en: string;
    ar: string;
  };
  slug: {
    en: string;
    ar: string;
  };
  lastModified?: string;
  author?: string;
}

// Dummy data for pages
const dummyPages: PageType[] = [
  {
    id: "1",
    name: {
      en: "Home Page",
      ar: "الصفحة الرئيسية",
    },
    template: "home",
    createdAt: "2024-01-15T10:30:00Z",
    status: {
      en: "Published",
      ar: "منشور",
    },
    slug: {
      en: "home",
      ar: "الرئيسية",
    },
    lastModified: "2024-03-20T14:25:00Z",
    author: "Admin User",
  },
  {
    id: "2",
    name: {
      en: "About Us",
      ar: "من نحن",
    },
    template: "about",
    createdAt: "2024-01-20T09:15:00Z",
    status: {
      en: "Published",
      ar: "منشور",
    },
    slug: {
      en: "about",
      ar: "من-نحن",
    },
    lastModified: "2024-02-28T11:45:00Z",
    author: "Admin User",
  },
  {
    id: "3",
    name: {
      en: "Contact Information",
      ar: "معلومات الاتصال",
    },
    template: "contact",
    createdAt: "2024-02-01T16:20:00Z",
    status: {
      en: "Published",
      ar: "منشور",
    },
    slug: {
      en: "contact",
      ar: "اتصل-بنا",
    },
    lastModified: "2024-03-15T13:30:00Z",
    author: "Content Manager",
  },
  {
    id: "4",
    name: {
      en: "Our Services",
      ar: "خدماتنا",
    },
    template: "services",
    createdAt: "2024-02-10T14:00:00Z",
    status: {
      en: "Draft",
      ar: "مسودة",
    },
    slug: {
      en: "services",
      ar: "خدماتنا",
    },
    lastModified: "2024-03-18T10:15:00Z",
    author: "Service Manager",
  },
  {
    id: "5",
    name: {
      en: "Company Blog",
      ar: "مدونة الشركة",
    },
    template: "blog",
    createdAt: "2024-02-15T11:45:00Z",
    status: {
      en: "Published",
      ar: "منشور",
    },
    slug: {
      en: "blog",
      ar: "المدونة",
    },
    lastModified: "2024-03-22T08:30:00Z",
    author: "Content Manager",
  },
  {
    id: "6",
    name: {
      en: "Privacy Policy",
      ar: "سياسة الخصوصية",
    },
    template: "custom",
    createdAt: "2024-03-01T12:00:00Z",
    status: {
      en: "Published",
      ar: "منشور",
    },
    slug: {
      en: "privacy-policy",
      ar: "سياسة-الخصوصية",
    },
    lastModified: "2024-03-01T12:00:00Z",
    author: "Admin User",
  },
  {
    id: "7",
    name: {
      en: "Terms of Service",
      ar: "شروط الخدمة",
    },
    template: "custom",
    createdAt: "2024-03-05T15:30:00Z",
    status: {
      en: "Draft",
      ar: "مسودة",
    },
    slug: {
      en: "terms-of-service",
      ar: "شروط-الخدمة",
    },
    lastModified: "2024-03-19T09:45:00Z",
    author: "Legal Team",
  },
  {
    id: "8",
    name: {
      en: "FAQ Section",
      ar: "قسم الأسئلة الشائعة",
    },
    template: "custom",
    createdAt: "2024-03-10T13:20:00Z",
    status: {
      en: "Archived",
      ar: "مؤرشف",
    },
    slug: {
      en: "faq",
      ar: "الاسئلة-الشائعة",
    },
    lastModified: "2024-03-25T16:10:00Z",
    author: "Support Team",
  },
];

export default function PagesListPanel() {
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
      render: (item: PageType) => (
        <span className="font-mono text-sm">#{item.id}</span>
      ),
    },
    {
      key: "name",
      header: translations[locale].name,
      sortable: true,
      render: (item: PageType) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{item.name[locale]}</div>
          <div className="text-xs text-gray-500">/{item.slug[locale]}</div>
        </div>
      ),
    },
    {
      key: "template",
      header: translations[locale].template,
      sortable: true,
      render: (item: PageType) => {
        const templateColors: Record<string, string> = {
          home: "bg-blue-100 text-blue-800",
          about: "bg-green-100 text-green-800",
          contact: "bg-purple-100 text-purple-800",
          blog: "bg-orange-100 text-orange-800",
          services: "bg-teal-100 text-teal-800",
          custom: "bg-gray-100 text-gray-800",
        };

        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${templateColors[item.template]}`}
          >
            {t.templates[item.template as keyof typeof t.templates]}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      header: translations[locale].createdAt,
      sortable: true,
      render: (item: PageType) => {
        const date = new Date(item.createdAt);
        return (
          <div className="space-y-1">
            <span className="text-sm text-gray-600">
              {date.toLocaleDateString(locale === "en" ? "en-US" : "ar-EG", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {item.lastModified && (
              <div className="text-xs text-gray-400">
                {locale === "en" ? "Modified: " : "تم التعديل: "}
                {new Date(item.lastModified).toLocaleDateString(
                  locale === "en" ? "en-US" : "ar-EG",
                  {
                    month: "short",
                    day: "numeric",
                  },
                )}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: translations[locale].status,
      render: (item: PageType) => {
        const statusColors: Record<string, string> = {
          Published: "bg-green-100 text-green-800",
          Draft: "bg-yellow-100 text-yellow-800",
          Archived: "bg-gray-100 text-gray-800",
        };

        const statusEn = item.status.en as "Published" | "Draft" | "Archived";
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[statusEn]}`}
          >
            {item.status[locale]}
          </span>
        );
      },
      sortable: true,
    },
  ];

  const predefinedFilters: DynamicFilterItem[] = [
    {
      id: "template",
      label: { en: "Template", ar: "النموذج" },
      type: "dropdown",
      options: [
        { id: "home", name: { en: "Home Page", ar: "الصفحة الرئيسية" } },
        { id: "about", name: { en: "About Us", ar: "من نحن" } },
        { id: "contact", name: { en: "Contact", ar: "اتصل بنا" } },
        { id: "blog", name: { en: "Blog", ar: "المدونة" } },
        { id: "services", name: { en: "Services", ar: "الخدمات" } },
        { id: "custom", name: { en: "Custom", ar: "مخصص" } },
      ],
      visible: true,
    },
    {
      id: "status",
      label: { en: "Status", ar: "الحالة" },
      type: "dropdown",
      options: [
        { id: "published", name: { en: "Published", ar: "منشور" } },
        { id: "draft", name: { en: "Draft", ar: "مسودة" } },
        { id: "archived", name: { en: "Archived", ar: "مؤرشف" } },
      ],
      visible: true,
    },
    {
      id: "dateRange",
      label: { en: "Date Range", ar: "نطاق التاريخ" },
      type: "date-range",
      visible: true,
    },
    {
      id: "author",
      label: { en: "Author", ar: "المؤلف" },
      type: "dropdown",
      options: [
        { id: "admin", name: { en: "Admin User", ar: "المسؤول" } },
        { id: "content", name: { en: "Content Manager", ar: "مدير المحتوى" } },
        { id: "service", name: { en: "Service Manager", ar: "مدير الخدمات" } },
        { id: "legal", name: { en: "Legal Team", ar: "الفريق القانوني" } },
        { id: "support", name: { en: "Support Team", ar: "فريق الدعم" } },
      ],
      visible: true,
    },
  ];

  // Count pages by status for the summary cards
  const statusCounts = dummyPages.reduce(
    (acc: Record<string, number>, page) => {
      acc[page.status[language]] = (acc[page.status[language]] || 0) + 1;
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

      {/* Pages Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-4">
          {/* Filter Controls Row */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={toggle}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
            >
              {t.filters}
            </button>
            <SearchInput locale={language} />
            <Link
              href={`/admin/pages/create`}
              className="hover:bg-primary/90 flex items-center justify-center gap-1 rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-auto"
            >
              <Plus size={15} /> {t.create}
            </Link>
          </div>
        </div>

        <DynamicTable
          data={dummyPages}
          columns={getColumns(language)}
          pagination={true}
          itemsPerPage={ITEMS_PER_PAGE}
          selectable={true}
          defaultSort={{ key: "createdAt", direction: "desc" }}
          solidActions={[
            {
              label: "Edit",
              onClick: (item) => router.push(`/admin/pages/edit/${item.id}`),
              icon: <Edit className="h-3 w-3" />,
              color: "#059669",
            },
            {
              label: "Preview",
              onClick: (item) =>
                window.open(`/${language}/${item.slug[language]}`, "_blank"),
              icon: <EyeIcon className="h-3 w-3" />,
              color: "#2563eb",
            },
            {
              label: "Delete",
              onClick: (item) => console.log(`Delete page: ${item.id}`),
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
