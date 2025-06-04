import { SidebarGroup } from "@/types";
import {
  Bell,
  Box,
  HandCoins,
  Heart,
  LayoutDashboard,
  MapPin,
  SendToBack,
  ShieldUser,
  SquareChartGantt,
  Undo2,
  UserRoundPen,
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
          href: "/user/wishlist",
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
        },
        {
          title: "Brand Management",
          href: "/seller/brand-management",
          icon: HandCoins,
        },
        {
          title: "Brand Catalog",
          href: "/seller/brand-catalog",
          icon: SquareChartGantt,
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
};
