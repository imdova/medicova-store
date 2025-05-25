// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";
import { Seller } from "@/types/product";
import {
  Brand,
  ColorType,
  LiquidSizeType,
  NumericSizeType,
  SizeType,
} from "@/types";

interface CartState {
  products: CartItem[];
  totalPrice: number;
}

const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart
        ? JSON.parse(savedCart)
        : { products: [], totalPrice: 0 };
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return { products: [], totalPrice: 0 };
    }
  }
  return { products: [], totalPrice: 0 };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        id: string;
        image: string;
        title: string;
        price: number;
        del_price?: number;
        description: string;
        deliveryDate?: string;
        sellers?: Seller;
        shipping_fee: number;
        size?: SizeType | NumericSizeType | LiquidSizeType;
        color?: ColorType;
        quantity: number;
        brand?: Brand;
        stock?: number;
      }>,
    ) => {
      const {
        id,
        title,
        price,
        image,
        description,
        del_price,
        shipping_fee,
        size,
        color,
        quantity = 1,
        deliveryDate,
        brand,
        sellers,
        stock,
      } = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === id && item.size === size && item.color === color,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.products.push({
          id,
          title,
          price,
          image,
          description,
          quantity,
          totalPrice: price * quantity,
          shipping_fee,
          del_price,
          size,
          color,
          deliveryDate,
          brand,
          sellers,
          stock,
        });
      }

      state.totalPrice = state.products.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
    },

    increaseQuantity: (
      state,
      action: PayloadAction<{ id: string; amount?: number }>,
    ) => {
      const { id, amount = 1 } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += amount;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.totalPrice += existingItem.price * amount;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<{ id: string; amount?: number }>,
    ) => {
      const { id, amount = 1 } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > amount) {
          existingItem.quantity -= amount;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
          state.totalPrice -= existingItem.price * amount;
        } else {
          state.totalPrice -= existingItem.totalPrice;
          state.products = state.products.filter((item) => item.id !== id);
        }
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.totalPrice;
        state.products = state.products.filter((item) => item.id !== id);
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },

    // New action to replace the entire cart state
    setCart: (state, action: PayloadAction<CartState>) => {
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
