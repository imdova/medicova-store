import { ProductInventory } from "@/types/product";

// Mock data for medical wear product inventory with variants
export const mockProductInventory: ProductInventory[] = [
  {
    id: 101,
    image:
      "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
    name: "Unisex Medical Scrub Suit",
    sku: "MW-001",
    storefrontManagement: "true",
    quantity: 40,
    hasVariants: true,
    isVariant: false,
    parentId: null,
    variants: [
      {
        id: 1011,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Color: Blue, Size: M",
        sku: "MW-001-BL-M",
        storefrontManagement: "true",
        quantity: 15,
        hasVariants: false,
        isVariant: true,
        parentId: 101,
      },
      {
        id: 1012,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Color: Green, Size: L",
        sku: "MW-001-GR-L",
        storefrontManagement: "true",
        quantity: 10,
        hasVariants: false,
        isVariant: true,
        parentId: 101,
      },
    ],
  },
  {
    id: 102,
    image:
      "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
    name: "Doctor's White Lab Coat",
    sku: "MW-002",
    storefrontManagement: "true",
    quantity: 25,
    hasVariants: true,
    isVariant: false,
    parentId: null,
    variants: [
      {
        id: 1021,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Size: S",
        sku: "MW-002-S",
        storefrontManagement: "true",
        quantity: 5,
        hasVariants: false,
        isVariant: true,
        parentId: 102,
      },
      {
        id: 1022,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Size: M",
        sku: "MW-002-M",
        storefrontManagement: "true",
        quantity: 10,
        hasVariants: false,
        isVariant: true,
        parentId: 102,
      },
    ],
  },
  {
    id: 103,
    image:
      "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
    name: "3-Ply Surgical Face Mask",
    sku: "MW-003",
    storefrontManagement: "true",
    quantity: 500,
    hasVariants: true,
    isVariant: false,
    parentId: null,
    variants: [
      {
        id: 1031,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Pack of 50",
        sku: "MW-003-50",
        storefrontManagement: "true",
        quantity: 300,
        hasVariants: false,
        isVariant: true,
        parentId: 103,
      },
      {
        id: 1032,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Pack of 100",
        sku: "MW-003-100",
        storefrontManagement: "true",
        quantity: 200,
        hasVariants: false,
        isVariant: true,
        parentId: 103,
      },
    ],
  },
  {
    id: 104,
    image:
      "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
    name: "Nitrile Examination Gloves",
    sku: "MW-004",
    storefrontManagement: "true",
    quantity: 200,
    hasVariants: true,
    isVariant: false,
    parentId: null,
    variants: [
      {
        id: 1041,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Size: M (Box of 100)",
        sku: "MW-004-M",
        storefrontManagement: "true",
        quantity: 120,
        hasVariants: false,
        isVariant: true,
        parentId: 104,
      },
      {
        id: 1042,
        image:
          "https://www.drbrandscrubs.com/_next/image?url=https%3A%2F%2Fs.drbrandscrubs.com%2Fuploads%2F1730710595034-Untitled-1.jpg&w=1920&q=70",
        name: "Size: L (Box of 100)",
        sku: "MW-004-L",
        storefrontManagement: "true",
        quantity: 80,
        hasVariants: false,
        isVariant: true,
        parentId: 104,
      },
    ],
  },
];
