import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { calculateShippingFee } from "@/util";
import { CartItem } from "@/types/cart";
import { DestinationKey } from "@/types";

interface OrderSummaryProps {
  appliedCoupon: string | null;
  setAppliedCoupon: (value: string) => void;
  applyCoupon: () => void;
  couponError: string;
  productsCount: number;
  totalPrice: number;
  discountAmount: number;
  onCheckout: () => void;
  productCart: CartItem[];
  destinationCountry?: DestinationKey;
}

type ShippingMethod = "standard" | "express" | "free";

const OrderSummary = ({
  appliedCoupon,
  setAppliedCoupon,
  applyCoupon,
  couponError,
  productsCount,
  totalPrice,
  discountAmount,
  onCheckout,
  productCart,
  destinationCountry = "EG",
}: OrderSummaryProps) => {
  console.log(destinationCountry);
  // Calculate shipping fee for each product individually
  const productShippingFees = productCart.map((item) => {
    const shippingMethod =
      (item.shippingMethod?.toLowerCase() as ShippingMethod) || "standard";
    const itemWeight = item.weightKg && item.weightKg > 0 ? item.weightKg : 1;
    const itemPrice = item.price && item.price > 0 ? item.price : 0;

    const feeInput = {
      shippingMethod,
      destination: destinationCountry,
      cartTotal: itemPrice * item.quantity,
      weightKg: itemWeight * item.quantity,
    };

    return {
      productId: item.id,
      shippingMethod,
      fee: calculateShippingFee(feeInput),
      quantity: item.quantity,
    };
  });

  // Group shipping fees by method for display
  const shippingGroups = productShippingFees.reduce(
    (groups, item) => {
      if (!groups[item.shippingMethod]) {
        groups[item.shippingMethod] = {
          fee: 0,
          count: 0,
        };
      }
      groups[item.shippingMethod].fee += item.fee;
      groups[item.shippingMethod].count += item.quantity;
      return groups;
    },
    {} as Record<ShippingMethod, { fee: number; count: number }>,
  );

  // Calculate total shipping fee
  const totalShippingFee = productShippingFees.reduce(
    (total, item) => total + item.fee,
    0,
  );

  return (
    <div className="sticky top-4 col-span-1 h-fit border border-gray-300 p-3 lg:col-span-3">
      <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
      {/* Coupon section */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex w-full">
            <input
              type="text"
              value={appliedCoupon ?? ""}
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

      {/* Order breakdown */}
      <div className="border-t border-gray-200 pt-4">
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-secondary">
            Subtotal ({productsCount} Item{productsCount !== 1 ? "s" : ""})
          </span>
          <span className="text-sm text-gray-700">
            EGP {totalPrice.toFixed(2)}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-secondary">
              Discount ({appliedCoupon?.toUpperCase()})
            </span>
            <span className="text-sm text-primary">
              - EGP {discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Shipping fees section */}
        {Object.entries(shippingGroups).length > 0 && (
          <div className="mb-2">
            {Object.entries(shippingGroups).map(([method, group], i) => (
              <div key={i} className="flex justify-between">
                <span className="text-sm text-secondary">
                  {method.charAt(0).toUpperCase() + method.slice(1)} Shipping
                  {group.count > 1 && ` (${group.count} items)`}
                </span>
                <span className="text-sm font-bold">
                  EGP {group.fee.toFixed(2)}
                </span>
              </div>
            ))}

            <div className="mt-2 flex justify-between">
              <span className="text-sm font-bold text-secondary">
                Total Shipping
              </span>
              <span className="text-sm font-bold">
                EGP {totalShippingFee.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Order total */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-sm text-gray-700">
            Total{" "}
            <span className="text-xs text-secondary">(inclusive of VAT)</span>
          </span>
          <span className="text-gray-700">
            EGP {(totalPrice - discountAmount + totalShippingFee).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment plans */}
      <div className="mt-4 text-xs text-gray-700">
        <div>
          Monthly payment plans from EGP 500.{" "}
          <Link className="text-primary underline" href={"#"}>
            View more details
          </Link>
        </div>
      </div>

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-bold text-white transition hover:bg-green-700"
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default OrderSummary;
