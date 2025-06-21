"use client";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { CircleDollarSign, CreditCard, TextSearch, Wallet } from "lucide-react";
import OverviewPanel from "./panels/OverviewPanel";
import TransactionsListPanel from "./panels/TransactionsListPanel";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinancialPage() {
  const { language } = useLanguage();
  const tabs = [
    {
      label: "Overview",
      icon: TextSearch,
      content: <OverviewPanel locale={language} />,
    },
    {
      label: "Transactions History",
      icon: CircleDollarSign,
      content: <TransactionsListPanel locale={language} />,
    },
    {
      label: "Plans",
      icon: CircleDollarSign,
      content: <TransactionsListPanel locale={language} />,
    },
    {
      label: "Wallet",
      icon: Wallet,
      content: <TransactionsListPanel locale={language} />,
    },
    {
      label: "Payout Settings",
      icon: CreditCard,
      content: <TransactionsListPanel locale={language} />,
    },
  ];
  return (
    <main>
      <TabWithIcon tabs={tabs} />
    </main>
  );
}
