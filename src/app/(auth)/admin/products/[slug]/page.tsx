"use client";
import NotFound from "@/app/not-found";
import { TabWithIcon } from "@/components/UI/TabWithIcon";
import { products } from "@/constants/products";
import { Eye, List } from "lucide-react";
import { use } from "react";
import ProductOverviewPanel from "./panels/ProductOverviewPanel";
import OrdersPanel from "./panels/OrdersPanel";

export default function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const foundProduct = products.find((p) => p.id === slug);
  if (!foundProduct) {
    return NotFound;
  }
  const tabs = [
    {
      label: "Product Overview",
      icon: Eye,
      content: <ProductOverviewPanel foundProduct={foundProduct} />,
    },
    {
      label: "Orders",
      icon: List,
      content: <OrdersPanel />,
    },
  ];

  return (
    <div>
      <TabWithIcon tabs={tabs} />
    </div>
  );
}
