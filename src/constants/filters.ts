import { FilterGroup } from "@/types";

// Mock data for filters
export const leftFilters: FilterGroup[] = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        id: "medical",
        name: "Medical Supplies & Equipment",
        subcategories: [
          {
            id: "medical-wear",
            name: "Medical Wear & Uniforms",
            subcategories: [
              { id: "scrubs", name: "Surgical Scrubs" },
              { id: "lab-coats", name: "Lab Coats" },
              { id: "shoes", name: "Medical Footwear" }, // Matches slug "shoes"
              { id: "nursing-wear", name: "Nursing Wear" },
              { id: "medical-accessories", name: "Medical Accessories" },
            ],
          },
          {
            id: "medical-equipment",
            name: "Medical Equipment",
            subcategories: [
              { id: "diagnostic", name: "Diagnostic Equipment" },
              { id: "surgical", name: "Surgical Instruments" },
              { id: "equipment-dental", name: "Dental Equipment" },
              { id: "hospital-furniture", name: "Hospital Furniture" },
              { id: "monitoring", name: "Patient Care Equipment" }, // Matches slug "monitoring"
              { id: "medical-carts", name: "Medical Carts & Stands" },
            ],
          },
          {
            id: "medical-consumables",
            name: "Medical Consumables",
            subcategories: [
              { id: "disposable", name: "Disposable Products" }, // Matches slug "disposable"
              { id: "face-protection", name: "Face Masks & Shields" },
              { id: "wound-care", name: "Wound Care Supplies" },
              { id: "infection-control", name: "Infection Control" },
              {
                id: "medical-consumables-tapes",
                name: "Medical Tapes & Dressings",
              },
              { id: "syringes-needles", name: "Syringes & Needles" },
            ],
          },
        ],
      },
      {
        id: "lifestyle",
        name: "Lifestyle Products",
        subcategories: [
          {
            id: "fashion",
            name: "Fashion",
            subcategories: [
              { id: "casual", name: "Casual Wear" },
              { id: "formal", name: "Formal Wear" },
              { id: "athleisure", name: "Athleisure" },
            ],
          },
          {
            id: "accessories",
            name: "Accessories",
            subcategories: [
              { id: "watches", name: "Watches" },
              { id: "jewelry", name: "Jewelry" },
              { id: "eyewear", name: "Eyewear" },
            ],
          },
          {
            id: "wellness",
            name: "Wellness",
            subcategories: [
              { id: "fitness", name: "Fitness Equipment" },
              { id: "massage", name: "Massage Tools" },
              { id: "relaxation", name: "Relaxation" },
            ],
          },
          {
            id: "personal-care",
            name: "Personal Care",
            subcategories: [
              { id: "fragrances", name: "Fragrances" },
              { id: "skincare", name: "Skincare" },
              { id: "haircare", name: "Haircare" },
            ],
          },
        ],
      },
      {
        id: "all-medical",
        name: "All Medical Supplies",
      },
      {
        id: "all-lifestyle",
        name: "All Lifestyle Products",
      },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { id: "apple", name: "Apple", count: 124 },
      { id: "samsung", name: "Samsung", count: 89 },
      { id: "huawei", name: "Huawei", count: 76 },
      { id: "amazfit", name: "Amazfit", count: 42 },
      { id: "fitbit", name: "Fitbit", count: 35 },
      { id: "xiaomi", name: "Xiaomi", count: 28 },
      { id: "garmin", name: "Garmin", count: 22 },
      { id: "fossil", name: "Fossil", count: 18 },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      {
        id: "custom-range",
        name: "Custom Range",
        isRange: true,
      },
    ],
  },
  {
    id: "rating",
    name: "Customer Rating",
    options: [
      { id: "4.5", name: "4.5 & Up", count: 1245 },
      { id: "4", name: "4 & Up", count: 1890 },
      { id: "3.5", name: "3.5 & Up", count: 2345 },
      { id: "3", name: "3 & Up", count: 2890 },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { id: "in-stock", name: "In Stock", count: 3456 },
      { id: "out-of-stock", name: "Out of Stock", count: 123 },
      { id: "pre-order", name: "Pre-order", count: 45 },
    ],
  },
];

export const tapFilters: FilterGroup[] = [
  {
    id: "brand",
    name: "Brand",
    options: leftFilters.find((f) => f.id === "brand")?.options || [],
  },
  {
    id: "material",
    name: "Material",
    options: [
      { id: "stainless-steel", name: "Stainless Steel", count: 45 },
      { id: "aluminum", name: "Aluminum", count: 32 },
      { id: "plastic", name: "Plastic", count: 28 },
      { id: "titanium", name: "Titanium", count: 12 },
      { id: "ceramic", name: "Ceramic", count: 8 },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { id: "black", name: "Black", count: 67 },
      { id: "silver", name: "Silver", count: 45 },
      { id: "blue", name: "Blue", count: 32 },
      { id: "red", name: "Red", count: 24 },
      { id: "gold", name: "Gold", count: 18 },
      { id: "white", name: "White", count: 15 },
      { id: "green", name: "Green", count: 12 },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      {
        id: "custom-range",
        name: "Custom Range",
        isRange: true,
      },
    ],
  },
  {
    id: "brand",
    name: "Apple",
    option: "apple",
  },
  {
    id: "brand",
    name: "HUAWEI",
    option: "huawei",
  },
  {
    id: "category",
    name: "Fashion",
    option: "fashion",
  },
];

export const sortOptions = [
  { id: "recommended", name: "Recommended" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Customer Rating" },
  { id: "newest", name: "Newest Arrivals" },
];
