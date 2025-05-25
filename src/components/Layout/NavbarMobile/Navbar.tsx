"use clinet";
import Link from "next/link";
import { isCurrentPage } from "@/util";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/constants/navbar";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [productsCount, setProductsCount] = useState(0);
  const { products } = useAppSelector((state) => state.cart);

  useEffect(() => {
    setProductsCount(products.length);
  }, [products]);

  return (
    <nav
      style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      className="fixed bottom-0 z-50 w-full bg-white md:hidden"
    >
      <div className="flex h-16 items-center justify-around">
        {NavbarLinks.map((link) => {
          const CurrentPage = isCurrentPage(pathname, link.path);
          const IconComponent = link.icon;

          return (
            <Link
              key={link.name}
              href={link.path}
              className={`flex h-full w-full flex-col items-center justify-center ${
                CurrentPage ? "text-primary" : "text-gray-600"
              }`}
            >
              <div
                className={`relative rounded-full p-2 ${CurrentPage ? "bg-green-50" : ""}`}
              >
                {IconComponent && <IconComponent size={18} />}
                {link.name === "Cart" && (
                  <>
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
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary text-white"
                        >
                          {productsCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
              <span className="text-xs font-semibold">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
