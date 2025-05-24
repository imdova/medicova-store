import { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
} from "lucide-react";
import Image from "next/image";
import LogoLoader from "../LogoLoader";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  loading?: boolean;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ loading, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentNudgeIndex, setCurrentNudgeIndex] = useState(0);

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (product.images?.length ?? 1) - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product.images?.length ?? 1) - 1 : prev - 1,
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Auto-rotate nudges every 3 seconds
  const nudgeCount = product.nudges ? product.nudges.length : 0;

  useEffect(() => {
    if (nudgeCount === 0) return;

    const interval = setInterval(() => {
      setCurrentNudgeIndex((prev) => (prev === nudgeCount - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [nudgeCount]);

  return (
    <div className="group relative mx-auto h-full min-h-[300px] w-full cursor-pointer overflow-hidden rounded-xl border border-gray-300 bg-white p-2 shadow-sm">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LogoLoader className="w-[40px] animate-pulse text-gray-400" />
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {product.isBestSaller && (
            <span className="absolute left-3 top-3 z-[2] rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white">
              Best Saller
            </span>
          )}
          {/* Product Slider */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <Link href={`/product-details/${product.id}`}>
                <Image
                  width={200}
                  height={200}
                  src={
                    product.images?.[currentImageIndex] ||
                    "/images/placeholder.jpg"
                  }
                  alt={product.title}
                  className="h-64 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </Link>

              {/* Image Navigation Arrows */}
              {(product.images?.length ?? 0) > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute -left-1 top-1/2 -translate-x-8 -translate-y-1/2 rounded-md bg-black/30 p-1.5 text-white transition duration-200 hover:bg-black/50 group-hover:-translate-x-0"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-8 rounded-md bg-black/30 p-1.5 text-white transition duration-200 hover:bg-black/50 group-hover:-translate-x-0"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail Navigation */}
            {(product.images?.length ?? 0) > 1 && (
              <div className="invisible absolute bottom-2 left-0 right-0 mx-auto flex w-fit justify-center gap-1 rounded-full bg-gray-100 px-2 py-1 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
                {product.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      selectImage(index);
                    }}
                    className={`h-1 rounded-full transition duration-200 ${currentImageIndex === index ? "w-4 bg-gray-700" : "w-1 bg-gray-400"}`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="absolute bottom-2 left-2 rounded-md bg-white px-2">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-light-primary text-light-primary" />
                <span className="ml-1 text-sm text-gray-500">
                  {product.rating?.toFixed(1)}
                </span>
              </div>
            </div>
            <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-medium text-gray-700 transition duration-150 hover:bg-light-primary hover:text-white">
              <ShoppingCart size={16} />
            </button>
            <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-medium text-gray-700 transition duration-150 hover:bg-light-primary hover:text-white">
              <Heart size={16} />
            </button>
          </div>

          <Link
            href={`/product-details/${product.id}`}
            className="flex h-full flex-1 flex-col justify-between"
          >
            {/* Product Info */}
            <div className="p-1">
              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {product.title}
              </h3>

              <div className="mt-1 flex items-center gap-3 text-sm">
                <p>
                  EGP{" "}
                  <span className="text-lg font-bold">
                    {product.price.toLocaleString()}
                  </span>
                </p>
                {product.del_price && (
                  <del className="text-sm text-gray-600">
                    {product.del_price.toLocaleString()}
                  </del>
                )}
                {product.sale && (
                  <span className="text-xs font-bold text-light-primary">
                    {product.sale}
                  </span>
                )}
              </div>

              {/* Nudges Slider - Fixed to match screenshot */}
              <div className="relative mt-1 h-6 overflow-hidden">
                <div
                  className="flex flex-col transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateY(-${currentNudgeIndex * 24}px)`,
                  }}
                >
                  {product.nudges?.map((nudge, index) => (
                    <div
                      key={index}
                      className="flex h-6 items-center text-xs text-gray-600"
                    >
                      {nudge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {product.deliveryDate && (
              <div className="mt-2 flex items-center text-xs font-semibold">
                <span className="rounded bg-light-primary px-2 py-1 text-white">
                  Express
                </span>
              </div>
            )}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
