import { SidebarGroup } from "@/types";
import {
  Bell,
  Box,
  Building2,
  HandCoins,
  Heart,
  Landmark,
  Layers3,
  LayoutDashboard,
  MapPin,
  PackagePlus,
  PackageSearch,
  SendToBack,
  ShieldUser,
  Tags,
  Undo2,
  UserRoundPen,
  Users2,
  WalletCards,
} from "lucide-react";

export const sidebarGroups: { [key: string]: SidebarGroup[] } = {
  user: [
    {
      items: [
        {
          title: "Orders",
          href: "/user/orders",
          icon: SendToBack,
        },
        {
          title: "Returns",
          href: "/user/returns",
          icon: Undo2,
        },
        {
          title: "Wishlist",
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: "My Account",
      items: [
        { title: "Profile", href: "/user/profile", icon: UserRoundPen },
        { title: "Addresses", href: "/user/addresses", icon: MapPin },
        {
          title: "Payments",
          href: "/user/payments",
          icon: WalletCards,
        },
      ],
    },
    {
      title: "Others",
      items: [
        { title: "Notifications", href: "/user/notifications", icon: Bell },
        {
          title: "Security Settings",
          href: "/user/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  seller: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Dashboard",
          href: "/seller",
          icon: LayoutDashboard,
        },
        {
          title: "Products",
          href: "/seller/products",
          icon: Box,
          subItems: [
            {
              title: "All Products",
              href: "/seller/products",
            },
            {
              title: "Create Product",
              href: "/seller/create-product",
            },
          ],
        },
        {
          title: "Brand Management",
          href: "/seller/brand-management",
          icon: HandCoins,
        },
      ],
    },
    {
      items: [
        {
          title: "Orders",
          href: "/seller/orders",
          icon: SendToBack,
        },
        {
          title: "Returns",
          href: "/seller/returns",
          icon: Undo2,
        },
        {
          title: "Wishlist",
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: "My Account",
      items: [
        { title: "Profile", href: "/seller/profile", icon: UserRoundPen },
        { title: "Addresses", href: "/seller/addresses", icon: MapPin },
        {
          title: "Payments",
          href: "/seller/payments",
          icon: WalletCards,
        },
        {
          title: "Wishlist",
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: "Others",
      items: [
        { title: "Notifications", href: "/seller/notifications", icon: Bell },
        {
          title: "Security Settings",
          href: "/seller/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  admin: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Users",
          href: "/seller/products",
          icon: Users2,
          subItems: [
            {
              title: "All Sellers",
              href: "/admin/sellers",
              icon: Users2,
            },

            {
              title: "All Users",
              href: "/admin/users",
              icon: Users2,
            },
          ],
        },
        {
          title: "Financial",
          href: "/admin/financial",
          icon: Building2,
        },
      ],
    },
    {
      title: "Products",
      items: [
        {
          title: "All Products",
          href: "/admin/products",
          icon: PackageSearch,
        },
        {
          title: "Create Product",
          href: "/admin/create-product",
          icon: PackagePlus,
        },
        {
          title: "Inventory",
          href: "/admin/inventory",
          icon: Layers3,
        },
        {
          title: "Categories",
          href: "/admin/categories",
          icon: Tags,
        },
        {
          title: "Brands",
          href: "/admin/brands",
          icon: Landmark,
        },
      ],
    },
    {
      title: "Sales",
      items: [
        {
          title: "Orders",
          href: "/admin/orders",
          icon: SendToBack,
        },
        {
          title: "Returns",
          href: "/admin/returns",
          icon: Undo2,
        },
      ],
    },
    {
      title: "My Account",
      items: [
        { title: "Profile", href: "/admin/profile", icon: UserRoundPen },
        { title: "Addresses", href: "/admin/addresses", icon: MapPin },
        { title: "Payments", href: "/admin/payments", icon: WalletCards },
      ],
    },
    {
      title: "Others",
      items: [
        { title: "Notifications", href: "/admin/notifications", icon: Bell },
        {
          title: "Security Settings",
          href: "/admin/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
};
