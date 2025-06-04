import {
  Home,
  Grid,
  User,
  ShoppingCart,
  Package,
  Settings,
  Users,
  LayoutDashboard,
} from "lucide-react";

export const NavbarLinks = {
  user: [
    { name: "Home", path: "/", icon: Home },
    { name: "Categories", path: "/categories", icon: Grid },
    { name: "Account", path: "/user/profile", icon: User },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
  ],
  seller: [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/seller/products", icon: Package },
    { name: "Dashboard", path: "/seller", icon: LayoutDashboard },
    { name: "Settings", path: "/seller/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Account", path: "/account/profile", icon: User },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],
};
