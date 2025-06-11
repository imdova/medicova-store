"use client";

import { useState, useCallback, JSX } from "react";
import {
  ChevronRight,
  Search,
  Clipboard,
  Image as ImageIcon,
  X,
  Check,
  Info,
  AlertCircle,
  ChevronLeft,
  Save,
  Eye,
} from "lucide-react";
import { allCategories } from "@/constants/categouries";
import { CategoryType, MultiCategory } from "@/types";
import { brands } from "@/constants/brands";
import Image from "next/image";
import DynamicButton from "@/components/UI/Buttons/DynamicButton";

type Brand = {
  id: string;
  name: string;
};

type PricingMethod = "manual" | "auto";

type Specification = {
  key: string;
  value: string;
};
// Define the component props
type CategoryItemProps = {
  category: CategoryType;
  onSelect: (category: CategoryType) => void;
  onNavigate: (category: CategoryType) => void;
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

// Predefined options for sizes and colors
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

const validateCategory = (product: ProductDetails): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!product.category || Object.keys(product.category).length === 0) {
    errors.category = "Category is required";
  }
  return errors;
};

const validateBrand = (product: ProductDetails): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!product.brand || Object.keys(product.brand).length === 0) {
    errors.brand = "Brand is required";
  }
  return errors;
};

const validateIdentity = (product: ProductDetails): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!product.sku) {
    errors.sku = "SKU is required";
  } else if (product.sku.length < 3) {
    errors.sku = "SKU must be at least 3 characters";
  }
  return errors;
};

