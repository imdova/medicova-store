import { SidebarGroup } from "@/types";
import {
  Bell,
  Heart,
  MapPin,
  SendToBack,
  ShieldUser,
  Undo2,
  UserRoundPen,
  WalletCards,
} from "lucide-react";

export const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      {
        title: "Orders",
        href: "/account/orders",
        icon: SendToBack,
      },
      {
        title: "Returns",
        href: "/account/returns",
        icon: Undo2,
      },
      {
        title: "Medicova Credits",
        href: "/account/credits",
        icon: WalletCards,
      },
      {
        title: "Wishlist",
        href: "/account/wishlist",
        icon: Heart,
      },
    ],
  },
  {
    title: "My Account",
    items: [
      { title: "Profile", href: "/account/profile", icon: UserRoundPen },
      { title: "Addresses", href: "/account/addresses", icon: MapPin },
      {
        title: "Payments",
        href: "/account/payments",
        icon: WalletCards,
      },
    ],
  },
  {
    title: "Others",
    items: [
      { title: "Notifications", href: "/account/notifications", icon: Bell },
      {
        title: "Security Settings",
        href: "/account/security",
        icon: ShieldUser,
      },
    ],
  },
];
