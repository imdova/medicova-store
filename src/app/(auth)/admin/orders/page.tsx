"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { List } from "lucide-react";
import OrdersListPanel from "./panels/OrdersListPanel";
import RefundRequstsListPanel from "./panels/RefundRequstsListPanel";

const tabs = [
  {
    label: "Orders",
    icon: List,
    content: <OrdersListPanel />,
  },
  {
    label: "Refund Requsts",
    icon: List,
    content: <RefundRequstsListPanel />,
  },
];

export default function FinancialPage() {
  return (
    <main>
      <TabWithIcon tabs={tabs} />
    </main>
  );
}
