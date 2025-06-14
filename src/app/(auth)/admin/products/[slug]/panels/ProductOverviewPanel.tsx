"use client";
import Avatar from "@/components/UI/Avatar";
import { CardStats } from "@/components/UI/cards/CardStats";
import GenericChart from "@/components/UI/charts/GenericChart";
import { dummyChartSingleData } from "@/constants/sellerDashboardMock";
import { Eye, PencilIcon, SquarePen, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DynamicTable from "@/components/UI/tables/DTable";
import { Product } from "@/types/product";
import TransactionsList from "../../../components/TransactionsList";
import CustomersList from "../../../components/CustomersList";
type Order = {
  id: string;
  customer: {
    id: string;
    name: string;
    image?: string;
  };
  invoice: string;
  status: "pending" | "shipped" | "paid" | "canceled";
  qty: number;
  amount: string;
};

const orders: Order[] = [
  {
    id: "ORD123",
    customer: {
      id: "1",
      name: "Alice Johnson",
    },
    invoice: "#34324",
    status: "pending",
    qty: 2,
    amount: "$120.00",
  },
  {
    id: "ORD124",
    customer: {
      id: "2",
      name: "Bob Smith",
    },
    invoice: "#34325",
    status: "paid",
    qty: 1,
    amount: "$89.50",
  },
  {
    id: "ORD125",
    customer: {
      id: "3",
      name: "Catherine Lee",
    },
    invoice: "#34326",
    status: "shipped",
    qty: 3,
    amount: "$245.00",
  },
  {
    id: "ORD126",
    customer: {
      id: "4",
      name: "Daniel Green",
    },
    invoice: "#34327",
    status: "canceled",
    qty: 1,
    amount: "$49.99",
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
    render: (item: Order) => (
      <div className="flex items-center gap-2">
        <Avatar
          className="h-10 w-10"
          RandomColor
          name={item.customer.name}
          imageUrl={item.customer.image}
        />
        <span>{item.customer.name}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Total",
    sortable: true,
    align: "center",
    render: (item: Order) => item.amount,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    align: "center",
    render: (item: Order) => {
      const statusColor =
        item.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : item.status === "shipped"
            ? "bg-blue-100 text-blue-800"
            : item.status === "canceled"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800";

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}
        >
          {item.status}
        </span>
      );
    },
  },
  {
    key: "qty",
    header: "Qty",
    sortable: true,
    align: "center",
  },
];

export default function ProductOverviewPanel({
  foundProduct,
}: {
  foundProduct: Product;
}) {
  return (
    <div>
      <div className="mb-4 flex w-full flex-col items-center gap-6 rounded-lg border border-gray-200 bg-white p-3 shadow-sm md:flex-row md:items-start">
        <Image
          className="h-[320px] w-full rounded-lg object-cover md:h-[150px] md:w-[150px]"
          src={foundProduct?.images?.[0] ?? "/images/placeholder.jpg"}
          alt="course image"
          width={300}
          height={300}
        />
        <div className="flex-1">
          <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <h1 className="max-w-[350px] text-xl font-bold">
                {foundProduct.title}
              </h1>
              <span className="rounded-full bg-primary px-2 py-1 text-xs text-white">
                {foundProduct.status}
              </span>
            </div>
            <div className="flex h-full items-start gap-3">
              <Link
                className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                href={"#"}
              >
                <SquarePen size={12} />
                Edit
              </Link>
              <Link
                className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                href={`/product-details/${foundProduct.id}`}
              >
                <Eye size={12} />
                Preview
              </Link>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-start gap-3">
            <Avatar
              className="h-12 w-12"
              imageUrl={foundProduct?.sellers?.image}
              name={foundProduct?.sellers?.name ?? "unknow"}
            />
            <div>
              <span className="text-sm text-secondary">Seller</span>
              <h2 className="text-sm font-semibold">
                {foundProduct?.sellers?.name}
              </h2>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-5 sm:flex-row">
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Category</span>
              <span className="text-sm font-semibold">
                {foundProduct.category?.title}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Subcategory</span>
              <span className="text-sm font-semibold">
                {foundProduct?.category?.subcategory?.title ??
                  "No subcategories"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Brand</span>
              <span className="text-sm font-semibold">
                {foundProduct?.brand?.title ?? "No brand"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Price</span>
              <span className="text-sm font-semibold">
                ${foundProduct.price}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Level</span>
              <span className="text-sm font-semibold">Intersmediate</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-secondary">Last Update</span>
              <span className="text-sm font-semibold">April 5,2025</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardStats
          title="Purchase Frequancy"
          value="1,245"
          change="+12.5%"
          icon="users"
          color="#429fe6"
          size="md"
        />

        <CardStats
          title="Total Sales"
          value="$12,450"
          change="+8%"
          icon="dollar"
          size="md"
        />
        <CardStats
          title="Total Views"
          value="5,678"
          change="+15%"
          icon="eye"
          color="#625df5"
          size="md"
        />
        <CardStats
          title="Commission"
          value="78%"
          change="+3%"
          icon="award"
          color="#625df5"
          size="md"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-9">
        <div className="col-span-1 xl:col-span-6">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <GenericChart
              chartTitle="Enrollment And Views Over Time"
              data={dummyChartSingleData}
            />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button className="text-sm text-green-600 hover:text-green-800">
                View All &gt;
              </button>
            </div>
            <DynamicTable
              minWidth={600}
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
        <div className="col-span-1 xl:col-span-3">
          <TransactionsList />
          <CustomersList />
        </div>
      </div>
    </div>
  );
}
