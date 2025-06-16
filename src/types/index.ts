import { destinationSurcharges } from "@/constants";
import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { LocalizedTitle } from "./language";

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

// sidebar types

// Define the type for a main item (which may have sub-items)
export interface SidebarItem {
  title: LocalizedTitle;
  href: string;
  icon?: LucideIcon;
  subItems?: SidebarItem[]; // Optional
}

// Define the type for a group of sidebar items
export interface SidebarGroup {
  title?: LocalizedTitle;
  description?: string; // Optional
  items: SidebarItem[];
}

// menus type
export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

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
  title: LocalizedTitle;
  links: {
    name: LocalizedTitle;
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
  name: LocalizedTitle;
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
  slug: string;
  title: string;
  image: string;
  isSale?: boolean;
  subCategories?: CategoryType[];
  cover?: string;
  banner?: {
    image: string;
    url: string;
  };
}
// Brand type
export interface Brand {
  id: string;
  title: string;
  url: string;
  image?: string;
  isSale?: boolean;
}

export interface MultiCategory extends CategoryType {
  subCategories?: CategoryType[];
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

// filters type
export type FilterOption = {
  id: string;
  name: string;
  count?: number;
  subcategories?: FilterOption[];
  isRange?: boolean;
};

export type FilterGroup = {
  id: string;
  name: string;
  options?: FilterOption[];
  option?: string;
};

export type FilterDrawerOption = {
  id: string;
  label: string;
  count: number;
};

export type FilterDrawerGroup = {
  id: string;
  label: string;
  isSingleSelect: boolean;
  options: FilterDrawerOption[];
  collapsed: boolean;
};

// offers type
export interface Offer {
  id: string;
  title: string;
  imgUrl: string;
  url: string;
}
