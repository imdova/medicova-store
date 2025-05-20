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

// Glopal types
// Landing page Slider
export type Slide = {
  image: string | { src: string };
  url?: string;
  type: "slider" | "banner";
};
// categories type
export interface CategoryType {
  id: number;
  title: string;
  url: string;
  image: string;
  isSale?: boolean;
}
