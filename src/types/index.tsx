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

// Glopal types
// Landing page Slider
export type Slide = {
  title: string;
  subtitle: string;
  buttonText: string;
  url: string;
  image: StaticImageData;
};
// categories type
export interface CategoryType {
  id: number;
  title: string;
  url: string;
  image: string;
}
