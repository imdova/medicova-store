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
import { motion } from "framer-motion";
import {
  Archive,
  Check,
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, increaseQuantity, setCart } from "@/store/slices/cartSlice";
import CustomAlert from "@/components/UI/CustomAlert";
import { Drawer } from "@/components/UI/Drawer";
import LoadingAnimation from "@/components/UI/LoadingAnimation";
import { getExecuteDateFormatted } from "@/util";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/Modals/DynamicModal";
import AuthLogin from "@/components/UI/Modals/loginAuth";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = React.use(params);
  const product = products.find((product) => product.id === slug);
  const session = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<
    SizeType | NumericSizeType | LiquidSizeType | undefined
  >();
  const [selectedColor, setSelectedColor] = useState<ColorType | undefined>();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { products: productData, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const cartProduct = productData.find((item) => item.id === product?.id);
  // Check if product is in cart
  const isInCart = productData.some((item) => item.id === product?.id);

  const [isClient, setIsClient] = useState(false);

  const onCheckout = () => {
    if (session.data?.user) {
      router.push("/checkout");
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    setIsClient(true);

    // Load cart from localStorage only on the client
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          // Dispatch the setCart action to update the Redux store
          dispatch(setCart(JSON.parse(savedCart)));
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, [dispatch]); // Add dispatch to dependency array

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

  useEffect(() => {
    if (cartProduct) {
      setQuantity(cartProduct.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartProduct?.quantity]);

  const handleAddToCart = async () => {
    setLoading(true);

    // Simulate delay for loader effect (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!product?.id) {
      showAlert("Product information is missing", "error");
      setLoading(false);
      return;
    }

    if (!isInCart) {
      // Add new item to cart
      dispatch(
        addItem({
          id: product.id,
          title: product.title ?? "",
          image: product.images?.[0] ?? "/images/placeholder.jpg",
          description: product.description ?? "No description available",
          del_price: product.del_price,
          price: product.price ?? 0,
          shipping_fee: product.shipping_fee ?? 0,
          quantity: Math.min(quantity, product.stock ?? 1), // Ensure we don't exceed stock
          brand: product.brand,
          deliveryTime: product.deliveryTime,
          sellers: product.sellers,
          stock: product.stock,
          color: selectedColor,
          size: selectedSize,
          shippingMethod: product.shippingMethod,
          weightKg: product.weightKg,
        }),
      );
      showAlert("Added to cart", "success");
    } else {
      // Product is already in cart - handle quantity increase
      const currentCartItem = productData.find(
        (item) => item.id === product.id,
      );
      const currentQuantity = currentCartItem?.quantity ?? 0;
      const availableStock = product.stock ?? 0;
      const requestedTotal = currentQuantity + quantity;

      if (requestedTotal > availableStock) {
        const canAdd = availableStock - currentQuantity;
        if (canAdd > 0) {
          dispatch(
            increaseQuantity({
              id: product.id,
              amount: canAdd,
            }),
          );
          showAlert(
            `Only ${canAdd} more available. Added to your existing quantity.`,
            "info",
          );
        } else {
          showAlert("No more items available in stock", "error");
        }
      } else {
        dispatch(
          increaseQuantity({
            id: product.id,
            amount: quantity,
          }),
        );
        showAlert(`Added ${quantity} more to your cart`, "success");
      }
    }

    setLoading(false);
    setIsOpen(true);
  };

  // Show Alert Function
  const showAlert = (message: string, type: "success" | "error" | "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3 seconds
  };

  if (!isClient) {
    return <LoadingAnimation />;
  }

  if (!product) return <NotFound />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Alert Display */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

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
                href={product.category?.slug ?? "#"}
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
      <Drawer
        hiddenCloseBtn
        position="right"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ul className="max-h-[500px] max-w-[270px] overflow-y-auto">
          {productData.map((item) => {
            return (
              <li className="mb-2" key={item.id}>
                <Link href={`/product-details/${item.id}`}>
                  <div className="flex h-[100px] gap-2">
                    <div>
                      <Image
                        className="h-full w-[80px] object-cover"
                        src={item.image}
                        width={300}
                        height={300}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-2 text-sm font-semibold">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-1 text-xs">
                        Added to cart{" "}
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-primary text-white">
                          <Check size={10} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex justify-between gap-2 font-semibold text-gray-700">
          <span className="text-sm">Cart Total</span>
          <p className="text-sm">EGP {totalPrice}</p>
        </div>
        <div>
          <button
            onClick={onCheckout}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase text-white transition hover:bg-green-700"
          >
            CHECKOUT
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase text-primary"
          >
            Continue Shopping
          </button>
        </div>
      </Drawer>
      {/* Main Product Section */}
      <main className="container mx-auto bg-white p-3 lg:max-w-[1440px]">
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
                <QuantitySelector
                  productId={cartProduct?.id ?? ""}
                  initialQuantity={cartProduct?.quantity}
                  min={1}
                  max={cartProduct?.stock}
                  buttonSize="md"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  disabled={loading}
                  onClick={handleAddToCart}
                  className={`flex w-full items-center justify-center gap-2 rounded-sm ${
                    loading
                      ? "cursor-not-allowed bg-green-400"
                      : "bg-green-600 hover:bg-green-700"
                  } px-4 py-2 text-sm font-semibold uppercase text-white transition-all duration-300`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add To Cart
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
          {/* Product Details - Right Side */}
          <div className="col-span-1 grid grid-cols-1 gap-3 md:col-span-5 lg:col-span-7 lg:grid-cols-7">
            <div className="col-span-1 lg:col-span-4">
              <div className="bg-white">
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
                    {product.deliveryTime && (
                      <div className="flex items-center text-xs font-semibold">
                        <span className="rounded bg-light-primary px-2 py-1 text-white">
                          Express
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-bold text-gray-700">
                      Get it by {product.deliveryTime} (
                      {getExecuteDateFormatted(
                        product.deliveryTime ?? "",
                        "EEE, MMM d",
                      )}
                      )
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
                      <div className="font-medium">COLOR GUIDE:</div>
                      <div className="mt-2 flex space-x-2">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            style={{ background: color }}
                            onClick={() => setSelectedColor(color)}
                            className={`h-8 w-8 rounded-full border-2 border-white outline ${selectedColor === color ? "outline-1 outline-gray-800" : "outline-1 outline-gray-200"}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Sizes */}
                  {product.sizes && (
                    <div>
                      <div className="font-medium">SIZE GUIDE:</div>
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
                              {product.sellers?.name}
                            </span>
                          </div>
                        )}
                        {product.sellers && (
                          <div className="text-gray-600">
                            {product.sellers.positiveRatings} Positive Ratings
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
                          progress={product.sellers.itemShown ?? 0}
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
                        Partner since {product.sellers.partnerSince}
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
                          {product.sellers.returnPolicy}
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
        <div className="mt-6 rounded-lg bg-white shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            More from {product.brand?.title}
          </h2>
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
        {/* Products related this Product */}
        <div className="mt-6 rounded-lg bg-white shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            Products related to this
          </h2>
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
        <MobileCartNavbar
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          loading={loading}
        />
        <div className="relative z-[5000]">
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="lg"
          >
            <AuthLogin redirect="/checkout" />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
