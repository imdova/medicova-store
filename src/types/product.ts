import { Brand, ColorType, LiquidSizeType, NumericSizeType, SizeType } from ".";

export type Seller = {
  id: string;
  name: string;
  rating: number;
  positiveRatings?: string;
  itemShown?: number;
  partnerSince?: string;
  returnPolicy?: string;
};

export type methodType = {
  id: string;
  name: string;
  price: number;
  image: string;
};
// Type definition
export type Review = {
  id: string;
  rating: number;
  content: string;
  author: {
    id: string;
    name: string;
    imgUrl: string;
  };
  date: string;
};

export type shippingMethod = "standard" | "express" | "free";
interface CategoryType {
  id: string;
  slug?: string;
  url?: string;
  title: string;
  image: string;
  isSale?: boolean;
  subCategories?: { title: string; url?: string }[]; // url optional here
}
interface MultiCategory extends CategoryType {
  subCategories?: { title: string; url?: string }[]; // now compatible
}
export interface Product {
  id: string;
  brand?: Brand;
  model?: string;
  category?: MultiCategory;
  title: string;
  price: number;
  del_price?: number;
  status?: string;
  images?: string[];
  rating?: number;
  sale?: string;
  isBestSaller?: boolean;
  nudges?: string[];
  name?: string;
  reviewCount?: number;
  description?: string;
  features?: string[];
  deliveryTime?: string;
  shippingMethod: shippingMethod;
  weightKg: number;
  installmentOptions?: {
    methodType: methodType;
    months: number;
    amount: number;
  }[];
  bankOffers?: {
    title: string;
    url: string;
  }[];
  sellers?: Seller;
  sizes?: SizeType[] | NumericSizeType[] | LiquidSizeType[];
  colors?: ColorType[];
  highlights?: string[];
  overview_desc?: string;
  specifications?: { label: string; content: string }[];
  stock?: number;
  shipping_fee: number;
}
