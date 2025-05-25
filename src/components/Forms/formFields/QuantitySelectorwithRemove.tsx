"use client";
import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";

type QuantitySelectorProps = {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

const QuantitySelectorRemove = ({
  initialQuantity = 1,
  onQuantityChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleDecrementOrDelete = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    } else {
      setQuantity(0);
      onQuantityChange?.(0);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-lg bg-light-primary px-3 py-1 text-white">
      <button onClick={handleDecrementOrDelete}>
        {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
      </button>
      <span className="text-sm">{quantity}</span>
      <button onClick={handleIncrement}>
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelectorRemove;
