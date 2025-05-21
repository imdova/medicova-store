import {
  AppLink,
  FooterSection,
  LegalLink,
  PaymentMethod,
  SocialMedia,
} from "@/types";

// Footer sections data
export const sections: FooterSection[] = [
  {
    title: "ELECTRONICS",
    links: [
      { name: "Mobiles", href: "/electronics/mobiles" },
      { name: "Tablets", href: "/electronics/tablets" },
      { name: "Laptops", href: "/electronics/laptops" },
      { name: "Home Appliances", href: "/electronics/appliances" },
      { name: "Camera, Photo & Video", href: "/electronics/cameras" },
      { name: "Televisions", href: "/electronics/tvs" },
      { name: "Headphones", href: "/electronics/headphones" },
      { name: "Video Games", href: "/electronics/games" },
    ],
  },
  {
    title: "FASHION",
    links: [
      { name: "Women's Fashion", href: "/fashion/women" },
      { name: "Men's Fashion", href: "/fashion/men" },
      { name: "Girls' Fashion", href: "/fashion/girls" },
      { name: "Boys' Fashion", href: "/fashion/boys" },
      { name: "Men's Watches", href: "/fashion/mens-watches" },
      { name: "Women's Watches", href: "/fashion/womens-watches" },
      { name: "Eyewear", href: "/fashion/eyewear" },
      { name: "Bags & Luggage", href: "/fashion/bags" },
    ],
  },
  {
    title: "HOME AND KITCHEN",
    links: [
      { name: "Kitchen & Dining", href: "/home/kitchen" },
      { name: "Bedding", href: "/home/bedding" },
      { name: "Bath", href: "/home/bath" },
      { name: "Home Decor", href: "/home/decor" },
      { name: "Home Appliances", href: "/home/appliances" },
      { name: "Tools & Home Improvement", href: "/home/tools" },
      { name: "Patio, Lawn & Garden", href: "/home/garden" },
      { name: "Home Storage & Organisation", href: "/home/storage" },
    ],
  },
  {
    title: "BEAUTY",
    links: [
      { name: "Women's Fragrance", href: "/beauty/womens-fragrance" },
      { name: "Men's Fragrance", href: "/beauty/mens-fragrance" },
      { name: "Make-Up", href: "/beauty/makeup" },
      { name: "Haircare", href: "/beauty/haircare" },
      { name: "Skincare", href: "/beauty/skincare" },
      { name: "Personal Care", href: "/beauty/personal-care" },
      { name: "Tools & Accessories", href: "/beauty/tools" },
    ],
  },
  {
    title: "KIDS, BABY & TOYS",
    links: [
      { name: "Strollers & Accessories", href: "/kids/strollers" },
      { name: "Car Seats", href: "/kids/car-seats" },
      { name: "Baby Clothing", href: "/kids/baby-clothing" },
      { name: "Feeding", href: "/kids/feeding" },
      { name: "Bathing & Skincare", href: "/kids/bathing" },
      { name: "Diapering", href: "/kids/diapering" },
      { name: "Baby & Toddler Toys", href: "/kids/toys" },
      { name: "Toys & Games", href: "/kids/games" },
    ],
  },
  {
    title: "TOP BRANDS",
    links: [
      { name: "Apple", href: "/brands/apple" },
      { name: "Samsung", href: "/brands/samsung" },
      { name: "Nike", href: "/brands/nike" },
      { name: "Ray-Ban", href: "/brands/rayban" },
      { name: "Tefal", href: "/brands/tefal" },
      { name: "L'Oreal Paris", href: "/brands/loreal" },
      { name: "Chicco", href: "/brands/chicco" },
      { name: "Tomado", href: "/brands/tomado" },
    ],
  },
  {
    title: "DISCOVER NOW",
    links: [
      { name: "Brand Glossary", href: "/discover/glossary" },
      { name: "Noon Kuwait", href: "/discover/kuwait" },
      { name: "Noon Bahrain", href: "/discover/bahrain" },
      { name: "Noon Oman", href: "/discover/oman" },
      { name: "Noon Qatar", href: "/discover/qatar" },
    ],
  },
];

// Social media links
export const socialMedia: SocialMedia[] = [
  {
    name: "LinkedIn",
    icon: "/icons/icons8-linkedin-circled.svg",
    href: "https://linkedin.com/company/medicova",
  },
  {
    name: "Instagram",
    icon: "/icons/icons8-instagram.svg",
    href: "https://instagram.com/medicova",
  },
  {
    name: "X",
    icon: "/icons/icons8-x.svg",
    href: "https://x.com/medicova",
  },
  {
    name: "Facebook",
    icon: "/icons/icons8-facebook.svg",
    href: "https://facebook.com/medicova",
  },
];

// Payment methods
export const paymentMethods: PaymentMethod[] = [
  { name: "VISA", icon: "/icons/card-visa.svg" },
  { name: "MasterCard", icon: "/icons/card-mastercard.svg" },
  { name: "Valu Pay", icon: "/icons/valu_v2.svg" },
  { name: "amex", icon: "/icons/card-amex.svg" },
  { name: "Cash on Delivery", icon: "/icons/cod-en.svg" },
];

// Legal links
export const legalLinks: LegalLink[] = [
  { name: "Careers", href: "/careers" },
  { name: "Warranty Policy", href: "/warranty" },
  { name: "Sell with us", href: "/sell-with-us" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Terms of Sale", href: "/terms-of-sale" },
  { name: "Privacy Policy", href: "/privacy" },
];

// App download links
export const appLinks: AppLink[] = [
  { name: "App Store", icon: "/icons/app-store.svg", href: "#" },
  { name: "Google Play", icon: "/icons/google-play.svg", href: "#" },
  { name: "AppGallery", icon: "/icons/Huawei-icon.avif", href: "#" },
];