const validateDetails = (product: ProductDetails): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!product.title) {
    errors.title = "Product title is required";
  } else if (product.title.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (product.del_price === undefined || product.del_price === null) {
    errors.del_price = "del_price is required";
  } else if (
    typeof product.del_price !== "number" ||
    isNaN(product.del_price) ||
    product.del_price < 0
  ) {
    errors.del_price = "Price must be a positive number";
  }

  if (product.saleStart) {
    if (product.price === undefined || product.price === null) {
      errors.salePrice = "Sale price is required when sale dates are set";
    } else if (
      typeof product.price !== "number" ||
      isNaN(product.price) ||
      product.price < 0
    ) {
      errors.salePrice = "Sale price must be a positive number";
    } else if (product.price >= (product.price || 0)) {
      errors.salePrice = "Sale price must be less than regular price";
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

  if (!product.images || product.images.length === 0) {
    errors.images = "At least one image is required";
  } else if (product.images.length > 10) {
    errors.images = "Maximum 10 images allowed";
  }

  if (product.weightKg !== undefined && product.weightKg < 0) {
    errors.weightKg = "Weight must be a positive number";
  }

  if (product.stock !== undefined && product.stock < 0) {
    errors.stock = "Stock must be a positive number";
  }

  return errors;
};

// Separate component for category items
const CategoryItem = ({
  category,
  onSelect,
  onNavigate,
}: CategoryItemProps): JSX.Element => {
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between p-2 text-left hover:bg-gray-100"
      onClick={() => {
        if (hasSubcategories) {
          onNavigate(category);
        } else {
          onSelect(category);
        }
      }}
    >
      <div>
        <div>{category.title}</div>
        {category.slug && (
          <div className="text-sm text-gray-500">{category.slug}</div>
        )}
      </div>
      {hasSubcategories && (
        <div className="flex items-center">
          <span className="mr-2 text-xs text-gray-400">
            {category.subCategories?.length} subcategories
          </span>
          <ChevronRight className="text-gray-400" size={16} />
        </div>
      )}
    </button>
  );
};

const HealthStatus = ({ product }: { product: ProductDetails }) => {
  // Check each health condition
  const invoicingValid = true; // Placeholder, assuming invoicing is always valid for now
  const priceValid = product.price !== undefined && product.price >= 0;
  const pskuActive = !!product.sku && product.sku.length >= 3;
  const stockAvailable = product.stock !== undefined && product.stock > 0;
  const productActive =
    !!product.title &&
    !!product.description &&
    (product.images?.length || 0) > 0;

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

const ProductCreationWizard = () => {
  type Step = "category" | "brand" | "identity" | "details";
  const [step, setStep] = useState<Step>("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentParentCategory, setCurrentParentCategory] =
    useState<CategoryType | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
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
  const [newSpec, setNewSpec] = useState<Specification>({ key: "", value: "" });
  const [newFeature, setNewFeature] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  const filteredCategories = allCategories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const validateStep = useCallback(() => {
    let currentErrors: ValidationErrors = {};

    switch (step) {
      case "category":
        currentErrors = validateCategory(product);
        if (Object.keys(currentErrors).length === 0) {
          setStep("brand");
        }
        break;
      case "brand":
        currentErrors = validateBrand(product);
        if (Object.keys(currentErrors).length === 0) {
          setStep("identity");
        }
        break;
      case "identity":
        currentErrors = validateIdentity(product);
        if (Object.keys(currentErrors).length === 0) {
          setStep("details");
        }
        break;
      case "details":
        currentErrors = validateDetails(product);
        if (Object.keys(currentErrors).length === 0) {
          console.log("Product submitted:", product);
          alert("Product created successfully!");
          // Reset product for new creation or navigate to confirmation
          setProduct({
            id: "",
            pricingMethod: "manual",
            specifications: [],
            images: [],
            features: [],
            highlights: [],
            sizes: [],
            colors: [],
          });
          setStep("category"); // Go back to the first step
        }
        break;
      default:
        console.warn("Unknown validation step:", step);
    }

    setErrors(currentErrors);
  }, [step, product]);

  const handleCategorySelect = useCallback((category: CategoryType) => {
    setProduct((prev) => ({ ...prev, category }));
    setSearchTerm("");
  }, []);

  const handleBrandSelect = useCallback((brand: Brand) => {
    setProduct((prev) => ({ ...prev, brand }));
    setSearchTerm("");
  }, []);

  const generateSku = useCallback(() => {
    const randomPart = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    return `PSKU_${randomPart}_${Date.now()}`;
  }, []);

  const handleGenerateSku = useCallback(() => {
    setProduct((prev) => ({ ...prev, sku: generateSku() }));
  }, [generateSku]);

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages = Array.from(files).slice(
        0,
        10 - (product.images?.length || 0),
      ); // Only allow adding up to 10 images total
      setProduct((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
      }));
    },
    [product.images],
  );

  const handleRemoveImage = useCallback((index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }));
  }, []);

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

  const renderStepIndicator = (
    stepName: Step,
    stepNumber: number,
    label: string,
  ) => {
    const isActive = step === stepName;
    const isCompleted =
      (stepName === "category" && product.category) ||
      (stepName === "brand" && product.brand) ||
      (stepName === "identity" && product.sku);

    return (
      <button
        type="button"
        className={`flex items-center ${isActive ? "font-medium text-green-600" : "text-gray-500"}`}
        onClick={() => {
          if (stepName === "category") setStep("category");
          if (stepName === "brand" && product.category) setStep("brand");
          if (stepName === "identity" && product.brand) setStep("identity");
          if (stepName === "details" && product.sku) setStep("details");
        }}
        disabled={
          (stepName === "brand" && !product.category) ||
          (stepName === "identity" && !product.brand) ||
          (stepName === "details" && !product.sku)
        }
      >
        <span
          className={`mr-2 hidden h-6 w-6 items-center justify-center rounded-full md:flex ${
            isActive
              ? "bg-green-100"
              : isCompleted
                ? "bg-green-100 text-green-600"
                : "bg-gray-100"
          }`}
        >
          {isCompleted && !isActive ? <Check size={15} /> : stepNumber}
        </span>
        {label}
        {stepName !== "details" && <ChevronRight className="mx-2" size={16} />}
      </button>
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Product Creation</h1>

      <div className="grid w-full overflow-x-auto">
        {/* Stepper */}
        <div className="mb-8 flex w-full min-w-[270px] snap-x gap-2 overflow-x-auto rounded-lg border border-gray-200 bg-white p-2">
          {renderStepIndicator("category", 1, "Category")}
          {renderStepIndicator("brand", 2, "Brand")}
          {renderStepIndicator("identity", 3, "Identity")}
          {renderStepIndicator("details", 4, "Details")}
        </div>
      </div>
      {/* Category Step */}
      {step === "category" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          {/* Header with back button if in subcategory view */}
          <div className="mb-4 flex items-center">
            {currentParentCategory && (
              <button
                type="button"
                className="mr-2 flex items-center text-gray-600 hover:text-gray-800"
                onClick={() => setCurrentParentCategory(null)}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-semibold">
              {currentParentCategory
                ? currentParentCategory.title
                : "Select Product Category"}
            </h2>
          </div>

          {errors.category && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.category}
            </div>
          )}

          {/* Search input */}
          <div className="mb-6">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none"
                placeholder={
                  currentParentCategory
                    ? "Search subcategories"
                    : "Search categories"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search categories"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category list */}
          {searchTerm ? (
            // Search results
            <div className="mb-2 max-h-[250px] space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-2">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    onSelect={handleCategorySelect}
                    onNavigate={setCurrentParentCategory}
                  />
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">
                  No categories found
                </div>
              )}
            </div>
          ) : (
            // Regular category list
            <>
              <div className="mb-2 max-h-[250px] overflow-y-auto rounded-lg border border-gray-200 p-2">
                {(currentParentCategory?.subCategories ?? allCategories).map(
                  (category, index) => (
                    <CategoryItem
                      key={index}
                      category={category}
                      onSelect={handleCategorySelect}
                      onNavigate={setCurrentParentCategory}
                    />
                  ),
                )}
              </div>

              {/* Selected category indicator */}
              {product.category && (
                <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-3">
                  <div className="font-medium">{product.category.title}</div>
                  <div className="text-sm text-green-600">Selected</div>
                </div>
              )}
            </>
          )}

          {/* Next button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!product.category}
              onClick={validateStep}
            >
              Next: Brand
            </button>
          </div>
        </div>
      )}

      {/* Brand Step */}
      {step === "brand" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Select Brand</h2>
          {errors.brand && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.brand}
            </div>
          )}
          <div className="mb-6">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:outline-none"
                placeholder="Search brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search brands"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 max-h-[250px] space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-2">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <button
                  type="button"
                  key={brand.id}
                  className={`w-full cursor-pointer rounded-md border p-3 text-left ${
                    product.brand?.id === brand.id
                      ? "border-green-500 bg-green-50"
                      : "border-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  {brand.name}
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No brands found
              </div>
            )}
          </div>

          {product.brand && (
            <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-3">
              <div className="font-medium">{product.brand.name}</div>
              <div className="text-sm text-green-600">Selected</div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setStep("category")}
            >
              Back
            </button>
            <button
              type="button"
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!product.brand}
              onClick={validateStep}
            >
              Next: Identity
            </button>
          </div>
        </div>
      )}

      {/* Identity Step */}
      {step === "identity" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Product Identity</h2>
          {errors.sku && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
              {errors.sku}
            </div>
          )}

          <div className="mb-6">
            <h3 className="mb-2 font-medium">Manual SKU Entry</h3>
            <div className="flex">
              <input
                type="text"
                className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none"
                placeholder="Enter your SKU"
                value={product.sku || ""}
                onChange={(e) =>
                  setProduct({ ...product, sku: e.target.value })
                }
                aria-label="Enter SKU manually"
              />
              <button
                type="button"
                className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                onClick={() => product.sku && validateStep()}
                disabled={!product.sku}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="my-4 text-center text-gray-500">or</div>

          <button
            type="button"
            className="flex w-full flex-col items-center rounded-md border-2 border-dashed border-gray-300 py-3 hover:border-green-500 hover:bg-green-50"
            onClick={handleGenerateSku}
          >
            <Clipboard className="mb-2 text-gray-400" size={24} />
            <span className="text-sm text-gray-600">
              Generate SKU Automatically
            </span>
          </button>

          {product.sku && (
            <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4">
              <div className="font-medium">SKU Generated</div>
              <div className="mt-1 font-mono text-sm">{product.sku}</div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={() => setStep("brand")}
            >
              Back
            </button>
            <button
              type="button"
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={!product.sku}
              onClick={validateStep}
            >
              Next: Details
            </button>
          </div>
        </div>
      )}

      {/* Details Step */}
      {step === "details" && (
        <div>
          <div className="mb-4 flex flex-col justify-between gap-3 rounded-lg border border-gray-200 bg-white p-2 lg:flex-row">
            <div className="flex gap-2">
              <div>
                {product.images?.[0] ? (
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
                  {product.brand?.name || "Product"}
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
                onClick={validateStep}
                label={"Create Product"}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
            <div className="col-span-1 rounded-xl border border-gray-200 bg-white p-6 lg:col-span-6">
              <h1 className="mb-4 text-2xl font-bold">Product Details</h1>
              <div className="mb-6 rounded-md border border-gray-200 p-3">
                <div className="font-mono text-sm font-medium">
                  {product.sku}
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
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
                aria-label="Product title"
              />

              <h2 className="mb-4 text-xl font-semibold">
                Product Description
              </h2>
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
              <h2 className="mb-4 text-xl font-semibold">
                Delivery Information
              </h2>
              <div className="mb-6">
                <label
                  htmlFor="deliveryTime"
                  className="mb-1 block text-gray-700"
                >
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
                    placeholder="Add a highlight"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    aria-label="Add highlight"
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
                      aria-label="Remove highlight"
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
              {errors.salePrice && (
                <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  {errors.salePrice}
                </div>
              )}
              {errors.saleEnd && (
                <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  {errors.saleEnd}
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="del_price" className="mb-1 block text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="del_price"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
                  placeholder="e.g. 99.99"
                  value={product.del_price ?? ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      del_price: parseFloat(e.target.value),
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
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="saleStart"
                    className="mb-1 block text-gray-700"
                  >
                    Sale Start Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="saleStart"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
                    value={product.saleStart || ""}
                    onChange={(e) =>
                      setProduct({ ...product, saleStart: e.target.value })
                    }
                    aria-label="Sale start date"
                  />
                </div>
                <div>
                  <label htmlFor="saleEnd" className="mb-1 block text-gray-700">
                    Sale End Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="saleEnd"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none"
                    value={product.saleEnd || ""}
                    onChange={(e) =>
                      setProduct({ ...product, saleEnd: e.target.value })
                    }
                    aria-label="Sale end date"
                  />
                </div>
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
                  <label
                    htmlFor="weightKg"
                    className="mb-1 block text-gray-700"
                  >
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
              <div className="mb-6">
                <label
                  htmlFor="imageUpload"
                  className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-8 text-center transition hover:border-green-500 hover:bg-green-50"
                >
                  <ImageIcon
                    className="mb-3 text-gray-400 transition-transform group-hover:scale-110"
                    size={32}
                  />
                  <p className="text-base font-medium text-gray-600 group-hover:text-green-600">
                    Click or drag to upload
                  </p>
                  <span className="mt-1 text-sm text-gray-400">
                    Max 10 images • JPG, PNG, WebP
                  </span>

                  <input
                    id="imageUpload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    aria-label="Upload product images"
                  />
                </label>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {product.images?.map((image, index) => (
                    <div key={index} className="relative h-32 w-32 rounded-md">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Product image ${index + 1}`}
                        width={100}
                        height={100}
                        className="h-full w-full rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-75"
                        onClick={() => handleRemoveImage(index)}
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setStep("identity")}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="col-span-1 h-fit rounded-xl border border-gray-200 bg-white p-3 lg:col-span-3">
              <HealthStatus product={product} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCreationWizard;
