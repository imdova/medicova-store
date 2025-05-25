"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // Import useAppDispatch
import { useEffect, useState } from "react";
import { removeItem, setCart } from "@/store/slices/cartSlice"; // Import CartState and setCart action
import Image from "next/image";
import { ChevronRight, Trash2, Truck } from "lucide-react";
import QuantitySelector from "@/components/Forms/formFields/QuantitySelector";
import Link from "next/link";
import CustomAlert from "@/components/UI/CustomAlert";

const availableCoupons = [
  {
    code: "SAVE20",
    discountType: "percentage",
    discountValue: 20,
    minPurchaseAmount: 0,
    maxDiscountAmount: 50,
  },
  {
    code: "FLAT10",
    discountType: "fixed",
    discountValue: 10,
    minPurchaseAmount: 50,
  },
  {
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minPurchaseAmount: 100,
  },
];

export default function CartPage() {
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const dispatch = useAppDispatch(); // Get the dispatch function
  const { products, totalPrice } = useAppSelector((state) => state.cart);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [isClient, setIsClient] = useState(false);

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

  const productsCount = products.length;

  // Calculate total shipping fee outside the JSX
  const totalShippingFee = products.reduce(
    (sum, item) => sum + (item.shipping_fee || 0),
    0,
  );

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

  if (!isClient) {
    // Optionally render a loading state or nothing on the server/initial client render
    return (
      <div className="container mx-auto h-screen px-6 py-3 lg:max-w-[1440px]">
        Loading cart...
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
            {products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              products.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 bg-white last:mb-0 last:border-0 last:pb-0"
                >
                  <div className="p-2">
                    <div className="flex gap-2 md:gap-4">
                      <div>
                        <Image
                          className="h-[160px] w-[120px] object-cover"
                          src={item.image ?? "/images/placeholder.jpg"}
                          width={300}
                          height={300}
                          alt={item.title}
                        />
                      </div>
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
                          {item.deliveryDate && (
                            <p className="whitespace-pre-line text-xs text-gray-600">
                              Get it{" "}
                              <span className="text-xs text-primary">
                                {item.deliveryDate}
                              </span>
                            </p>
                          )}
                          {item.deliveryDate && (
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
          <div className="sticky top-4 col-span-1 h-fit border border-gray-300 p-3 lg:col-span-3">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex w-full">
                  <input
                    type="text"
                    value={appliedCoupon}
                    onChange={(e) => setAppliedCoupon(e.target.value)}
                    className="w-full rounded-l border border-gray-300 px-3 py-2 text-sm outline-none"
                    placeholder="Enter coupon"
                  />
                  <button
                    onClick={applyCoupon}
                    className="rounded-r bg-primary px-3 py-1 text-sm text-white transition hover:bg-green-800"
                  >
                    APPLY
                  </button>
                </div>
              </div>
              {couponError && (
                <p className="mb-2 text-sm text-red-500">{couponError}</p>
              )}

              <Link
                href={"#"}
                className="flex cursor-pointer items-center justify-between rounded-md border bg-white p-2 text-sm text-primary"
              >
                <span>View Available Offers</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-secondary">
                  Subtotal ({productsCount} Item)
                </span>
                <span className="text-sm text-gray-700">
                  EGP {totalPrice.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-secondary">
                    Discount ({appliedCoupon.toUpperCase()})
                  </span>
                  <span className="text-sm text-primary">
                    - EGP {discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="mb-2 flex justify-between">
                <span className="text-sm text-secondary">Shipping Fee</span>
                <span
                  className={`text-xs ${totalShippingFee === 0 ? "text-primary" : ""}`}
                >
                  {totalShippingFee === 0
                    ? "FREE"
                    : `EGP ${totalShippingFee.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-sm text-gray-700">
                  Total{" "}
                  <span className="text-xs text-secondary">
                    (inclusive of VAT)
                  </span>
                </span>
                <span className="text-gray-700">
                  EGP {(totalPrice - discountAmount).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-700">
              <div>
                Monthly payment plans from EGP 500.{" "}
                <Link className="text-primary underline" href={"#"}>
                  View more details
                </Link>
              </div>
            </div>
            <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-bold text-white transition hover:bg-green-700">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
