"use client";

import { ShoppingCart } from "lucide-react";
import QuantitySelector from "@/components/Forms/formFields/QuantitySelector";

const MobileCartNavbar = () => {
  // const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    // Add your cart logic here
    // console.log(`Added ${quantity} items to cart`);
    // You would typically call your cart context or API here
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 block border-t bg-white shadow-lg md:hidden">
      <div className="flex items-center justify-between p-4">
        {/* Quantity Selector */}
        <QuantitySelector buttonSize="md" productId={""} />{" "}
        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          className="ml-4 flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-xs font-medium text-white transition-colors hover:bg-green-800"
        >
          <ShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MobileCartNavbar;
