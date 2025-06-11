"use client";

import { CardStats } from "@/components/UI/cards/CardStats";
import GenericChart from "@/components/UI/charts/GenericChart";
import DynamicTable from "@/components/UI/tables/DTable";
import TopProducts from "./components/TopProducts";
import { dummyCards, dummyChartData } from "@/constants/sellerDashboardMock";
import { PencilIcon, TrashIcon } from "lucide-react";

type Order = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
  date: string;
};

const orders: Order[] = [
  {
    id: "ORD123",
    customer: "Alice Johnson",
    total: 129.99,
    status: "pending",
    date: "2025-06-04",
  },
  {
    id: "ORD124",
    customer: "Bob Smith",
    total: 89.5,
    status: "delivered",
    date: "2025-06-03",
  },
];

const columns = [
  {
    key: "id",
    header: "Order ID",
    sortable: true,
  },
  {
    key: "customer",
    header: "Customer",
    sortable: true,
    align: "center",
  },
  {
    key: "total",
    header: "Total",
    render: (item: Order) => `$${item.total.toFixed(2)}`,
    sortable: true,
    align: "center",
  },
  {
    key: "status",
    header: "Status",
    render: (item: Order) => {
      const statusColor =
        item.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : item.status === "shipped"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </span>
      );
    },
    sortable: true,
    align: "center",
  },
  {
    key: "date",
    header: "Date",
    sortable: true,
    align: "center",
  },
];

export default function SellerDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStats
          title="Total Revenue"
          value="$12,345"
          change="+12.5%"
          icon="dollar"
        />
        <CardStats
          title="Total Orders"
          value="156"
          change="+8.2%"
          icon="shoppingCart"
        />
        <CardStats title="Products" value="42" change="+3.1%" icon="package" />
        <CardStats title="Avg. Rating" value="4.6" change="+0.3" icon="star" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
          <GenericChart
            chartTitle="Sales Overview"
            data={dummyChartData}
            showCards={true}
            cards={dummyCards}
          />
        </div>
        <div>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <TopProducts />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-4">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <DynamicTable
              data={orders}
              columns={columns}
              pagination={true}
              itemsPerPage={5}
              selectable
              defaultSort={{ key: "date", direction: "desc" }}
              actions={[
                {
                  label: "Edit",
                  onClick: () => console.log("Edited"),
                  className:
                    "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50 ",
                  icon: <PencilIcon className="h-4 w-4" />,
                },
                {
                  label: "Delete",
                  onClick: () => console.log("Deleted"),
                  className:
                    "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 ",
                  icon: <TrashIcon className="h-4 w-4" />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
