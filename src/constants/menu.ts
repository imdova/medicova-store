import { MenuGroup } from "@/types";
import { userType } from "@/types/next-auth";
import {
  Settings,
  Bookmark,
  Users,
  BarChart2,
  SendToBack,
  Undo2,
  Heart,
  UserRound as UserRoundPen,
  MapPin,
  WalletCards,
  Bell,
  Shield as ShieldUser,
  LayoutDashboard,
  Box,
} from "lucide-react";

export const menuGroups: { [key in userType]: MenuGroup[] } = {
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
        {
          title: "Profile",
          href: "/user/profile",
          icon: UserRoundPen,
        },
        {
          title: "Addresses",
          href: "/user/addresses",
          icon: MapPin,
        },
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
        {
          title: "Notifications",
          href: "/user/notifications",
          icon: Bell,
        },
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
      ],
    },
    {
      title: "My Account",
      items: [
        {
          title: "Profile",
          href: "/seller/profile",
          icon: UserRoundPen,
        },
        {
          title: "Addresses",
          href: "/seller/addresses",
          icon: MapPin,
        },
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
        {
          title: "Notifications",
          href: "/seller/notifications",
          icon: Bell,
        },
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
      title: "Admin Dashboard",
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "User Management",
          href: "/admin/users",
          icon: Users,
        },
        {
          title: "System Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
    {
      title: "Reports",
      items: [
        {
          title: "Sales Analytics",
          href: "/admin/analytics",
          icon: BarChart2,
        },
        {
          title: "Activity Logs",
          href: "/admin/logs",
          icon: Bookmark,
        },
      ],
    },
  ],
};
