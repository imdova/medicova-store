"use client";
import LandingSlider from "@/components/UI/sliders/LandingSlider";
import CategorySlider from "@/components/UI/sliders/CategorySlider";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/UI/headings/SectionHeader";
import ProductCard from "@/components/UI/cards/ProductCard";
import { products } from "@/constants/products";
import { Banner } from "@/components/UI/Banner";
import ProductsSlider from "@/components/UI/sliders/ProductsSlider";
import BrandSlider from "@/components/UI/sliders/BrandSlider";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";
import CategoryCard from "@/components/UI/cards/CategoryCard";
import {
  consumableCategories,
  equipmentCategories,
  lifestyleCategories,
} from "@/constants/categouries";
import PopularSearches from "@/components/UI/PopularSearches";
import { slides } from "@/constants/sliders";

const MoreReasons = [
  {
    id: "1",
    title: "Local finds",
    details: "Hand-picked brands, locally",
    image: "/images/clothes.jpg",
    url: "#",
  },
  {
    id: "2",
    title: "Bestsellers",
    details: "Fill your basket",
    image: "/images/electronics.avif",
    url: "#",
  },
  {
    id: "3",
    title: "Top-rated Products",
    details: "Stay in trend",
    image: "/images/watchss.jpg",
    url: "#",
  },
  {
    id: "4",
    title: "New arrivals",
    details: "Fresh takes you need",
    image: "/images/medical.jpg",
    url: "#",
  },
];
const megaDeals = [
  {
    category: "Fashion deals",
    title: "summer outfits",
    discountText: "Up to 70% off",
    imageUrl: "/images/clothes.jpg",
    price: null,
    originalPrice: null,
    url: "#",
  },
  {
    category: "Accessories deals",
    title: "Anker 5000 mAh Anker 621 Magnetic Battery (MagGo)...",
    discountText: "899 EGP",
    imageUrl: "/images/clothes.jpg",
    price: "899 EGP",
    originalPrice: "1799 EGP",
    url: "#",
  },
  {
    category: "Beauty deals",
    title: "Trending perfumes",
    discountText: "Starting from 108...",
    imageUrl: "/images/clothes.jpg",
    price: "108 EGP",
    originalPrice: null,
    url: "#",
  },
  {
    category: "Book deals",
    title: "Top deals",
    discountText: "Up to 20% off",
    imageUrl: "/images/clothes.jpg",
    price: null,
    originalPrice: null,
    url: "#",
  },
];
const inFocus = [
  {
    id: "1",
    imageUrl: "/images/focus-1.avif",
    url: "#",
  },
  {
    id: "2",
    imageUrl: "/images/focus-2.avif",
    url: "#",
  },
];

export default function Home() {
  return (
    <div className="relative">
      <section>
        {/* slider landing content  */}
        <LandingSlider slides={slides} />
        {/* slider Categories content  */}
        <CategorySlider />
      </section>
      <section className="hidden pb-8 xl:block">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-gray-700">
                More reasons to shop
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {MoreReasons.map((reason) => (
                  <Link
                    href={reason.url}
                    className="overflow-hidden rounded-xl bg-gray-100"
                    key={reason.id}
                  >
                    <Image
                      className="h-[140px] w-full object-cover"
                      src={reason.image}
                      width={600}
                      height={600}
                      alt={reason.title}
                    />
                    <div className="p-2">
                      <h2 className="font-semibold">{reason.title}</h2>
                      <p className="text-xs font-medium text-secondary">
                        {reason.details}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-[#a8dabab1] p-4">
              <h2 className="mb-3 text-xl font-bold text-gray-700">
                Mega deals
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {megaDeals.map((deal, index) => (
                  <Link
                    href={deal.url}
                    key={index}
                    className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm"
                  >
                    <div className="absolute right-0 top-0 mb-2 w-fit rounded-sm bg-yellow-400 px-2 py-1 text-sm font-semibold text-black">
                      {deal.category}
                    </div>
                    <Image
                      src={deal.imageUrl}
                      alt={deal.title}
                      width={600}
                      height={600}
                      className="h-[140px] w-full object-cover"
                    />
                    <div className="p-2">
                      <p className="truncate text-sm text-gray-700">
                        {deal.title}
                      </p>
                      <p className="text-lg font-semibold">
                        {deal.originalPrice && (
                          <span className="mr-2 text-sm text-gray-400 line-through">
                            {deal.originalPrice}
                          </span>
                        )}
                        <span className="text-sm">
                          {deal.price ?? deal.discountText}
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-gray-700">In focus</h2>
              <div className="flex flex-col space-y-4">
                {inFocus.map((focus) => (
                  <Link
                    href={focus.url}
                    key={focus.id}
                    className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm"
                  >
                    <Image
                      src={focus.imageUrl}
                      alt={`${focus.id}-focus`}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* recommended for you section  */}
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <SectionHeader blackText="Recommended" greenText="for you" />
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
          <div className="mt-6">
            <Banner image="/images/banner-6.jpg" url="#" />
          </div>
        </div>
      </section>
      {/* Brands section  */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <SectionHeader
            blackText="Explore"
            greenText="official brands stores"
          />
          <BrandSlider />
        </div>
      </section>
      {/* Consumable Category  */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold sm:text-2xl">Consumable</h2>
            <DynamicButton
              size="sm"
              variant="outline"
              href={"#"}
              label={"Shop All"}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-6">
            {consumableCategories.slice(0, 6).map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold sm:text-2xl">
                Consumable bestsellers
              </h2>
              <DynamicButton
                size="sm"
                variant="outline"
                href={"#"}
                label={"Shop Now"}
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
        </div>
      </section>
      {/* life style Category  */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold sm:text-2xl">Life Style</h2>
            <DynamicButton
              size="sm"
              variant="outline"
              href={"#"}
              label={"Shop All"}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-6">
            {lifestyleCategories.slice(0, 6).map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold sm:text-2xl">
                Life Style bestsellers
              </h2>
              <DynamicButton
                size="sm"
                variant="outline"
                href={"#"}
                label={"Shop Now"}
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
            <div className="mt-6">
              <Banner image="/images/banner-7.avif" url="#" />
            </div>
          </div>
        </div>
      </section>
      {/* equipment Category  */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold sm:text-2xl">Equipment</h2>
            <DynamicButton
              size="sm"
              variant="outline"
              href={"#"}
              label={"Shop All"}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-6">
            {equipmentCategories.slice(0, 6).map((category) => {
              return <CategoryCard key={category.id} category={category} />;
            })}
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold sm:text-2xl">
                Equipment bestsellers
              </h2>
              <DynamicButton
                size="sm"
                variant="outline"
                href={"#"}
                label={"Shop Now"}
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
        </div>
      </section>
      <section className="bg-white">
        <div className="container mx-auto px-6 lg:max-w-[1440px]">
          <PopularSearches />
        </div>
      </section>
    </div>
  );
}
