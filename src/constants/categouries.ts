import { CategoryType } from "@/types";

const medicalCategories: CategoryType[] = [
  {
    id: 1,
    title: "Medical Wear & Uniforms",
    url: "/medical-wear",
    image: "/images/medical_wear.jpg",
    isSale: true,
  },
  {
    id: 2,
    title: "Surgical Scrubs",
    url: "/surgical-scrubs",
    image: "/images/Mens_Sports_Wear.jpg",
  },
  {
    id: 3,
    title: "Lab Coats",
    url: "/lab-coats",
    image: "/images/medical-devices.jpg",
    isSale: true,
  },
  {
    id: 4,
    title: "Medical Footwear",
    url: "/medical-footwear",
    image: "/images/Watches.jpg",
  },
  {
    id: 5,
    title: "Nursing Wear",
    url: "/nursing-wear",
    image: "/images/womens_Sports_Wear.jpg",
  },
  {
    id: 6,
    title: "Medical Accessories",
    url: "/medical-accessories",
    image: "/images/medical-accessories.jpg",
  },
];

const equipmentCategories: CategoryType[] = [
  {
    id: 7,
    title: "Diagnostic Equipment",
    url: "/diagnostic-equipment",
    image: "/images/diagnostic-equipment.jpg",
  },
  {
    id: 8,
    title: "Surgical Instruments",
    url: "/surgical-instruments",
    image: "/images/surgical-instruments.jpg",
    isSale: true,
  },
  {
    id: 9,
    title: "Dental Equipment",
    url: "/dental-equipment",
    image: "/images/dental-equipment.jpg",
  },
  {
    id: 10,
    title: "Hospital Furniture",
    url: "/hospital-furniture",
    image: "/images/hospital-furniture.jpg",
  },
  {
    id: 11,
    title: "Patient Care Equipment",
    url: "/patient-care-equipment",
    image: "/images/patient-care.jpg",
    isSale: true,
  },
  {
    id: 12,
    title: "Medical Carts & Stands",
    url: "/medical-carts",
    image: "/images/medical-carts.jpg",
  },
];

const consumableCategories: CategoryType[] = [
  {
    id: 13,
    title: "Disposable Gloves",
    url: "/disposable-gloves",
    image: "/images/disposable-gloves.jpg",
  },
  {
    id: 14,
    title: "Face Masks & Shields",
    url: "/face-protection",
    image: "/images/face-masks.jpg",
  },
  {
    id: 15,
    title: "Wound Care Supplies",
    url: "/wound-care",
    image: "/images/wound-care.jpg",
  },
  {
    id: 16,
    title: "Infection Control",
    url: "/infection-control",
    image: "/images/infection-control.jpg",
  },
  {
    id: 17,
    title: "Medical Tapes & Dressings",
    url: "/medical-dressings",
    image: "/images/medical-dressings.jpg",
  },
  {
    id: 18,
    title: "Syringes & Needles",
    url: "/syringes-needles",
    image: "/images/syringes-needles.jpg",
  },
];

const lifestyleCategories: CategoryType[] = [
  {
    id: 19,
    title: "Sports Wear",
    url: "/sports-wear",
    image: "/images/sports-wear.jpg",
  },
  {
    id: 20,
    title: "Fitness Accessories",
    url: "/fitness-accessories",
    image: "/images/fitness-accessories.jpg",
  },
  {
    id: 21,
    title: "Luxury Watches",
    url: "/luxury-watches",
    image: "/images/luxury-watches.jpg",
  },
  {
    id: 22,
    title: "Designer Perfumes",
    url: "/designer-perfumes",
    image: "/images/designer-perfumes.jpg",
  },
  {
    id: 23,
    title: "Professional Bags",
    url: "/professional-bags",
    image: "/images/professional-bags.jpg",
  },
  {
    id: 24,
    title: "Eyewear",
    url: "/eyewear",
    image: "/images/eyewear.jpg",
  },
];

const allCategories: CategoryType[] = [
  ...medicalCategories,
  ...equipmentCategories,
  ...consumableCategories,
  ...lifestyleCategories,
];

// For subcategory navigation (mega menu)
interface SubCategoryType {
  title: string;
  url: string;
}

interface MegaMenuCategory extends CategoryType {
  subCategories?: SubCategoryType[];
  featuredProducts?: SubCategoryType[];
}

const megaMenuCategories: MegaMenuCategory[] = [
  {
    id: 1,
    title: "Medical Wear",
    url: "/medical-wear",
    image: "/images/medical-wear.jpg",
    subCategories: [
      { title: "Scrubs", url: "/medical-wear/scrubs" },
      { title: "Lab Coats", url: "/medical-wear/lab-coats" },
      { title: "Medical Shoes", url: "/medical-wear/shoes" },
      { title: "Surgical Caps", url: "/medical-wear/surgical-caps" },
    ],
    featuredProducts: [
      {
        title: "Best Selling Scrubs",
        url: "/medical-wear/scrubs/best-selling",
      },
      { title: "New Arrivals", url: "/medical-wear/new-arrivals" },
    ],
  },
  // Add similar expanded data for other main categories
];

export {
  medicalCategories,
  equipmentCategories,
  consumableCategories,
  lifestyleCategories,
  allCategories,
  megaMenuCategories,
};
