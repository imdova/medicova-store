import { CardStats } from "@/components/UI/cards/CardStats";
import GenericChart from "@/components/UI/charts/GenericChart";
import { dummyChartSingleData } from "@/constants/sellerDashboardMock";
import { useState } from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import Avatar from "@/components/UI/Avatar";
import Link from "next/link";
import { Seller } from "@/types/product";
import { Sellers } from "@/constants/sellers";
import TransactionsTabs from "../../components/TransactionsTabs";
type Category = {
  id: string;
  name: string;
  image: string;
  products: number;
};

type Brand = {
  id: string;
  name: string;
  image: string;
  products: number;
};

const Categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    image: "/images/categories/electronics.png",
    products: 1200,
  },
  {
    id: "2",
    name: "Fashion",
    image: "/images/categories/fashion.png",
    products: 950,
  },
  {
    id: "3",
    name: "Home Appliances",
    image: "/images/categories/home.png",
    products: 700,
  },
  {
    id: "4",
    name: "Books",
    image: "/images/categories/books.png",
    products: 430,
  },
  {
    id: "5",
    name: "Toys",
    image: "/images/categories/toys.png",
    products: 380,
  },
];

const Brands: Brand[] = [
  {
    id: "1",
    name: "Apple",
    image: "/images/brands/apple.png",
    products: 340,
  },
  {
    id: "2",
    name: "Samsung",
    image: "/images/brands/samsung.png",
    products: 310,
  },
  {
    id: "3",
    name: "Nike",
    image: "/images/brands/nike.png",
    products: 260,
  },
  {
    id: "4",
    name: "Sony",
    image: "/images/brands/sony.png",
    products: 180,
  },
  {
    id: "5",
    name: "Adidas",
    image: "/images/brands/adidas.png",
    products: 150,
  },
];

const SellerColumns = [
  {
    key: "name",
    header: "Seller",
    render: (seller: Seller) => (
      <div className="flex items-center gap-2">
        <Avatar
          className="h-7 w-7"
          imageUrl={seller.image}
          name={seller.name}
        />
        <Link href={"#"} className="text-xs hover:underline">
          {seller.name}
        </Link>
      </div>
    ),
  },
  {
    key: "sales",
    header: "Sales",
    render: (seller: Seller) => seller.products,
    align: "center",
  },
];
const CategoryColumns = [
  {
    key: "name",
    header: "Category",
    render: (category: Category) => (
      <div className="flex items-center gap-2">
        <Avatar
          className="h-7 w-7"
          imageUrl={category.image}
          name={category.name}
        />
        <Link href={"#"} className="text-xs hover:underline">
          {category.name}
        </Link>
      </div>
    ),
  },
  {
    key: "products",
    header: "Products",
    render: (category: Category) => category.products,
    align: "center",
  },
];
const BrandColumns = [
  {
    key: "name",
    header: "Brand",
    render: (brand: Brand) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7" imageUrl={brand.image} name={brand.name} />
        <Link href={"#"} className="text-xs hover:underline">
          {brand.name}
        </Link>
      </div>
    ),
  },
  {
    key: "products",
    header: "Products",
    render: (brand: Brand) => brand.products,
    align: "center",
  },
];

const TopTabs = () => {
  const [activeTab, setActiveTab] = useState<
    "sellers" | "categories" | "brands"
  >("sellers");

  const tabs = [
    { key: "sellers", label: "Top Seller" },
    { key: "categories", label: "Top Category" },
    { key: "brands", label: "Top Brands" },
  ];

  const renderTable = () => {
    switch (activeTab) {
      case "sellers":
        return (
          <DynamicTable
            data={Sellers}
            columns={SellerColumns}
            itemsPerPage={5}
            minWidth={250}
          />
        );
      case "categories":
        return (
          <DynamicTable
            data={Categories}
            columns={CategoryColumns}
            itemsPerPage={5}
            minWidth={250}
          />
        );
      case "brands":
        return (
          <DynamicTable
            data={Brands}
            columns={BrandColumns}
            itemsPerPage={5}
            minWidth={250}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium transition ${
                activeTab === tab.key
                  ? "border-green-300 bg-green-50 text-green-600"
                  : "border-transparent text-gray-500 hover:text-green-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-[320px] overflow-y-auto">
        {/* Table Content */}
        {renderTable()}
      </div>
    </div>
  );
};

export default function OverviewPanel() {
  return (
    <div className="space-y-4">
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <CardStats
            title="Total Sales"
            value="24,563.00 EGP"
            details="Lifetime earnings"
            icon="dollar"
            size="md"
          />
          <CardStats
            title="Total Taxes"
            value="24,563.00 EGP"
            details="Lifetime earnings"
            icon="dollar"
            size="md"
          />
          <CardStats
            title="Net Sales"
            value="24,563.00 EGP"
            details="Lifetime earnings"
            icon="dollar"
            size="md"
          />
          <CardStats
            title="Commission"
            value="5000 EGP"
            change="+15%"
            icon="ArrowUp"
            size="md"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-10">
        <div className="col-span-1 lg:col-span-6">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <GenericChart
              chartTitle="Sales Statistic"
              data={dummyChartSingleData}
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            {TopTabs()}
          </div>
        </div>
      </section>
      <section>
        <TransactionsTabs />
      </section>
    </div>
  );
}
