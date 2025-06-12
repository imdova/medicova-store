"use client";
import Link from "next/link";
import { Home, Menu, ShoppingCart } from "lucide-react";
import LogoIcon from "@/assets/icons/logo";
import SearchComponent from "@/components/Forms/formFields/SearchComponent";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { Drawer } from "@/components/UI/Drawer";
import Sidebar from "@/components/Layout/sidebar/Sidebar";
import { AccountPageProps } from "@/app/(auth)/user/types/account";

const MinimalHeader: React.FC<AccountPageProps> = ({ user, activeSection }) => {
  const [productsCount, setProductsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setProductsCount(products.length);
  }, [products]);

  return (
    <>
      <header className="relative z-40">
        <div className="min-h-[70px] w-full bg-primary transition-all duration-700">
          <div className="relative">
            <div className="container mx-auto p-3 lg:max-w-[1440px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsOpen(true)}>
                    <Menu size={18} className="text-white lg:hidden" />
                  </button>
                  {/* Logo */}
                  <div className="flex items-center">
                    <Link
                      href="/"
                      className="flex items-end gap-1 text-xl font-bold text-gray-800"
                    >
                      <LogoIcon className="h-10 w-20 text-white md:w-28" />
                    </Link>
                  </div>
                </div>
                {/* search component  */}
                <div className="hidden w-full md:block md:max-w-5xl">
                  <Suspense>
                    <SearchComponent />
                  </Suspense>
                </div>
                {/* Right-side Icons */}
                <div className="flex items-center">
                  <div className="flex items-center gap-4 px-4">
                    <Link
                      href={"/"}
                      className="flex items-center gap-2 text-sm font-semibold text-white hover:text-gray-100"
                    >
                      <Home size={20} />
                    </Link>
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
              {/* search component  */}
              <div className="block w-full md:hidden">
                <Suspense>
                  <SearchComponent />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Drawer position="left" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sidebar user={user} activeSection={activeSection} />
      </Drawer>
    </>
  );
};

export default MinimalHeader;
