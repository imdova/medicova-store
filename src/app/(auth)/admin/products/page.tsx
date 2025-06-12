"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { Eye, List, Plus } from "lucide-react";
import Link from "next/link";
import OverviewPanel from "./panels/OverviewPanel";
import ProductListPanel from "./panels/ProductListPanel";

const tabs = [
  {
    label: "Product Overview",
    icon: Eye,
    content: <OverviewPanel />,
  },
  {
    label: "Product List",
    icon: List,
    content: <ProductListPanel />,
  },
];

export default function ProductsPage() {
  return (
    <main>
      <TabWithIcon
        leftbutton={
          <Link
            className="flex w-full items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 lg:w-fit"
            href="/create-product"
          >
            <Plus size={15} />
            Add New Product
          </Link>
        }
        tabs={tabs}
      />
    </main>
  );
}
