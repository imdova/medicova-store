"use client";

import { useState, useCallback, useEffect, use } from "react";
import {
  Image as ImageIcon,
  X,
  Check,
  Save,
  Eye,
  Info,
  AlertCircle,
} from "lucide-react";
import { Brand, MultiCategory } from "@/types";
import Image from "next/image";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";
import { products } from "@/constants/products"; // Assuming you have a products constant

type PricingMethod = "manual" | "auto";

type Specification = {
  key: string;
  value: string;
};

type ProductDetails = {
  id: string;
  category?: MultiCategory;
  brand?: Brand;
  sku?: string;
  pricingMethod: PricingMethod;
  del_price?: number;
  price?: number;
  saleStart?: string;
  saleEnd?: string;
  title?: string;
  description?: string;
  features?: string[];
  deliveryTime?: string;
  highlights?: string[];
  weightKg?: number;
  stock?: number;
  sizes?: string[];
  colors?: string[];
  specifications?: Specification[];
  images?: File[];
  existingImages?: string[];
};

interface ValidationErrors {
  [key: string]: string;
}

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;
const colorOptions = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Purple",
  "Pink",
  "Orange",
  "Gray",
] as const;

const HealthStatus = ({ product }: { product: ProductDetails }) => {
  // Check each health condition
  const invoicingValid = true; // Placeholder, assuming invoicing is always valid for now
  const priceValid = product.price !== undefined && product.price >= 0;
  const pskuActive = !!product.sku && product.sku.length >= 3;
  const stockAvailable = product.stock !== undefined && product.stock > 0;
  const productActive =
    !!product.title &&
    !!product.description &&
    (product.images?.length || product.existingImages?.length || 0) > 0;

  const allValid =
    invoicingValid &&
    priceValid &&
    pskuActive &&
    stockAvailable &&
    productActive;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Health</h2>
      </div>

      <div className="my-4">
        <div
          className={`mb-2 rounded-md p-3 ${
            allValid
              ? "bg-green-50 text-green-700"
              : "bg-yellow-50 text-yellow-700"
          }`}
        >
          <div className="flex items-center">
            {allValid ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <AlertCircle className="mr-2 h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {allValid
                ? "All checks passed"
                : "Fix the following to go online"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div
            className={`rounded-md p-3 ${invoicingValid ? "bg-gray-50" : "bg-red-50"}`}
          >
            <div className="flex items-center">
              {invoicingValid ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <X className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Invoicing</span>
            </div>
            {!invoicingValid && (
              <div className="mt-1 text-sm">Invalid invoicing</div>
            )}
          </div>

          <div
            className={`rounded-md p-3 ${priceValid ? "bg-gray-50" : "bg-red-50"}`}
          >
            <div className="flex items-center">
              {priceValid ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <X className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Price</span>
            </div>
            {!priceValid && (
              <div className="mt-1 flex items-center text-xs">
                <span className="text-xs">Price is invalid</span>
                <button
                  type="button"
                  className="ml-2 flex items-center text-xs text-blue-500 hover:text-blue-700"
                >
                  <Info className="mr-1 h-4 w-4" />
                  Learn more
                </button>
              </div>
            )}
          </div>

          <div
            className={`rounded-md p-3 ${pskuActive ? "bg-gray-50" : "bg-red-50"}`}
          >
            <div className="flex items-center">
              {pskuActive ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <X className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">PSKU Active</span>
            </div>
            {!pskuActive && (
              <div className="mt-1 flex items-center text-xs">
                <span className="text-xs">PSKU not active</span>
                <button
                  type="button"
                  className="ml-2 flex items-center text-xs text-blue-500 hover:text-blue-700"
                >
                  <Info className="mr-1 h-4 w-4" />
                  Learn more
                </button>
              </div>
            )}
          </div>

          <div
            className={`rounded-md p-3 ${stockAvailable ? "bg-gray-50" : "bg-red-50"}`}
          >
            <div className="flex items-center">
              {stockAvailable ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <X className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Stock Check</span>
            </div>
            {!stockAvailable && (
              <div className="mt-1 flex items-center text-xs">
                <span className="text-xs">Stock not available</span>
                <button
                  type="button"
                  className="ml-2 flex items-center text-xs text-blue-500 hover:text-blue-700"
                >
                  <Info className="mr-1 h-4 w-4" />
                  Learn more
                </button>
              </div>
            )}
          </div>

          <div
            className={`rounded-md p-3 ${productActive ? "bg-gray-50" : "bg-red-50"}`}
          >
            <div className="flex items-center">
              {productActive ? (
                <Check className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <X className="mr-2 h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Product Active</span>
            </div>
            {!productActive && (
              <div className="mt-1 flex items-center text-xs">
                <span className="text-xs">Product not active</span>
                <button
                  type="button"
                  className="ml-2 flex items-center text-blue-500 hover:text-blue-700"
                >
                  <Info className="mr-1 h-4 w-4" />
                  Learn more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductEditPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [product, setProduct] = useState<ProductDetails>({
    id: "",
    pricingMethod: "manual",
    specifications: [],
    images: [],
    features: [],
    highlights: [],
    sizes: [],
    colors: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [newSpec, setNewSpec] = useState<Specification>({ key: "", value: "" });
  const [newFeature, setNewFeature] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const { slug } = use(params);

  // Find the product by slug from constants
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === slug);
    if (foundProduct) {
      // Convert the product to our editable format
      const editableProduct: ProductDetails = {
        id: foundProduct.id,
        sku: foundProduct.sku,
        title: foundProduct.title,
        price: foundProduct.price,
        del_price: foundProduct.del_price,
        description: foundProduct.description,
        features: foundProduct.features,
        highlights: foundProduct.highlights,
        deliveryTime: foundProduct.deliveryTime,
        weightKg: foundProduct.weightKg,
        stock: foundProduct.stock,
        sizes: foundProduct.sizes?.map((s) => s),
        colors: foundProduct.colors?.map((c) => c),
        specifications: foundProduct.specifications?.map((s) => ({
          key: s.label,
          value: s.content,
        })),
        // You'll need to map other fields as needed
        pricingMethod: "manual",
        existingImages: foundProduct.images || [], // You'll need to handle images appropriately
        images: [],
        brand: foundProduct.brand,
        category: foundProduct.category as MultiCategory,
      };
      setProduct(editableProduct);
    }
  }, [slug]);

  const validateDetails = (product: ProductDetails): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!product.title) {
      errors.title = "Product title is required";
    } else if (product.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (product.del_price === undefined || product.del_price === null) {
      errors.del_price = "del price is required";
    } else if (
      typeof product.del_price !== "number" ||
      isNaN(product.del_price) ||
      product.del_price < 0
    ) {
      errors.del_price = "del price must be a positive number";
    }

    if (product.saleStart) {
      if (product.price === undefined || product.price === null) {
        errors.price = "Sale price is required when sale dates are set";
      } else if (
        typeof product.price !== "number" ||
        isNaN(product.price) ||
        product.price < 0
      ) {
        errors.price = "Sale price must be a positive number";
      } else if (product.price >= (product.price || 0)) {
        errors.price = "Sale price must be less than regular price";
      }

      if (!product.saleEnd) {
        errors.saleEnd = "Sale end date is required when sale start is set";
      } else if (product.saleStart > product.saleEnd) {
        errors.saleEnd = "Sale end date must be after start date";
      }
    }

    if (!product.description) {
      errors.description = "Description is required";
    } else if (product.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }

    if (product.weightKg !== undefined && product.weightKg < 0) {
      errors.weightKg = "Weight must be a positive number";
    }

    if (product.stock !== undefined && product.stock < 0) {
      errors.stock = "Stock must be a positive number";
    }

    return errors;
  };

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages = Array.from(files).slice(
        0,
        10 -
          (product.images?.length || 0) -
          (product.existingImages?.length || 0),
      );
      setProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    },
    [product.images, product.existingImages],
  );

  const handleRemoveImage = useCallback(
    (index: number, isExisting: boolean) => {
      if (isExisting) {
        setProduct((prev) => ({
          ...prev,
          existingImages: prev.existingImages?.filter((_, i) => i !== index),
        }));
      } else {
        setProduct((prev) => ({
          ...prev,
          images: prev.images?.filter((_, i) => i !== index),
        }));
      }
    },
    [],
  );
  const handleAddSpecification = useCallback(() => {
    if (newSpec.key && newSpec.value) {
      setProduct((prev) => ({
        ...prev,
        specifications: [...(prev.specifications || []), newSpec],
      }));
      setNewSpec({ key: "", value: "" });
    }
  }, [newSpec]);

  const handleRemoveSpecification = useCallback((index: number) => {
    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications?.filter((_, i) => i !== index),
    }));
  }, []);

  const handleAddFeature = useCallback(() => {
    if (newFeature.trim()) {
      setProduct((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature("");
    }
  }, [newFeature]);

  const handleRemoveFeature = useCallback((index: number) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  }, []);

  const handleAddHighlight = useCallback(() => {
    if (newHighlight.trim()) {
      setProduct((prev) => ({
        ...prev,
        highlights: [...(prev.highlights || []), newHighlight.trim()],
      }));
      setNewHighlight("");
    }
  }, [newHighlight]);

  const handleRemoveHighlight = useCallback((index: number) => {
    setProduct((prev) => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index),
    }));
  }, []);

  const toggleSize = useCallback((size: string) => {
    setProduct((prev) => {
      const newSizes = prev.sizes?.includes(size)
        ? prev.sizes?.filter((s) => s !== size)
        : [...(prev.sizes || []), size];
      return { ...prev, sizes: newSizes };
    });
  }, []);

  const toggleColor = useCallback((color: string) => {
    setProduct((prev) => {
      const newColors = prev.colors?.includes(color)
        ? prev.colors?.filter((c) => c !== color)
        : [...(prev.colors || []), color];
      return { ...prev, colors: newColors };
    });
  }, []);

  const handleSave = useCallback(() => {
    const currentErrors = validateDetails(product);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      // Here you would typically send the updated product to your API
      console.log("Product updated:", product);
      alert("Product updated successfully!");
    }
  }, [product]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Edit Product</h1>

      <div className="mb-4 flex flex-col justify-between gap-3 rounded-lg border border-gray-200 bg-white p-2 lg:flex-row">
        <div className="flex gap-2">
          <div>
            {product.existingImages?.[0] ? (
              <Image
                src={product.existingImages[0]}
                alt="Product image"
                width={100}
                height={100}
                className="h-16 w-16 rounded-md object-cover"
              />
            ) : product.images?.[0] ? (
              <Image
                src={URL.createObjectURL(product.images[0])}
                alt="Product image"
                width={100}
                height={100}
                className="h-16 w-16 rounded-md object-cover"
              />
            ) : (
              <Image
                src={"/images/placeholder.jpg"}
                alt="Product image"
                width={100}
                height={100}
                className="h-16 w-16 rounded-md object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="font-semibold">
              {product.brand?.title || "Product"}
            </h2>
            <span className="text-sm">
              {product.category?.title || "category"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DynamicButton
            variant="outlineSussces"
            size="sm"
            icon={<Eye size={15} />}
            label={"View on store"}
          />
          <DynamicButton
            variant="success"
            size="sm"
            icon={<Save size={15} />}
            onClick={handleSave}
            label={"Save Product"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
        <div className="col-span-1 rounded-xl border border-gray-200 bg-white p-6 lg:col-span-6">
          <h1 className="mb-4 text-2xl font-bold">Product Details</h1>
          <div className="mb-6 rounded-md border border-gray-200 p-3">
            <div className="font-mono text-sm font-medium">
              {product.sku ?? "Not found SKU"}
            </div>
          </div>

          <h2 className="mb-4 text-xl font-semibold">Product Title</h2>
          {errors.title && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.title}
            </div>
          )}
          <input
            type="text"
            className="mb-6 w-full rounded-md border border-gray-300 p-3 focus:outline-none"
            placeholder="Enter product title"
            value={product.title || ""}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            aria-label="Product title"
          />

          <h2 className="mb-4 text-xl font-semibold">Product Description</h2>
          {errors.description && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.description}
            </div>
          )}
          <textarea
            className="mb-6 w-full resize-none rounded-md border border-gray-300 p-3 focus:outline-none"
            rows={5}
            placeholder="Enter detailed product description..."
            value={product.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            aria-label="Product description"
          />

          <h2 className="mb-4 text-xl font-semibold">Key Features</h2>
          <div className="mb-6">
            <div className="mb-2 flex">
              <input
                type="text"
                className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
                placeholder="Add a feature"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                aria-label="Add feature"
              />
              <button
                type="button"
                className="rounded-r-md bg-green-600 px-3 text-white hover:bg-green-700"
                onClick={handleAddFeature}
                disabled={!newFeature.trim()}
              >
                Add
              </button>
            </div>
            {product.features?.map((feature, index) => (
              <div
                key={index}
                className="mb-2 flex items-center rounded-md border border-gray-200 p-2"
              >
                <div className="flex-grow">{feature}</div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFeature(index)}
                  aria-label="Remove feature"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <h2 className="mb-4 text-xl font-semibold">Delivery Information</h2>
          <div className="mb-6">
            <label htmlFor="deliveryTime" className="mb-1 block text-gray-700">
              Delivery Time
            </label>
            <input
              type="text"
              id="deliveryTime"
              className="focus:ring-500 w-full rounded-md border border-gray-300 p-2 focus:outline-none"
              placeholder="e.g. 3-5 business days"
              value={product.deliveryTime || ""}
              onChange={(e) =>
                setProduct({ ...product, deliveryTime: e.target.value })
              }
              aria-label="Delivery time"
            />
          </div>
          <h2 className="mb-4 text-xl font-semibold">Product Highlights</h2>
          <div className="mb-6">
            <div className="mb-2 flex">
              <input
                type="text"
                className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
                placeholder="Add a feature"
                value={newHighlight}
                onChange={(e) => setNewFeature(e.target.value)}
                aria-label="Add feature"
              />
              <button
                type="button"
                className="rounded-r-md bg-green-600 px-3 text-white hover:bg-green-700"
                onClick={handleAddHighlight}
                disabled={!newHighlight.trim()}
              >
                Add
              </button>
            </div>
            {product.highlights?.map((highlight, index) => (
              <div
                key={index}
                className="mb-2 flex items-center rounded-md border border-gray-200 p-2"
              >
                <div className="flex-grow">{highlight}</div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveHighlight(index)}
                  aria-label="Remove Highlight"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-semibold">Pricing</h2>
          {errors.price && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.price}
            </div>
          )}
          {errors.price && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.price}
            </div>
          )}
          {errors.saleEnd && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.saleEnd}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="price" className="mb-1 block text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              id="de"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
              placeholder="e.g. 99.99"
              value={product.del_price ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: parseFloat(e.target.value),
                })
              }
              step="0.01"
              aria-label="Product price"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="mb-1 block text-gray-700">
              Sale Price ($) (Optional)
            </label>
            <input
              type="number"
              id="price"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
              placeholder="e.g. 79.99"
              value={product.price ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: parseFloat(e.target.value),
                })
              }
              step="0.01"
              aria-label="Product sale price"
            />
          </div>

          <h2 className="mb-4 text-xl font-semibold">Inventory & Weight</h2>
          {errors.stock && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.stock}
            </div>
          )}
          {errors.weightKg && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.weightKg}
            </div>
          )}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="mb-1 block text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
                placeholder="e.g. 100"
                value={product.stock ?? ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: parseInt(e.target.value, 10),
                  })
                }
                aria-label="Stock quantity"
              />
            </div>
            <div>
              <label htmlFor="weightKg" className="mb-1 block text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weightKg"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
                placeholder="e.g. 1.5"
                value={product.weightKg ?? ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    weightKg: parseFloat(e.target.value),
                  })
                }
                step="0.01"
                aria-label="Product weight in kilograms"
              />
            </div>
          </div>

          <h2 className="mb-4 text-xl font-semibold">Sizes</h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                type="button"
                key={size}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  product.sizes?.includes(size)
                    ? "bg-green-600 text-white"
                    : "border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => toggleSize(size)}
                aria-pressed={product.sizes?.includes(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-semibold">Colors</h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                type="button"
                key={color}
                style={{ backgroundColor: color }}
                className={`relative h-8 w-8 overflow-hidden rounded-full border border-gray-300 px-3 py-1 text-sm font-medium text-white sm:h-10 sm:w-10`}
                onClick={() => toggleColor(color)}
                aria-pressed={product.colors?.includes(color)}
              >
                {product.colors?.includes(color) && (
                  <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/25">
                    <Check size={15} />
                  </span>
                )}
              </button>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
          <div className="mb-6">
            <div className="mb-2 flex flex-wrap gap-2">
              <input
                type="text"
                className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
                placeholder="Key (e.g., Material)"
                value={newSpec.key}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, key: e.target.value })
                }
                aria-label="Specification key"
              />
              <input
                type="text"
                className="flex-grow rounded-r-md border border-gray-300 p-2 focus:outline-none"
                placeholder="Value (e.g., Cotton)"
                value={newSpec.value}
                onChange={(e) =>
                  setNewSpec({ ...newSpec, value: e.target.value })
                }
                aria-label="Specification value"
              />
              <button
                type="button"
                className="rounded-md bg-green-600 px-3 text-white hover:bg-green-700"
                onClick={handleAddSpecification}
                disabled={!newSpec.key || !newSpec.value}
              >
                Add
              </button>
            </div>
            {product.specifications?.map((spec, index) => (
              <div
                key={index}
                className="mb-2 flex items-center rounded-md border border-gray-200 p-2"
              >
                <div className="flex-grow">
                  <strong>{spec.key}:</strong> {spec.value}
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveSpecification(index)}
                  aria-label="Remove specification"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-xl font-semibold">Product Images</h2>
          {errors.images && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.images}
            </div>
          )}
          <div className="group mb-6 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 text-center transition-colors hover:border-green-500 hover:bg-green-50">
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
              aria-label="Upload images"
            />
            <label
              htmlFor="image-upload"
              className="flex cursor-pointer flex-col items-center justify-center text-gray-500 transition hover:text-green-600"
            >
              <ImageIcon
                className="mb-3 text-gray-400 transition-transform group-hover:scale-110"
                size={32}
              />
              <p className="text-base font-medium">Click to upload</p>
              <span className="text-sm text-gray-400">
                Max 10 images • JPG, PNG, WebP
              </span>
            </label>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {product.existingImages?.map((imageSrc, index) => (
              <div key={`existing-${index}`} className="relative">
                <Image
                  src={imageSrc}
                  alt={`Product existing image ${index + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
                  onClick={() => handleRemoveImage(index, true)}
                  aria-label={`Remove existing image ${index + 1}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {product.images?.map((file, index) => (
              <div key={`new-${index}`} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`New product image ${index + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
                  onClick={() => handleRemoveImage(index, false)}
                  aria-label={`Remove new image ${index + 1}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 h-fit rounded-xl border border-gray-200 bg-white p-3 lg:col-span-3">
          <HealthStatus product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
