import { NavLink } from "@/types";
import { Grid, Home, ShoppingCart, User } from "lucide-react";

export const NavbarLinks: NavLink[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Categories", path: "/categories", icon: Grid },
  { name: "Account", path: "/account", icon: User },
  { name: "Cart", path: "/cart", icon: ShoppingCart },
];
