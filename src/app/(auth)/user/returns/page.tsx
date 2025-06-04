"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type ReturnItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  reason: string;
  status: "Requested" | "Approved" | "In Transit" | "Delivered" | "Rejected";
  returnOption: string;
  refundAmount?: number;
  estimatedRefundDate?: string;
};

type ReturnOrder = {
  id: string;
  orderId: string;
  date: string;
  items: ReturnItem[];
  status: "Requested" | "Approved" | "In Transit" | "Delivered" | "Rejected";
  totalRefund: number;
  trackingNumber?: string;
  carrier?: string;
};

const ReturnsPage = () => {
  const [activeTab, setActiveTab] = useState<
    "All" | "Requested" | "Delivered" | "In Transit" | "Approved" | "Rejected"
  >("All");

  const returns: ReturnOrder[] = [
    {
      id: "RET-54321",
      orderId: "ORD-12345",
      date: "2025-05-18",
      status: "Delivered",
      totalRefund: 189.98,
      trackingNumber: "TRK789012345",
      carrier: "Aramex",
      items: [
        {
          id: "ITEM-001",
          name: "Wireless Bluetooth Earbuds",
          image:
            "https://f.nooncdn.com/p/pzsku/Z5B89BB5A6821441786C5Z/45/_/1736409693/119ae4ae-1362-4d04-845a-9e8d497e1f03.jpg?width=800",
          price: 59.99,
          quantity: 1,
          reason: "Changed my mind",
          returnOption: "Refund to original payment",
          status: "Delivered",
          refundAmount: 59.99,
          estimatedRefundDate: "2025-06-05",
        },
        {
          id: "ITEM-002",
          name: "Smart Watch Series 5",
          image:
            "https://f.nooncdn.com/p/pzsku/Z5B89BB5A6821441786C5Z/45/_/1736409693/119ae4ae-1362-4d04-845a-9e8d497e1f03.jpg?width=800",
          price: 129.99,
          quantity: 1,
          reason: "Product not as described",
          returnOption: "noon Credit",
          status: "Delivered",
          refundAmount: 129.99,
          estimatedRefundDate: "2025-06-05",
        },
      ],
    },
    {
      id: "RET-98765",
      orderId: "ORD-67890",
      date: "2025-05-25",
      status: "Requested",
      totalRefund: 39.98,
      items: [
        {
          id: "ITEM-003",
          name: "USB-C Fast Charger",
          image:
            "https://f.nooncdn.com/p/pzsku/Z5B89BB5A6821441786C5Z/45/_/1736409693/119ae4ae-1362-4d04-845a-9e8d497e1f03.jpg?width=800",
          price: 19.99,
          quantity: 2,
          reason: "Product damaged",
          returnOption: "Replacement",
          status: "Requested",
        },
      ],
    },
    {
      id: "RET-13579",
      orderId: "ORD-24680",
      date: "2025-05-30",
      status: "In Transit",
      totalRefund: 75.0,
      trackingNumber: "TRK246813579",
      carrier: "DHL",
      items: [
        {
          id: "ITEM-004",
          name: "Portable Bluetooth Speaker",
          image:
            "https://f.nooncdn.com/p/pzsku/Z5B89BB5A6821441786C5Z/45/_/1736409693/119ae4ae-1362-4d04-845a-9e8d497e1f03.jpg?width=800",
          price: 75.0,
          quantity: 1,
          reason: "Wrong item received",
          returnOption: "Refund to original payment",
          status: "In Transit",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Requested":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-blue-100 text-blue-800";
      case "In Transit":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReturns =
    activeTab === "All"
      ? returns
      : returns.filter((r) => r.status === activeTab);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-gray-700">My Returns</h1>
        <Link
          href="returns/new"
          className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 md:px-6 md:text-sm"
        >
          <Plus className="h-4 w-4" />
          CREATE A NEW RETURN
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          "All",
          "Requested",
          "Approved",
          "In Transit",
          "Delivered",
          "Rejected",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`rounded-md px-4 py-2 text-sm transition ${
              activeTab === tab
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab} Returns
          </button>
        ))}
      </div>

      {filteredReturns.length > 0 ? (
        <div className="space-y-6">
          {filteredReturns.map((returnOrder) => (
            <div
              key={returnOrder.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
            >
              <div className="border-b p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-medium">Return #{returnOrder.id}</h3>
                    <p className="text-sm text-gray-500">
                      For Order #{returnOrder.orderId}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span
                      className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        returnOrder.status,
                      )}`}
                    >
                      {returnOrder.status}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">
                      Requested on {returnOrder.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {returnOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-start border-b py-3 last:border-b-0 md:flex-row"
                  >
                    <Image
                      width={300}
                      height={300}
                      src={item.image}
                      alt={item.name}
                      className="mr-4 h-20 w-20 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm">EGP {item.price.toFixed(2)}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:text-right">
                          <span
                            className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Reason
                          </p>
                          <p className="text-sm">{item.reason}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Return Option
                          </p>
                          <p className="text-sm">{item.returnOption}</p>
                        </div>
                        {item.refundAmount && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Refund Amount
                            </p>
                            <p className="text-sm">
                              EGP {item.refundAmount.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {item.estimatedRefundDate && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Estimated Refund Date
                            </p>
                            <p className="text-sm">
                              {item.estimatedRefundDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t bg-gray-50 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    {returnOrder.trackingNumber && (
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm font-medium text-gray-700">
                          Tracking Number
                        </p>
                        <p className="text-sm">
                          {returnOrder.trackingNumber} ({returnOrder.carrier})
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm font-medium text-gray-700">
                      Total Refund
                    </p>
                    <p className="text-lg font-bold">
                      EGP {returnOrder.totalRefund.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">No returns found</h2>
          <p className="mb-4 text-gray-600">
            You have not requested any {activeTab.toLowerCase()} returns
          </p>
          <Link
            href="returns/new"
            className="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
          >
            CREATE A NEW RETURN
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReturnsPage;
