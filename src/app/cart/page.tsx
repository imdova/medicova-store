"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Import useAppDispatch
import { useEffect, useState } from "react";
import { removeItem, setCart } from "@/store/slices/cartSlice"; // Import CartState and setCart action
import Image from "next/image";
import { Trash2, Truck } from "lucide-react";
import QuantitySelector from "@/components/Forms/formFields/QuantitySelector";
import CustomAlert from "@/components/UI/CustomAlert";
import OrderSummary from "./components/OrderSummary";
import { availableCoupons } from "@/constants/coupons";
import LoadingAnimation from "@/components/UI/LoadingAnimation";
import Link from "next/link";
import ProductsSlider from "@/components/UI/sliders/ProductsSlider";
import { products } from "@/constants/products";
import ProductCard from "@/components/UI/cards/ProductCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/Modals/DynamicModal";
import AuthLogin from "@/components/UI/Modals/loginAuth";
import { getExecuteDateFormatted } from "@/util";

export default function CartPage() {
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const dispatch = useAppDispatch(); // Get the dispatch function
  const session = useSession(); // Get the dispatch function
  const router = useRouter(); // Get the dispatch function
  const { products: productsData, totalPrice } = useAppSelector(
    (state) => state.cart,
  );
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const productsCount = productsData.length;

  const applyCoupon = () => {
    setCouponError(null);

    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === appliedCoupon.toUpperCase(),
    );

    if (!coupon) {
      setCouponError("Invalid coupon code.");
      setDiscountAmount(0);
      return;
    }

    if (totalPrice < coupon.minPurchaseAmount) {
      setCouponError(
        `Minimum purchase of EGP ${coupon.minPurchaseAmount} required to use this coupon.`,
      );
      setDiscountAmount(0);
      return;
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (totalPrice * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
      }
    } else if (coupon.discountType === "fixed") {
      discount = coupon.discountValue;
    }

    setDiscountAmount(discount);
    showAlert(
      `Coupon ${coupon.code} applied! You saved EGP ${discount.toFixed(2)}.`,
      "success",
    );
  };

  const handdleRemove = (id: string) => {
    dispatch(removeItem(id));
    showAlert("Deleted From Cart", "error");
  };
  // Show Alert Function
  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3 seconds
  };

  const onCheckout = () => {
    if (session.data?.user) {
      router.push("/checkout");
    } else {
      setIsModalOpen(true);
    }
  };

  const getAddress = () => {
    if (typeof window === "undefined") {
      // Server-side: localStorage is not available
      return null;
    }

    const userAddressString = localStorage.getItem("userAddress");
    const savedAddressesString = localStorage.getItem("savedAddresses");

    try {
      if (userAddressString) {
        const data = JSON.parse(userAddressString);
        return data.country_code;
      } else if (savedAddressesString) {
        const data = JSON.parse(savedAddressesString);
        return data[0].country_code;
      } else {
        console.warn("No address found in localStorage");
        return null; // Or return a default object
      }
    } catch (error) {
      console.error("Failed to parse address from localStorage:", error);
      return null;
    }
  };

  console.log(getAddress());

  if (!isClient) {
    return <LoadingAnimation />;
  }

  if (!productsData.length) {
    return (
      <div className="container mx-auto px-6 py-3 lg:max-w-[1440px]">
        {/* Items you previously viewed */}
        <div className="mt-6 rounded-lg bg-white shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            Items you previously viewed
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

        {/* Bestsellers for you */}
        <div className="mt-6 rounded-lg bg-white shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-600">
            Bestsellers for you
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
      </div>
    );
  }

  return (
    <>
      {/* Global Alert Display */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="container mx-auto px-6 py-3 lg:max-w-[1440px]">
        <h1 className="mb-6 text-2xl font-bold">
          Cart{" "}
          <span className="text-sm text-secondary">({productsCount} item)</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-8">
          {/* Cart Items */}
          <div className="col-span-1 lg:col-span-5">
            {productsData.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              productsData.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 bg-white last:mb-0 last:border-0 last:pb-0"
                >
                  <div className="p-2">
                    <div className="flex gap-2 md:gap-4">
                      <Link href={`/product-details/${item.id}`}>
                        <Image
                          className="h-[160px] w-[120px] object-cover"
                          src={item.image ?? "/images/placeholder.jpg"}
                          width={300}
                          height={300}
                          alt={item.title}
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                          <div>
                            <span className="text-xs text-secondary">
                              {item.brand?.title}
                            </span>
                            <h2 className="text-sm font-semibold text-gray-700">
                              {item.title}
                            </h2>
                          </div>
                          <div>
                            <p className="text-md mt-2 font-bold">
                              EGP {item.price}
                            </p>

                            <div className="flex items-center gap-2">
                              <span className="ml-2 text-xs text-gray-500 line-through">
                                EGP {item.del_price?.toLocaleString()}
                              </span>
                              <span className="text-xs font-semibold text-primary">
                                {item.del_price
                                  ? `${((item.price / item.del_price) * 100).toFixed(0)}% OFF`
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="my-2 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                          {item.deliveryTime && (
                            <p className="whitespace-pre-line text-xs text-gray-600">
                              Get it{" "}
                              <span className="text-xs text-primary">
                                {getExecuteDateFormatted(
                                  item.deliveryTime ?? "",
                                  "EEE, MMM d",
                                )}
                              </span>
                            </p>
                          )}
                          {item.deliveryTime && (
                            <div className="flex items-center text-xs font-semibold">
                              <span className="rounded bg-light-primary px-2 py-1 text-white">
                                Express
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck size={17} className="text-primary" />
                          <span className="text-xs font-semibold">
                            {item.shipping_fee > 0
                              ? `${item.shipping_fee} EGP For Delivery`
                              : "Free Delivery"}
                          </span>
                        </div>

                        {/* Assuming CartItem has a 'brand' property */}
                        <p className="mt-2 text-xs">
                          Sold by{" "}
                          <span className="text-xs font-semibold">
                            {item.sellers?.name}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <QuantitySelector
                        productId={item.id}
                        initialQuantity={item.quantity}
                        min={1}
                        max={item.stock}
                        buttonSize="md"
                      />
                      <button
                        onClick={() => handdleRemove(item.id)}
                        className="flex items-center gap-2 rounded-sm border border-gray-300 px-4 py-2 text-xs text-gray-700"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Order Summary */}
          <OrderSummary
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            applyCoupon={applyCoupon}
            couponError={couponError ?? ""}
            productsCount={productsCount}
            totalPrice={totalPrice}
            discountAmount={discountAmount}
            onCheckout={onCheckout}
            productCart={productsData}
            destinationCountry={getAddress()}
          />
        </div>
      </div>

      <div className="relative z-[1000]">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="lg"
        >
          <AuthLogin redirect="/checkout" />
        </Modal>
      </div>
    </>
  );
}
