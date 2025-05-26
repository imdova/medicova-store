"use client";

import { ShoppingCart } from "lucide-react";
import QuantitySelector from "@/components/Forms/formFields/QuantitySelector";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, increaseQuantity } from "@/store/slices/cartSlice";
import { ColorType, LiquidSizeType, NumericSizeType, SizeType } from "@/types";

type MobileCartNavbarProps = {
  product: Product;
  selectedColor: ColorType | undefined;
  selectedSize: SizeType | NumericSizeType | LiquidSizeType | undefined;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
  loading: boolean;
};

const MobileCartNavbar: React.FC<MobileCartNavbarProps> = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  setQuantity,
  handleAddToCart,
  loading,
}) => {
  const dispatch = useAppDispatch();
  const { products: productData } = useAppSelector((state) => state.cart);
  const cartProduct = productData.find((item) => item.id === product?.id);
  const isInCart = productData.some((item) => item.id === product?.id);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, Math.min(value, product?.stock || 1));
    setQuantity(newQuantity);

    if (isInCart && cartProduct) {
      dispatch(
        increaseQuantity({
          id: product.id,
          amount: newQuantity - cartProduct.quantity,
        }),
      );
    }
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 block border-t bg-white shadow-lg md:hidden">
      <div className="flex items-center justify-between p-4">
        <QuantitySelector
          buttonSize="md"
          productId={product?.id ?? ""}
          min={1}
          max={product?.stock}
        />
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`ml-4 flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-medium text-white transition-colors ${
            loading ? "bg-green-400" : "hover:bg-green-800"
          }`}
        >
          {loading ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart size={15} />
              {isInCart ? "Update Cart" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileCartNavbar;
