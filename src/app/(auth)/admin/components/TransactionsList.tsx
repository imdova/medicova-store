import React, { useState } from "react";
import TransactionItem from "./TransactionItem";

const monthOptions = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "last-3-months", label: "Last 3 Months" },
  { value: "this-year", label: "This Year" },
];

const TransactionsList: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("this-month");

  // Sample transaction data
  const transactions = [
    {
      id: "1",
      platform: "Paytm",
      description: "Starbucks",
      amount: 20,
      type: "payment" as const,
      date: new Date(),
    },
    {
      id: "2",
      platform: "PayPal",
      description: "Client Payment",
      amount: 800,
      type: "refund" as const,
      date: new Date(),
    },
    {
      id: "3",
      platform: "Stripe",
      description: "Ordered iPhone 14",
      amount: 300,
      type: "purchase" as const,
      date: new Date(),
    },
    {
      id: "4",
      platform: "Razorpay",
      description: "Refund",
      amount: 500,
      type: "refund" as const,
      date: new Date(),
    },
    {
      id: "5",
      platform: "Paytm",
      description: "Starbucks",
      amount: 1500,
      type: "payment" as const,
      date: new Date(),
    },
    {
      id: "6",
      platform: "Stripe",
      description: "Ordered iPhone 14",
      amount: 800,
      type: "refund" as const,
      date: new Date(),
    },
  ];

  return (
    <div className="mb-2 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-md border border-gray-200 px-3 py-1 text-sm focus:outline-none"
        >
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-[500px] space-y-2 overflow-y-auto">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
