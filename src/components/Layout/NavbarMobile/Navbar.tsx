"use clinet";
import Link from "next/link";
import { isCurrentPage } from "@/util";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/constants/navbar";

const Navbar = () => {
  const pathname = usePathname();

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
                className={`rounded-full p-2 ${CurrentPage ? "bg-green-50" : ""}`}
              >
                {IconComponent && <IconComponent size={18} />}
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
