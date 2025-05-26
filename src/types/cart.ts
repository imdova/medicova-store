import { Brand, ColorType, LiquidSizeType, NumericSizeType, SizeType } from ".";
import { Seller } from "./product";

export type CartFormValues = {
  payment: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  saveInfo: boolean;
};

export interface CartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  del_price?: number;
  totalPrice: number;
  description: string;
  deliveryDate?: string;
  sellers?: Seller;
  shipping_fee: number;
  size?: SizeType | NumericSizeType | LiquidSizeType;
  color?: ColorType;
  quantity: number;
  brand?: Brand;
  stock?: number;
}

export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchaseAmount: number;
  maxDiscountAmount?: number; // Optional
};
