"use client";
import { commonLinks } from "@/constants/header";
import Link from "next/link";
import {
  CirclePercent,
  Heart,
  RotateCcw,
  ShoppingCart,
  User,
} from "lucide-react";
import LogoIcon from "@/assets/icons/logo";
import SearchComponent from "@/components/Forms/formFields/SearchComponent";
import SwipeableNav from "./SwipeableNav";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FullHeader: React.FC = () => {
  const [productsCount, setProductsCount] = useState(0);
  const { products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setProductsCount(products.length);
  }, [products]);

  return (
    <header className="relative z-40">
      <div className="min-h-[70px] w-full bg-primary py-3 transition-all duration-700">
        <div className="relative">
          <div className="container mx-auto px-6 lg:max-w-[1440px]">
            <div className="mb-4 hidden flex-col items-center justify-between gap-6 sm:flex-row md:flex lg:hidden">
              <div className="flex w-full items-center justify-between gap-2 sm:w-fit">
                <h3 className="flex items-center gap-1 text-xs font-semibold text-white">
                  <RotateCcw size={18} />
                  Free & Easy Returns
                </h3>
                <h3 className="flex items-center gap-1 text-xs font-semibold text-white">
                  <CirclePercent size={18} />
                  Best Deals
                </h3>
              </div>
              {/* Top actions  */}
              <div className="flex items-center">
                <button className="border-r border-gray-200 px-4 text-white">
                  العربية
                </button>
                <button className="flex items-center gap-2 border-r border-gray-200 px-4 text-sm font-semibold text-white hover:text-gray-100">
                  Log in <User size={18} />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100">
                    <Heart size={20} />
                  </button>
                  <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-end gap-1 text-xl font-bold text-gray-800"
                >
                  <LogoIcon className="h-10 w-20 text-white md:w-28" />
                </Link>
              </div>
              {/* search component  */}
              <div className="w-full md:max-w-2xl">
                <SearchComponent />
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100 md:hidden">
                <Heart size={20} />
              </button>
              {/* Right-side Icons */}
              <div className="hidden items-center lg:flex">
                <button className="border-r border-gray-200 px-4 text-white">
                  العربية
                </button>
                <button className="flex min-w-[100px] items-center gap-2 border-r border-gray-200 px-4 text-sm font-semibold text-white hover:text-gray-100">
                  Log in <User size={18} />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100">
                    <Heart size={20} />
                  </button>
                  <Link
                    href={`/cart`}
                    className="relative flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100"
                  >
                    <ShoppingCart size={20} />

                    {/* Animate cart badge */}
                    <AnimatePresence>
                      {productsCount > 0 && (
                        <motion.span
                          key="cart-badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-primary"
                        >
                          {productsCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Categories Navigation */}
      <div className="hidden flex-1 md:block">
        <SwipeableNav links={commonLinks} />
      </div>
    </header>
  );
};

export default FullHeader;
