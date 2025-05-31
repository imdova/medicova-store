import { FilterGroup } from "@/types";

// Mock data for filters
export const leftFilters: FilterGroup[] = [
  {
    id: "category",
    name: "Category",
    options: [
      {
        id: "electronics",
        name: "Electronics & Mobiles",
        subcategories: [
          {
            id: "smartphones",
            name: "Smartphones",
            subcategories: [
              { id: "android", name: "Android Phones" },
              { id: "ios", name: "iOS Phones" },
              {
                id: "foldable",
                name: "Foldable Phones",
                subcategories: [
                  { id: "samsung-fold", name: "Samsung Fold Series" },
                  { id: "motorola-razr", name: "Motorola Razr" },
                ],
              },
            ],
          },
          {
            id: "laptops",
            name: "Laptops",
            subcategories: [
              { id: "gaming", name: "Gaming Laptops" },
              { id: "ultrabooks", name: "Ultrabooks" },
            ],
          },
          { id: "smartwatches", name: "Smartwatches" },
        ],
      },
      {
        id: "health",
        name: "Health & Nutrition",
        subcategories: [
          { id: "vitamins", name: "Vitamins" },
          { id: "protein", name: "Protein" },
          { id: "weight-loss", name: "Weight Loss" },
        ],
      },
      { id: "all-health", name: "All Health & Nutrition" },
      { id: "medical", name: "Medical Supplies & Equipment" },
      { id: "fashion", name: "Fashion" },
      { id: "baby", name: "Baby Products" },
      { id: "toys", name: "Toys & Games" },
      { id: "books", name: "Books" },
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
