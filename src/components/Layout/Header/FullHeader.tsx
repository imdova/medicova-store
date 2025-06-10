"use client";
import { commonLinks } from "@/constants/header";
import Link from "next/link";
import {
  ChevronDown,
  CirclePercent,
  Heart,
  MapPin,
  Menu,
  RotateCcw,
  ShoppingCart,
} from "lucide-react";
import LogoIcon from "@/assets/icons/logo";
import SearchComponent from "@/components/Forms/formFields/SearchComponent";
import SwipeableNav from "./SwipeableNav";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import DeliverToModal from "@/components/UI/Modals/DeliverToModal";
import AuthButton from "@/components/UI/Buttons/AuthButton";
import { Drawer } from "@/components/UI/Drawer";
import Collapse from "@/components/UI/Collapse";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/Modals/DynamicModal";
import AuthLogin from "@/components/UI/Modals/loginAuth";
import { AccountPageProps } from "@/app/(auth)/user/types/account";

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

const FullHeader: React.FC<AccountPageProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLogOpen, setIsModalLogOpen] = useState(false);
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
  const [productsCount, setProductsCount] = useState(0);
  const [productsCountWishlist, setProductsCountWishlist] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useAppSelector((state) => state.cart);
  const { products: wishlistData } = useAppSelector((state) => state.wishlist);
  const session = useSession();
  const router = useRouter();
  const handdleLogin = () => {
    if (session.data?.user) {
      router.push("/wishlist");
    } else {
      setIsModalLogOpen(true);
    }
  };

  useEffect(() => {
    setProductsCount(products.length);
    setProductsCountWishlist(wishlistData.length);
  }, [products, wishlistData]);

  return (
    <>
      <header className="relative z-40">
        <div className="min-h-[70px] w-full bg-white transition-all duration-700 md:bg-primary">
          <div className="relative">
            <div className="container mx-auto p-3 lg:max-w-[1440px]">
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
                    className="flex cursor-pointer flex-wrap items-center gap-1 text-xs text-white"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Delivery to{" "}
                    <span className="flex items-center gap-1 font-semibold">
                      {selectedAddress?.city} <ChevronDown size={12} />
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsOpen(true)}>
                    <Menu size={18} className="text-gray-600 md:hidden" />
                  </button>
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
                  <Suspense>
                    <SearchComponent />
                  </Suspense>
                </div>

                {/* Right-side Icons */}
                <div className="flex">
                  <div className="hidden lg:block">
                    <AuthButton />
                  </div>

                  <div className="flex items-center gap-4 md:px-4">
                    <button
                      onClick={handdleLogin}
                      className="relative items-center gap-2 text-sm font-semibold text-primary md:text-white"
                    >
                      <Heart size={20} />
                      {/* Animate cart badge */}
                      <AnimatePresence>
                        {productsCountWishlist > 0 && (
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
                            className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white md:bg-white md:text-primary"
                          >
                            {productsCountWishlist}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                    <Link
                      href={`/cart`}
                      className="relative hidden items-center gap-2 text-sm font-semibold hover:text-gray-100 md:text-white lg:flex"
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
        {/* Categories Navigation  */}
        <div className="hidden flex-1 md:block">
          <SwipeableNav links={commonLinks} />
        </div>
      </header>
      <div className="relative">
        <DeliverToModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentAddress={selectedAddress}
          onAddressSelect={(address) => {
            setSelectedAddress(address);
            localStorage.setItem("userAddress", JSON.stringify(address));
          }}
          locale="en"
        />
      </div>
      {/* Mobile Navigation */}
      <Drawer
        logo={
          <Link className="block w-fit p-3" href={"/"}>
            <LogoIcon className="h-14 w-28 text-primary md:text-white" />
          </Link>
        }
        position="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <nav>
          <div className="flex flex-col p-2">
            {commonLinks.map((link, index) => (
              <div
                className="border-b border-gray-100 last-of-type:border-none"
                key={index}
              >
                {/* sublinks links */}
                {link.subLinks && link.subLinks.length > 0 && (
                  <Collapse url={link.url} key={link.title} title={link.title}>
                    <ul>
                      {link.subLinks.map((subLink, subIndex) => (
                        <li
                          className="text-gray-600 transition hover:text-primary"
                          key={subIndex}
                        >
                          <Link
                            className="block p-1 text-xs"
                            href={subLink.url}
                          >
                            {subLink.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}
                {/* grid list links */}
                {link.gridLinks && link.gridLinks.length > 0 && (
                  <Collapse url={link.url} key={link.title} title={link.title}>
                    <div>
                      <ul className="text-xs">
                        {link.gridLinks.map((gridLink, gridIndex) => (
                          <Collapse
                            url={link.url}
                            title={gridLink.heading}
                            key={gridIndex}
                            size="sm"
                            fontSize="sm"
                          >
                            <li>
                              <ul>
                                {gridLink.subLinks.map((link, index) => {
                                  return (
                                    <li key={index}>
                                      <Link
                                        className="block p-2 text-xs text-gray-600 transition hover:text-primary"
                                        href={link.url}
                                      >
                                        {link.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          </Collapse>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                )}
                {/* Normal links */}
                {!link.gridLinks && !link.subLinks && (
                  <ul>
                    <li className="text-gray-600 transition hover:text-main">
                      <Link
                        className="block p-2 text-xs font-semibold text-gray-800"
                        href={link.url}
                      >
                        {link.title}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </nav>
      </Drawer>
      <Modal
        isOpen={isModalLogOpen}
        onClose={() => setIsModalLogOpen(false)}
        size="lg"
      >
        <AuthLogin redirect="/account/wishlist" />
      </Modal>
    </>
  );
};

export default FullHeader;
