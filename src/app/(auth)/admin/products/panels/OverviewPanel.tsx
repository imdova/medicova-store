import { CardStats } from "@/components/UI/cards/CardStats";
import GenericChart from "@/components/UI/charts/GenericChart";
import { dummyCards, dummyChartData } from "@/constants/sellerDashboardMock";
import TopProducts from "../../components/TopProducts";
import { products } from "@/constants/products";
import ProductCard from "@/components/UI/cards/ProductCard";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Pagination } from "@/components/UI/Pagination";
import { RecentProductCard } from "@/components/UI/cards/RecentProductCard";

export default function OverviewPanel() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 6;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage]);
  return (
    <div className="space-y-4">
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <CardStats
            title="Total Products"
            value="1,245"
            change="+12.5%"
            icon="package"
            color="#429fe6"
            size="sm"
          />
          <CardStats
            title="Total Orders"
            value="156"
            change="+8.2%"
            icon="shoppingCart"
            color="#429fe6"
            size="sm"
          />
          <CardStats
            title="Total Revenue"
            value="$12,450"
            change="+8%"
            icon="dollar"
            size="sm"
          />
          <CardStats
            title="Total Views"
            value="5,678"
            change="+15%"
            icon="eye"
            color="#625df5"
            size="sm"
          />
          <CardStats
            title="Total Commission"
            value="78%"
            change="+3%"
            icon="award"
            color="#625df5"
            size="sm"
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-9">
        <div className="col-span-1 lg:col-span-6">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <GenericChart
              chartTitle="Sales Overview"
              data={dummyChartData}
              showCards={true}
              cards={dummyCards}
            />
          </div>
          <div>
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <h2 className="font-semibold">Recent Products</h2>
              <div className="mb-3 flex gap-3">
                <span className="rounded-md bg-[#625df520] px-2 py-1 text-xs font-semibold text-[#625df5]">
                  1,210 Orders sold
                </span>
                <span className="rounded-md bg-[#15803c24] px-2 py-1 text-xs font-semibold text-[#15803d]">
                  $42,350.0 Net sales
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
              {paginatedProducts.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })}
            </div>
            {/* Pagination */}
            <Pagination
              totalItems={products.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <TopProducts />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-bold">Recent Products</h2>
            <div className="max-h-[700px] space-y-3 overflow-y-auto">
              {products.map((product) => {
                return <RecentProductCard key={product.id} product={product} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
