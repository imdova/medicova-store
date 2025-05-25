"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import QuantitySelectorRemove from "@/components/Forms/formFields/QuantitySelectorwithRemove";

interface CartButtonProps {
  isInCart: boolean;
  quantity: number;
  addToCart: (e: React.MouseEvent) => void;
  handleQuantityChange: (newQuantity: number) => void;
}

const CartButton = ({
  isInCart,
  quantity,
  addToCart,
  handleQuantityChange,
}: CartButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-medium text-gray-700">
        <ShoppingCart size={16} />
      </button>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isInCart ? (
        isHover ? (
          <div className="absolute bottom-2 right-2">
            <QuantitySelectorRemove
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        ) : (
          <button
            onClick={addToCart}
            className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition duration-150 ${
              isInCart
                ? "bg-light-primary text-white"
                : "bg-white text-gray-700 hover:bg-light-primary hover:text-white"
            }`}
          >
            {quantity > 0 && (
              <span className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center rounded-full bg-white text-[9px] text-light-primary">
                {quantity}
              </span>
            )}
            <ShoppingCart size={16} />
          </button>
        )
      ) : (
        <button
          onClick={addToCart}
          className={`absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition duration-150 ${
            isInCart
              ? "bg-light-primary text-white"
              : "bg-white text-gray-700 hover:bg-light-primary hover:text-white"
          }`}
        >
          <ShoppingCart size={16} />
        </button>
      )}
    </div>
  );
};

export default CartButton;
