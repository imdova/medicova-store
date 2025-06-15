"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { Eye, List, Plus } from "lucide-react";
import OverviewPanel from "./panels/OverviewPanel";
import SellersListPanel from "./panels/SellersListPanel";
import { useState } from "react";
import AddSellerModal from "../components/AddSellerModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main>
      <TabWithIcon
        leftbutton={
          <button
            className="flex w-full items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 lg:w-fit"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={15} />
            Add New Seller
          </button>
        }
        tabs={tabs}
      />
      <AddSellerModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </main>
  );
}
