import { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
} from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  brand: string;
  model: string;
  title: string;
  specs: string[];
  price: number;
  del_price: number;
  status: string;
  images: string[];
  rating: number;
  sale: string;
  isBestSaller: boolean;
}

const ProductCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dummy product data
  const product: Product = {
    id: "1",
    brand: "Samsung",
    model: "S24 Ultra",
    title:
      "REAL TECHNIQUES Everyday Essentials Multi Use Brush Set Multicolour ",
    specs: [
      "5G Dual SIM Titanium Gray",
      "12GB RAM 256GB - Middle East Version",
    ],
    price: 55.999,
    del_price: 80.999,
    status: "Selling out fast",
    rating: 4.5,
    sale: "50%",
    images: [
      "/images/Watches.jpg",
      "/images/medical_wear.jpg",
      "/images/Watches.jpg",
    ],
    isBestSaller: true,
  };

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="group relative mx-auto max-w-md overflow-hidden rounded-xl border border-gray-300 bg-white p-2 shadow-sm">
      {product.isBestSaller && (
        <span className="absolute left-3 top-3 z-[2] rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white">
          Best Saller
        </span>
      )}
      {/* Product Slider */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <Image
            width={200}
            height={200}
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="h-64 w-full rounded-lg object-cover"
          />

          {/* Image Navigation Arrows */}
          {product.images.length > 1 && (
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
        {product.images.length > 1 && (
          <div className="invisible absolute bottom-2 left-0 right-0 mx-auto flex w-fit justify-center gap-1 rounded-full bg-gray-100 px-2 py-1 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100">
            {product.images.map((_, index) => (
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
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <button className="absolute bottom-2 right-2 rounded-lg bg-white px-4 py-1 text-sm font-medium text-gray-700 transition duration-150 hover:bg-light-primary hover:text-white">
          <ShoppingCart size={16} />
        </button>
        <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-medium text-gray-700 transition duration-150 hover:bg-light-primary hover:text-white">
          <Heart size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mt-2 text-sm font-semibold text-gray-700">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <p>
            EGP <span className="text-xl font-bold">{product.price}</span>
          </p>
          {product.del_price && (
            <del className="text-sm text-gray-600">{product.del_price}</del>
          )}
          {product.sale && (
            <span className="font-bold text-light-primary">{product.sale}</span>
          )}
        </div>

        <div className="mt-3 flex items-center text-sm font-semibold">
          <span
            style={{ borderRadius: "93% 7% 88% 12% / 51% 77% 23% 49% " }}
            className="mr-2 rounded bg-light-primary px-3 py-1 pt-2"
          >
            Express
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
