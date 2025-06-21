import { Brand, LiquidSizeType, NumericSizeType, SizeType } from ".";
import { LocalizedTitle } from "./language";

export type Seller = {
  id: string;
  name: string;
  rating: number;
  image?: string;
  isActive: boolean;
  positiveRatings?: string;
  partnerSince?: string;
  products?: number;
  customers?: number;
  sales?: number;
  country?: string;
  city?: string;
  returnPolicy: LocalizedTitle;
  itemShown: number;
  status: LocalizedTitle;
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

export type shippingMethod = {
  en: "standard" | "express" | "free";
  ar: "قياسي" | "سريع" | "مجاني";
};

export type ColorNameEn =
  | "Black"
  | "White"
  | "Red"
  | "Blue"
  | "Green"
  | "Yellow"
  | "Orange"
  | "Purple"
  | "Grey"
  | "Brown"
  | "Beige"
  | "Pink"
  | "Navy"
  | "Maroon"
  | "Olive"
  | "Teal";

export type ColorNameAr =
  | "أسود"
  | "أبيض"
  | "أحمر"
  | "أزرق"
  | "أخضر"
  | "أصفر"
  | "برتقالي"
  | "بنفسجي"
  | "رمادي"
  | "بني"
  | "بيج"
  | "وردي"
  | "كحلي"
  | "خمري"
  | "زيتي"
  | "أخضر مزرق";

export type MultilingualColor = {
  en: ColorNameEn[];
  ar: ColorNameAr[];
};

export interface SelectedColorState {
  en?: ColorNameEn;
  ar?: ColorNameAr;
}
interface CategoryType {
  id: string;
  slug?: string;
  url?: string;
  title: LocalizedTitle;
  image: string;
  isSale?: boolean;
  subcategory?: { title: LocalizedTitle; url?: string };
}

// export interface Product {
//   id: string;
//   brand?: Brand;
//   model?: string;
//   category?: CategoryType;
//   title: string;
//   price: number;
//   del_price?: number;
//   status?: string;
//   images?: string[];
//   rating?: number;
//   sale?: string;
//   isBestSaller?: boolean;
//   nudges?: string[];
//   name?: string;
//   reviewCount?: number;
//   description?: string;
//   features?: string[];
//   deliveryTime?: string;
//   shippingMethod: shippingMethod;
//   weightKg: number;
//   installmentOptions?: {
//     methodType: methodType;
//     months: number;
//     amount: number;
//   }[];
//   bankOffers?: {
//     title: string;
//     url: string;
//   }[];
//   sellers?: Seller;
//   sizes?: SizeType[] | NumericSizeType[] | LiquidSizeType[];
//   colors?: ColorType[];
//   highlights?: string[];
//   overview_desc?: string;
//   specifications?: { label: string; content: string }[];
//   stock?: number;
//   shipping_fee: number;
//   sku?: string;
// }
export interface Product {
  id: string;
  sku?: string; // Optional if not all products have it
  brand: Brand;
  model: LocalizedTitle;
  category: CategoryType;
  title: LocalizedTitle;
  price: number;
  del_price?: number; // Optional
  stock?: number; // Optional
  status?: LocalizedTitle;
  rating: number;
  sale?: string; // This could also be LocalizedTitle if the "OFF" needs translation
  sizes?: SizeType[] | NumericSizeType[] | LiquidSizeType[]; // Sizes might be universal or you might need LangArray if sizes names change (e.g., Small vs. صغير)
  colors?: MultilingualColor;
  images: string[];
  isBestSaller: boolean;
  nudges?: {
    en: string[];
    ar: string[];
  };
  reviewCount: number;
  description: LocalizedTitle;
  features: {
    en: string[];
    ar: string[];
  };
  deliveryTime?: LocalizedTitle;
  installmentOptions?: {
    months: number;
    amount: number;
    methodType: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
  }[];
  bankOffers?: {
    title: LocalizedTitle;
    url: string;
  }[];
  sellers: Seller;
  overview_desc: LocalizedTitle;
  highlights: {
    en: string[];
    ar: string[];
  };
  specifications: {
    label: LocalizedTitle;
    content: LocalizedTitle;
  }[];
  shipping_fee: number;
  shippingMethod: shippingMethod;
  weightKg: number;
}
