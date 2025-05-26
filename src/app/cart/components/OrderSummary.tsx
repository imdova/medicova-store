import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface OrderSummaryProps {
  appliedCoupon: string | null;
  setAppliedCoupon: (value: string) => void;
  applyCoupon: () => void;
  couponError: string;
  productsCount: number;
  totalPrice: number;
  discountAmount: number;
  totalShippingFee: number;
  onCheckout: () => void;
}

const OrderSummary = ({
  appliedCoupon,
  setAppliedCoupon,
  applyCoupon,
  couponError,
  productsCount,
  totalPrice,
  discountAmount,
  totalShippingFee,
  onCheckout,
}: OrderSummaryProps) => {
  return (
    <div className="sticky top-4 col-span-1 h-fit border border-gray-300 p-3 lg:col-span-3">
      <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
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
            <span className="text-xs text-secondary">(inclusive of VAT)</span>
          </span>
          <span className="text-gray-700">
            EGP {(totalPrice - discountAmount + totalShippingFee).toFixed(2)}
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
