import { destinationSurcharges } from "@/constants";
import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { LocalizedTitle } from "./language";
import { shippingMethod } from "./product";

export interface BaseHeaderProps {
  pathname: string;
}

export type MultilingualString = string | { en: string; ar: string };

export type BadgeVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral"
  | "complete"
  | "missing-title"
  | "missing-description"
  | "premium"
  | "needs-review";

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
  title: LocalizedTitle;
  href: string;
  icon: LucideIcon;
}

export interface MenuGroup {
  title?: LocalizedTitle;
  items: MenuItem[];
}

// header types
export type link = {
  title: LocalizedTitle;
  url: string;
};
export type gridLink = {
  heading: LocalizedTitle;
  subLinks: link[];
};
export type linksHeader = {
  id: string;
  title: LocalizedTitle;
  url: string;
  subLinks?: link[];
  gridLinks?: gridLink[];
  banner?: {
    active: boolean;
    title: LocalizedTitle;
    details: LocalizedTitle;
    image: string | StaticImageData;
  };
};
// Navbar type
export type NavLink = {
  name: LocalizedTitle;
  path: string;
  icon?: React.ElementType;
};

export type GroupNavLink = {
  user: NavLink[];
  seller: NavLink[];
  admin: NavLink[];
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
  title: LocalizedTitle;
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
  name: LocalizedTitle;
  url?: string;
  image: string;
  hasStore?: boolean;
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

// type keywords search
export interface SearchResult {
  id: string;
  title: string;
  type: "recent";
}

// Shipping Fee type
export type ShippingOptions = {
  shippingMethod: shippingMethod;
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
  name: LocalizedTitle;
  count?: number;
  subcategories?: FilterOption[];
  isRange?: boolean;
};

export type FilterGroup = {
  id: string;
  name: LocalizedTitle;
  options?: FilterOption[];
  option?: string;
};

export type FilterDrawerOption = {
  id: string;
  label: string;
  count: number;
};

export interface FilterDrawerGroup {
  id: string;
  label: { en: string; ar: string };
  isSingleSelect: boolean;
  options: {
    id: string;
    label: { en: string; ar: string };
    count?: number;
  }[];
  collapsed: boolean;
}

// offers type
export type Offer = {
  id: string;
  imgUrl: string;
  url: string;
  title: {
    en: string;
    ar: string;
  };
};

// locations
export type Country = {
  id: string;
  code: string;
  name: LocalizedTitle;
};

export type City = {
  id: string;
  code: string;
  name: LocalizedTitle;
};
