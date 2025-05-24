"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { products } from "@/constants/products";
import NotFound from "@/app/not-found";
import Image from "next/image";
import ProductImagesSlider from "@/components/UI/sliders/ProductImagesSlider";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";
import InfoCards from "@/components/UI/InfoCards";
import {
  Archive,
  ChevronRight,
  Handshake,
  Landmark,
  ListRestart,
  RefreshCcw,
  ShoppingBag,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import { ProgressLine } from "@/components/UI/ProgressLine";
import { ColorType, LiquidSizeType, NumericSizeType, SizeType } from "@/types";
import MobileCartNavbar from "@/components/Layout/NavbarMobile/MobileCartNavbar";
import QuantitySelector from "@/components/Forms/formFields/QuantitySelector";
import ProductReviews from "@/components/UI/ProductReviews";
import { reviews } from "@/constants/reviews";
import ProductsSlider from "@/components/UI/sliders/ProductsSlider";
import ProductCard from "@/components/UI/cards/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = React.use(params);
  const product = products.find((product) => product.id === slug);
  const [selectedSize, setSelectedSize] = useState<
    SizeType | NumericSizeType | LiquidSizeType | null
  >(null);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);

  useEffect(() => {
    // Set the initial size

    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }

    // Set the initial color
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product?.sizes, product?.colors]);

  // Auto-rotate nudges every 3 seconds
  const nudgeCount = product?.nudges ? product?.nudges?.length : 0;

  useEffect(() => {
    if (nudgeCount === 0) return;

    const interval = setInterval(() => {
      setCurrentNudgeIndex((prev) => (prev === nudgeCount - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [nudgeCount]);

  console.log(product);

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{product.name} | Medicova</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Navigation Breadcrumbs */}
      <nav className="bg-white px-4 py-2">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center space-x-1 py-2 text-xs text-gray-600 md:flex-nowrap md:gap-y-0 md:text-sm">
            <div className="flex items-center gap-2">
              <Link href="/" className="whitespace-nowrap hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-secondary" />
            </div>

            <div className="flex items-center gap-1">
              <Link
                href={product.category?.url ?? "#"}
                className="whitespace-nowrap hover:text-primary"
              >
                {product.category?.title}
              </Link>
              {(product.category?.subCategories?.length ?? 0) > 0 && (
                <ChevronRight className="h-3 w-3 text-secondary" />
              )}
            </div>

            {product.category?.subCategories?.map((subCategory, index) => {
              return (
                <div className="flex items-center gap-1" key={index}>
                  <Link
                    href={subCategory.url ?? "#"}
                    className="whitespace-nowrap hover:text-primary"
                  >
                    {subCategory.title}
                  </Link>
                  {!(product.category?.subCategories?.length === index + 1) && (
                    <ChevronRight className="h-3 w-3 text-secondary" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Product Section */}
      <main className="container mx-auto bg-white px-6 py-3 lg:max-w-[1440px]">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-10 md:gap-6">
          <div className="col-span-1 h-full bg-white md:col-span-5 lg:col-span-3">
            <div className="my-3 block md:hidden">
              <Link
                href={product.brand?.url ?? "#"}
                className="mb-3 text-xl font-semibold text-secondary"
              >
                {product.brand?.title}
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h1>
            </div>
            <div className="my-3 flex w-fit items-center gap-1 rounded-lg bg-gray-200 px-3 py-1 text-sm md:hidden">
              <span className="text-primary">★</span>
              {product.rating}
              <span className="text-[10px] text-gray-600">
                ({product.reviewCount?.toLocaleString()})
              </span>
            </div>
            {/* Product Images - Left Side */}
            <div className="sticky top-4 h-fit rounded-lg bg-white p-4">
              <ProductImagesSlider images={product.images} />
              <div className="mt-4 hidden gap-2 md:flex">
                <QuantitySelector buttonSize="md" className="flex-1" />
                <button className="flex w-full items-center justify-center gap-1 rounded-sm bg-green-600 text-xs font-semibold uppercase text-white shadow-sm transition hover:bg-green-700 md:text-sm">
                  <ShoppingCart size={15} />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          {/* Product Details - Right Side */}
          <div className="col-span-1 grid grid-cols-1 gap-3 md:col-span-5 lg:col-span-7 lg:grid-cols-7">
            <div className="col-span-1 lg:col-span-4">
              <div className="rounded-lg bg-white shadow-sm">
                <div className="hidden md:block">
                  <Link
                    href={product.brand?.url ?? "#"}
                    className="mb-3 text-xl font-semibold text-secondary"
                  >
                    {product.brand?.title}
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="mt-2 hidden w-full items-center justify-between md:flex">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating ?? 0) ? "text-primary" : "text-gray-300"} `}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 cursor-pointer text-xs text-blue-600 hover:underline">
                      {product.rating} ★ (
                      {product.reviewCount?.toLocaleString()} Ratings)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <button className="sh ml-4 rounded-lg bg-white text-sm font-medium text-blue-600"></button>
                    <DynamicButton
                      variant="white"
                      size="sm"
                      href={"#Variant"}
                      label={"Show Variants"}
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800">
                      EGP {product.price?.toLocaleString()}
                    </span>
                    {product.del_price && (
                      <>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          EGP {product.del_price.toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>
                  {product.del_price && (
                    <p className="flex items-center gap-2 text-xs">
                      Saving:{" "}
                      <span className="flex items-center gap-1 text-xs font-semibold text-light-primary">
                        EGP
                        <span className="text-sm">
                          {product.del_price - product.price}
                        </span>
                      </span>
                    </p>
                  )}
                  {product.stock && (
                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <ShoppingBag size={13} className="text-light-primary" />
                      Only {product.stock} left in stock
                    </div>
                  )}
                </div>
                {/* Nudges Slider - Fixed to match screenshot */}
                <div className="relative mt-1 h-6 overflow-hidden">
                  <div
                    className="flex flex-col transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateY(-${currentNudgeIndex * 24}px)`,
                    }}
                  >
                    {product.nudges?.map((nudge, index) => (
                      <div
                        key={index}
                        className="flex h-6 items-center text-xs text-gray-600"
                      >
                        {nudge}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery */}
                <div className="mt-4 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    {product.deliveryDate && (
                      <div className="flex items-center text-xs font-semibold">
                        <span className="rounded bg-light-primary px-2 py-1 text-white">
                          Express
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-bold text-gray-700">
                      Get it by {product.deliveryDate}
                    </span>
                  </div>
                </div>

                {/* Installment */}
                <div className="mt-4 rounded-lg border border-gray-300 p-3">
                  {product.installmentOptions?.map((option, index) => (
                    <div
                      className="flex items-center justify-between gap-3"
                      key={index}
                    >
                      <Image
                        src={option.methodType.image}
                        className="w-16 rounded-md object-cover"
                        width={300}
                        height={300}
                        alt={option.methodType.name}
                      />

                      <div className="mt-1 text-sm text-secondary">
                        {option.months} monthly payments of EGP{" "}
                        {option.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Skeleton */}
                <div>
                  <InfoCards />
                </div>

                {/* Variant Selection */}
                <div id="Variant" className="mt-6 space-y-4">
                  {/* Colors */}
                  {product.colors && (
                    <div>
                      <div className="font-medium">
                        COLOR GUIDE: {selectedColor}
                      </div>
                      <div className="mt-2 flex space-x-2">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`rounded border px-3 py-1 ${selectedColor === color ? "border-green-500 bg-green-50 text-green-600" : "border-gray-300"}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Sizes */}
                  {product.sizes && (
                    <div>
                      <div className="font-medium">
                        SIZE GUIDE: {selectedSize}
                      </div>
                      <div className="mt-2 flex space-x-2">
                        {product.sizes.map((size, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedSize(size)}
                            className={`rounded border px-3 py-1 ${selectedSize === size ? "border-green-500 bg-green-50 text-green-600" : "border-gray-300"}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Seller and banks information  */}
            <div className="col-span-1 lg:col-span-3">
              {/* Bank Offers */}
              <div className="my-6 rounded-lg">
                <div className="font-bold">BANK OFFERS</div>
                <ul className="mt-2 space-y-1">
                  {product.bankOffers?.map((offer, index) => (
                    <li key={index}>
                      <Link
                        href={offer.url}
                        className="flex items-center justify-between rounded-md border border-gray-300 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <Landmark size={22} className="text-primary" />
                          <span className="ml-2 text-xs">{offer.title}</span>
                        </div>
                        <ChevronRight className="text-secondary" size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Seller Information */}
              <h2 className="mb-2 font-bold">SELLER</h2>
              <div className="rounded-lg border border-gray-300 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <Link
                    href={"#"}
                    className="flex w-full items-center justify-between gap-3 border-b border-gray-300 p-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-primary">
                        <Store size={25} />
                      </span>
                      <div>
                        {product.sellers && (
                          <div className="mb-1">
                            Sold by{" "}
                            <span className="text-xs text-primary underline">
                              {product.sellers[0]?.name}
                            </span>
                          </div>
                        )}
                        {product.sellers && (
                          <div className="text-gray-600">
                            {product.sellers[0].positiveRatings} Positive
                            Ratings
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="text-secondary" size={15} />
                  </Link>
                </div>
                <Link
                  href={"#"}
                  className="mt-2 grid grid-cols-2 gap-3 p-3 text-sm"
                >
                  {product.sellers && (
                    <div className="flex items-center gap-3">
                      <Archive size={16} className="text-primary" />
                      <span className="ml-1 text-sm font-semibold">
                        Item as shown
                        <ProgressLine
                          progress={product.sellers[0].itemShown ?? 0}
                          height="h-1"
                          showLabel
                        />
                      </span>
                    </div>
                  )}

                  <div className="mt-1 flex items-center">
                    {product.sellers && (
                      <div className="flex items-center gap-3 text-sm font-semibold">
                        <Handshake size={16} className="text-primary" />
                        Partner since {product.sellers[0].partnerSince}
                      </div>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm font-semibold">
                    <ListRestart size={16} className="text-primary" />
                    Low return seller
                  </div>
                </Link>
              </div>
              <div className="mt-4 rounded-lg bg-white shadow-sm">
                <div className="rounded-lg border border-gray-300">
                  <div className="flex flex-col text-sm">
                    <Link
                      className="flex items-center justify-between border-b border-gray-300 p-3"
                      href={"#"}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <Truck size={16} className="text-primary" />
                        Free delivery on Lockers & Pickup Points
                      </div>
                      <ChevronRight className="text-secondary" size={15} />
                    </Link>
                    {product.sellers && (
                      <Link
                        className="flex items-center justify-between p-3"
                        href={"#"}
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <RefreshCcw size={16} className="text-primary" />
                          {product.sellers[0].returnPolicy}
                        </div>
                        <ChevronRight className="text-secondary" size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <h1 className="border-b border-gray-300 py-2 text-2xl font-bold text-gray-600">
            Product Overview
          </h1>
          {/* products highlights  */}
          {product.highlights && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">Hightlights</h2>
              <ul className="list-disc pl-4">
                {product.highlights?.map((highlight, index) => {
                  return (
                    <li className="text-sm" key={index}>
                      {highlight}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {/* products overview describtion  */}
          {product.overview_desc && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">OverView</h2>
              <p className="text-sm">{product.overview_desc}</p>
            </div>
          )}
          {/* products Specfications  */}
          {product.specifications && (
            <div className="mt-4 text-gray-600">
              <h2 className="mb-2 font-bold">Specfications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
                {product.specifications.map((spec, index) => {
                  return (
                    <div
                      className={`flex items-center p-2 text-xs md:text-sm ${
                        // On mobile
                        index % 2 === 0 ? "bg-gray-100" : ""
                      } ${
                        // On desktop
                        Math.floor(index / 2) % 2 === 0
                          ? "md:bg-gray-100"
                          : "md:bg-transparent"
                      }`}
                      key={index}
                    >
                      <div className="w-full">{spec.label}</div>
                      <div className="w-full">{spec.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="py-8">
          <h1 className="border-b border-gray-300 py-2 text-2xl font-bold text-gray-600">
            Product Ratings & Reviews
          </h1>
          <ProductReviews reviews={reviews} />
        </div>

        {/* Brand Products */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            More from {product.brand?.title}
          </h2>
          <ProductsSlider>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: "240px" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </ProductsSlider>
        </div>

        {/* Products related this Product */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            Products related to this
          </h2>
          <ProductsSlider>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: "240px" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </ProductsSlider>
        </div>

        <MobileCartNavbar />
      </main>
    </div>
  );
};

export default ProductPage;
