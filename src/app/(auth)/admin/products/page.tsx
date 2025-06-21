"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { Eye, List, Plus } from "lucide-react";
import Link from "next/link";
import OverviewPanel from "./panels/OverviewPanel";
import ProductListPanel from "./panels/ProductListPanel";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  en: {
    overview: "Product Overview",
    list: "Product List",
    add: "Add New Product",
  },
  ar: {
    overview: "نظرة عامة على المنتجات",
    list: "قائمة المنتجات",
    add: "إضافة منتج جديد",
  },
};

export default function ProductsPage() {
  const { language } = useLanguage();
  const tabs = [
    {
      label: t[language].overview,
      icon: Eye,
      content: <OverviewPanel locale={language} />,
    },
    {
      label: t[language].list,
      icon: List,
      content: <ProductListPanel locale={language} />,
    },
  ];

  return (
    <main>
      <TabWithIcon
        leftbutton={
          <Link
            className="flex w-full items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 lg:w-fit"
            href="/create-product"
          >
            <Plus size={15} />
            {t[language].add}
          </Link>
        }
        tabs={tabs}
      />
    </main>
  );
}
