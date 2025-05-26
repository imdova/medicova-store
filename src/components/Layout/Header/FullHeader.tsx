"use client";
import { commonLinks } from "@/constants/header";
import Link from "next/link";
import {
  ChevronDown,
  CirclePercent,
  Heart,
  MapPin,
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
import DeliverToModal from "@/components/UI/Modals/DeliverToModal";

type Address = {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  details: string;
  area: string;
  city: string;
  isDefault: boolean;
  location: {
    lat: number;
    lng: number;
  };
};

const FullHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<
    Address | null | undefined
  >({
    id: "1",
    type: "home",
    name: "",
    details: "",
    area: "",
    city: "Cairo",
    isDefault: false,
    location: { lat: 30.0444, lng: 31.2357 },
  });
  const [userSavedAddresses, setUserSavedAddresses] = useState<Address[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const { products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setProductsCount(products.length);
    setUserSavedAddresses([]);
  }, [products]);

  return (
    <header className="relative z-40">
      <div className="min-h-[70px] w-full bg-white py-3 shadow-md transition-all duration-700 md:bg-primary md:shadow-none">
        <div className="relative">
          <div className="container mx-auto px-6 lg:max-w-[1440px]">
            <div className="mb-4 hidden flex-col items-center justify-between gap-6 sm:flex-row md:flex lg:hidden">
              <div className="flex w-full items-center justify-between gap-3 sm:w-fit">
                <h3 className="flex items-center gap-1 text-xs font-semibold text-white">
                  <RotateCcw size={18} />
                  Free & Easy Returns
                </h3>
                <h3 className="flex items-center gap-1 text-xs font-semibold text-white">
                  <CirclePercent size={18} />
                  Best Deals
                </h3>
                <span
                  className="block cursor-pointer text-xs text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  Delivery to{" "}
                  <span className="flex items-center gap-1 font-semibold">
                    {selectedAddress?.city} <ChevronDown size={12} />
                  </span>
                </span>
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
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="flex items-end gap-1 text-xl font-bold text-gray-800"
                  >
                    <LogoIcon className="h-10 w-20 text-primary md:w-28 md:text-white" />
                  </Link>
                </div>
                <span
                  className="hidden max-w-20 cursor-pointer text-xs text-white lg:block"
                  onClick={() => setIsModalOpen(true)}
                >
                  Delivery to{" "}
                  <span className="flex items-center gap-1 font-semibold">
                    {selectedAddress?.city} <ChevronDown size={12} />
                  </span>
                </span>
              </div>
              {/* search component  */}
              <div className="w-full md:max-w-2xl">
                <SearchComponent />
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-gray-100 md:hidden md:text-white">
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
            <span
              className="mt-2 flex cursor-pointer items-center gap-1 text-xs text-primary md:hidden md:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <span>
                <MapPin size={14} />
              </span>
              Delivery to{" "}
              <span className="flex items-center gap-1 font-semibold">
                {selectedAddress?.city} <ChevronDown size={12} />
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* Categories Navigation */}
      <div className="hidden flex-1 md:block">
        <SwipeableNav links={commonLinks} />
      </div>
      <DeliverToModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentAddress={selectedAddress}
        onAddressSelect={(address) => {
          setSelectedAddress(address);
          localStorage.setItem("userAddress", JSON.stringify(address));
        }}
        locale="en"
        savedAddresses={userSavedAddresses}
      />
    </header>
  );
};

export default FullHeader;
