"use client";

import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Order } from "../types/account";
import OrderList from "../component/OrderList";
import { Search } from "lucide-react";

const mockOrders: Order[] = [
  {
    id: "1",
    status: "cancelled",
    productImage:
      "https://f.nooncdn.com/p/v1640702431/N52265998A_1.jpg?format=avif&width=original",
    date: "Tuesday, 27th May",
    time: "06:50 PM",
    productName: "Jeep Buluo Leather Cross Body Bag Black",
    orderId: "NEBHIB0642330781",
    createdAt: new Date("2023-05-27").getTime(), // Added for filtering
  },
  {
    id: "2",
    status: "cancelled",
    productImage:
      "https://f.nooncdn.com/p/v1640702431/N52265998A_1.jpg?format=avif&width=original",

    date: "Tuesday, 27th May",
    time: "06:50 PM",
    productName: "B.S COLLECTION: Ywingo waterproof bag shoulder or backpack",
    productBrand: "B.S",
    productDescription: "Cafe color",
    orderId: "NEBHIB0642330782",
    createdAt: new Date("2023-05-27").getTime(), // Added for filtering
  },
  {
    id: "3",
    status: "completed",
    productImage:
      "https://f.nooncdn.com/p/v1640702431/N52265998A_1.jpg?format=avif&width=original",

    date: "Monday, 15th June",
    time: "10:30 AM",
    productName: "Wireless greentooth Headphones",
    productBrand: "SoundMaster",
    orderId: "NEBHIB0642330783",
    createdAt: new Date("2023-06-15").getTime(),
  },
  {
    id: "4",
    status: "completed",
    productImage:
      "https://f.nooncdn.com/p/v1640702431/N52265998A_1.jpg?format=avif&width=original",
    date: "Friday, 1st September",
    time: "03:45 PM",
    productName: "Smart Watch Pro",
    productBrand: "TechGadgets",
    orderId: "NEBHIB0642330784",
    createdAt: new Date("2023-09-01").getTime(),
  },
];

const OrdersPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchTerm = searchParams.get("search") || "";
  const timeFilter =
    (searchParams.get("timeFilter") as "all" | "last3months") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10); // default page 1
  const pageSize = 8; // Show 2 orders per page

  // Update URL params helper
  const updateSearchParam = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    // Reset page to 1 if changing filters
    if (param === "search" || param === "timeFilter") {
      params.set("page", "1");
    }
    router.push(`/account/orders?${params.toString()}`);
  };

  const filteredOrders = useMemo(() => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return mockOrders.filter((order) => {
      const matchesSearch =
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productBrand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTimePeriod =
        timeFilter === "all" || order.createdAt >= threeMonthsAgo.getTime();

      return matchesSearch && matchesTimePeriod;
    });
  }, [searchTerm, timeFilter]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages); // Keep page in bounds
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-700">Orders</h2>
        <p className="text-sm text-secondary">
          View the delivery status for items and your order history
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Order Count */}
        <div className="w-1/3 text-sm text-gray-500">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "order" : "orders"} found
        </div>
        <div className="flex w-full gap-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by product, brand, or order ID..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 placeholder:text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => updateSearchParam("search", e.target.value)}
            />
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
            />
          </div>

          <div>
            <select
              className="h-full rounded-md border border-gray-300 px-2 py-2 focus:outline-none"
              value={timeFilter}
              onChange={(e) => updateSearchParam("timeFilter", e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="last3months">Last 3 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order List */}
      <OrderList orders={paginatedOrders} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => updateSearchParam("page", String(currentPage - 1))}
            className={`rounded px-4 py-2 ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-green-600 text-white"
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => updateSearchParam("page", String(currentPage + 1))}
            className={`rounded px-4 py-2 ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-green-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
