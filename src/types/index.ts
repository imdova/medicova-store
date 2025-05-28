import { destinationSurcharges } from "@/constants";
import { StaticImageData } from "next/image";

export interface BaseHeaderProps {
  pathname: string;
}

// Define the User type
export type UserProps = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

// header types
export type link = {
  title: string;
  url: string;
};
export type gridLink = {
  heading: string;
  subLinks: link[];
};
export type linksHeader = {
  id: string;
  title: string;
  url: string;
  subLinks?: link[];
  gridLinks?: gridLink[];
  banner?: {
    active: boolean;
    title: string;
    details: string;
    image: string | StaticImageData;
  };
};
// Navbar type
export type NavLink = {
  name: string;
  path: string;
  icon?: React.ElementType;
};
//footer types
export interface FooterSection {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

export interface SocialMedia {
  name: string;
  icon: string;
  href: string;
}

export interface PaymentMethod {
  name: string;
  icon: string;
}
export type LegalLink = {
  name: string;
  href: string;
};

export type AppLink = {
  name: string;
  icon: string;
  href: string;
};

// Glopal types
// Landing page Slider
export type Slide = {
  image: string | { src: string };
  url?: string;
  type: "slider" | "banner";
};
// categories type
export interface CategoryType {
  id: string;
  title: string;
  url: string;
  image: string;
  isSale?: boolean;
}
// Brand type
export interface Brand {
  id: string;
  title: string;
  url: string;
  image?: string;
  isSale?: boolean;
}
// For subcategory
export interface SubCategoryType {
  title: string;
  url: string;
}

export interface MultiCategory extends CategoryType {
  subCategories?: SubCategoryType[];
  featuredProducts?: SubCategoryType[];
}

// for colors and sizes
export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type NumericSizeType = "28" | "30" | "32" | "34" | "36" | "38" | "40";
export type LiquidSizeType =
  | "50ml"
  | "100ml"
  | "150ml"
  | "200ml"
  | "300ml"
  | "400ml"
  | "500ml";

export type ColorType =
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

// type keywords search
export interface SearchResult {
  id: string;
  title: string;
  type: "recent";
}

// Shipping Fee type
export type ShippingOptions = {
  shippingMethod: "standard" | "express" | "free";
  destination: DestinationKey; // e.g., country code
  cartTotal: number; // total cart value
  weightKg?: number; // optional weight
};
export type DestinationKey = keyof typeof destinationSurcharges;

// locations type

export type AddressType = "home" | "work" | "other";

export interface Address {
  id: string;
  type: AddressType;
  name: string;
  details: string;
  area: string;
  city: string;
  isDefault: boolean;
  country?: string;
  country_code?: string;
  location: {
    lat: number;
    lng: number;
  };
}
