"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { CircleDollarSign, CreditCard, TextSearch, Wallet } from "lucide-react";
import OverviewPanel from "./panels/OverviewPanel";
import TransactionsListPanel from "./panels/TransactionsListPanel";

const tabs = [
  {
    label: "Overview",
    icon: TextSearch,
    content: <OverviewPanel />,
  },
  {
    label: "Transactions History",
    icon: CircleDollarSign,
    content: <TransactionsListPanel />,
  },
  {
    label: "Plans",
    icon: CircleDollarSign,
    content: <TransactionsListPanel />,
  },
  {
    label: "Wallet",
    icon: Wallet,
    content: <TransactionsListPanel />,
  },
  {
    label: "Payout Settings",
    icon: CreditCard,
    content: <TransactionsListPanel />,
  },
];

export default function FinancialPage() {
  return (
    <main>
      <TabWithIcon tabs={tabs} />
    </main>
  );
}
