import { FilterDrawerGroup } from "@/types";

export const filtersData: FilterDrawerGroup[] = [
  {
    id: "sellerStatus",
    label: "Seller Status",
    isSingleSelect: true, // This group will be single select
    options: [
      { id: "active", label: "Active", count: 42 },
      { id: "inactive", label: "Inactive", count: 8 },
    ],
    collapsed: false,
  },
  {
    id: "stock",
    label: "Stock",
    isSingleSelect: true, // This group will be single select
    options: [
      { id: "inStock", label: "In stock", count: 35 },
      { id: "outOfStock", label: "Out of Stock", count: 15 },
    ],
    collapsed: false,
  },
  {
    id: "qcStatus",
    label: "QC Status",
    isSingleSelect: true, // This group will be single select
    options: [
      { id: "approved", label: "Approved", count: 28 },
      { id: "pending", label: "Pending", count: 12 },
      { id: "rejected", label: "Rejected", count: 10 },
    ],
    collapsed: false,
  },
  {
    id: "brand",
    label: "Brand",
    isSingleSelect: false,
    options: [
      { id: "nike", label: "Nike", count: 18 },
      { id: "adidas", label: "Adidas", count: 15 },
      { id: "puma", label: "Puma", count: 7 },
    ],
    collapsed: false,
  },
];

export const productFilters: FilterDrawerGroup[] = [
  {
    id: "sellerStatus",
    label: "Seller Status",
    isSingleSelect: true,
    options: [
      { id: "active", label: "Active", count: 42 },
      { id: "inactive", label: "Inactive", count: 8 },
    ],
    collapsed: false,
  },
  {
    id: "stock",
    label: "Stock",
    isSingleSelect: true,
    options: [
      { id: "inStock", label: "In stock", count: 35 },
      { id: "outOfStock", label: "Out of Stock", count: 15 },
    ],
    collapsed: false,
  },
  {
    id: "qcStatus",
    label: "QC Status",
    isSingleSelect: true,
    options: [
      { id: "approved", label: "Approved", count: 28 },
      { id: "pending", label: "Pending", count: 12 },
      { id: "rejected", label: "Rejected", count: 10 },
    ],
    collapsed: false,
  },
  {
    id: "brand",
    label: "Brand",
    isSingleSelect: false,
    options: [
      { id: "nike", label: "Nike", count: 18 },
      { id: "adidas", label: "Adidas", count: 15 },
      { id: "puma", label: "Puma", count: 7 },
      { id: "reebok", label: "Reebok", count: 5 },
    ],
    collapsed: false,
  },
  {
    id: "category",
    label: "Category",
    isSingleSelect: true,
    options: [
      { id: "shoes", label: "Shoes", count: 30 },
      { id: "clothing", label: "Clothing", count: 20 },
      { id: "accessories", label: "Accessories", count: 10 },
    ],
    collapsed: false,
  },
  {
    id: "subcategory",
    label: "Subcategory",
    isSingleSelect: false,
    options: [
      { id: "running", label: "Running", count: 12 },
      { id: "basketball", label: "Basketball", count: 8 },
      { id: "casual", label: "Casual", count: 15 },
    ],
    collapsed: false,
  },
  {
    id: "priceRange",
    label: "Price Range",
    isSingleSelect: true,
    options: [
      { id: "0-50", label: "$0 - $50", count: 12 },
      { id: "51-100", label: "$51 - $100", count: 22 },
      { id: "101-200", label: "$101 - $200", count: 16 },
    ],
    collapsed: false,
  },
  {
    id: "ratings",
    label: "Ratings",
    isSingleSelect: true,
    options: [
      { id: "4plus", label: "4 stars & up", count: 30 },
      { id: "3plus", label: "3 stars & up", count: 40 },
      { id: "2plus", label: "2 stars & up", count: 50 },
    ],
    collapsed: false,
  },
];
