"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { Eye, List, Plus } from "lucide-react";
import Link from "next/link";
import OverviewPanel from "./panels/OverviewPanel";
import SellersListPanel from "./panels/SellersListPanel";

const tabs = [
  {
    label: "Sellers Overview",
    icon: Eye,
    content: <OverviewPanel />,
  },
  {
    label: "Sellers List",
    icon: List,
    content: <SellersListPanel />,
  },
];

export default function SellersPage() {
  return (
    <main>
      <TabWithIcon
        leftbutton={
          <Link
            className="flex w-full items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 lg:w-fit"
            href="/add-seller"
          >
            <Plus size={15} />
            Add New Seller
          </Link>
        }
        tabs={tabs}
      />
    </main>
  );
}
