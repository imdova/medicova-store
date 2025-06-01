"use client";
import { Pagination } from "@/components/Pagination";
import { Banner } from "@/components/UI/Banner";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";
import ProductCard from "@/components/UI/cards/ProductCard";
import DynamicOffers from "@/components/UI/DynamicOffers";
import CategorySlider from "@/components/UI/sliders/CategorySlider";
import ProductsSlider from "@/components/UI/sliders/ProductsSlider";
import { products } from "@/constants/products";
import { useGetProductsByCategory } from "@/hooks/useGetProductsByCategory";
import { MultiCategory, Offer } from "@/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface RenderComponentProps {
  category: MultiCategory;
}

const offers: Offer[] = [
  {
    id: "1",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Lighting & Tables",
  },
  {
    id: "2",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Vases & Dried Grass",
  },
  {
    id: "3",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Plants & Bathroom Accessories",
  },
  {
    id: "4",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Relaxscent Candles",
  },
  {
    id: "5",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Kitchen Storage & Mugs",
  },
  {
    id: "6",
    imgUrl:
      "https://f.nooncdn.com/mpcms/EN0003/assets/5a62d1b8-b3d5-4018-abca-86913ca9b7dd.png",
    url: "#",
    title: "Home Essentials",
  },
];

export default function RenderComponent({ category }: RenderComponentProps) {
  const searchParams = useSearchParams();

  const categorySlugParam = searchParams.get("categorySlug");
  const slug = categorySlugParam ?? undefined; // Ensure it’s string | undefined

  // Get current page from URL or default to 1
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;
  const itemsPerPage = 12;

  const { productsData, totalProducts } = useGetProductsByCategory({
    categorySlug: slug,
    page: currentPage,
    limit: itemsPerPage,
  });

  const isSingleCategory =
    !category.subCategories || category.subCategories.length === 0;
  return (
    <>
      <div className="mb-4 h-[90px] w-full sm:h-[100px] md:h-[180px] lg:h-[270px]">
        {/* cover Category  */}
        <Image
          src={category.cover ?? "/images/placeholder.jpg"}
          width={600}
          height={600}
          className="h-full w-full select-none object-cover"
          alt={`${category.title} Cover`}
        />
      </div>
      <div className="container mx-auto px-6 lg:max-w-[1440px]">
        {category.subCategories && (
          <CategorySlider
            path={`${category.slug}`}
            cardSize="large"
            inCategory
            categories={category.subCategories}
          />
        )}

        <div className="my-4">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold sm:text-2xl">
              Shop your favorite {category.title}
            </h2>
            <DynamicButton
              size="sm"
              variant="outline"
              href="#"
              label="Shop Now"
            />
          </div>
          <ProductsSlider>
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[200px] flex-shrink-0 md:w-[240px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </ProductsSlider>
        </div>
        <div className="my-6">
          <Banner
            image={category.banner?.image ?? "/images/placeholder.jpg"}
            url={category.banner?.url ?? "#"}
          />
        </div>
        {offers && <DynamicOffers offers={offers} category={category} />}
        <div>
          {category.subCategories &&
            category.subCategories.map((category) => {
              return (
                <div key={category.id} className="my-4">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold sm:text-2xl">
                      {category.title}
                    </h2>
                    <DynamicButton
                      size="sm"
                      variant="outline"
                      href="#"
                      label="Shop Now"
                    />
                  </div>
                  <ProductsSlider>
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="w-[200px] flex-shrink-0 md:w-[240px]"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </ProductsSlider>
                </div>
              );
            })}
        </div>
        {isSingleCategory && (
          <div className="my-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold uppercase sm:text-2xl">
                Shop all in {category.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {productsData.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {/* Add Pagination */}
            <Pagination
              totalItems={totalProducts}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
