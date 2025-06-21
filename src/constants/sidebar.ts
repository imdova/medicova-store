import { SidebarGroup } from "@/types";
import {
  Bell,
  Box,
  Building2,
  HandCoins,
  Heart,
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
          title: { en: "Orders", ar: "الطلبات" },
          href: "/user/orders",
          icon: SendToBack,
        },
        {
          title: { en: "Returns", ar: "المرتجعات" },
          href: "/user/returns",
          icon: Undo2,
        },
        {
          title: { en: "Wishlist", ar: "المفضلة" },
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: { en: "My Account", ar: "حسابي" },
      items: [
        {
          title: { en: "Profile", ar: "الملف الشخصي" },
          href: "/user/profile",
          icon: UserRoundPen,
        },
        {
          title: { en: "Addresses", ar: "العناوين" },
          href: "/user/addresses",
          icon: MapPin,
        },
        {
          title: { en: "Payments", ar: "المدفوعات" },
          href: "/user/payments",
          icon: WalletCards,
        },
      ],
    },
    {
      title: { en: "Others", ar: "أخرى" },
      items: [
        {
          title: { en: "Notifications", ar: "الإشعارات" },
          href: "/user/notifications",
          icon: Bell,
        },
        {
          title: { en: "Security Settings", ar: "إعدادات الأمان" },
          href: "/user/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  seller: [
    {
      title: { en: "Dashboard", ar: "لوحة التحكم" },
      items: [
        {
          title: { en: "Dashboard", ar: "لوحة التحكم" },
          href: "/seller",
          icon: LayoutDashboard,
        },
        {
          title: { en: "Products", ar: "المنتجات" },
          href: "/seller/products",
          icon: Box,
          subItems: [
            {
              title: { en: "All Products", ar: "كل المنتجات" },
              href: "/seller/products",
            },
            {
              title: { en: "Create Product", ar: "إنشاء منتج" },
              href: "/seller/create-product",
            },
          ],
        },
        {
          title: { en: "Brand Management", ar: "إدارة العلامات التجارية" },
          href: "/seller/brand-management",
          icon: HandCoins,
        },
      ],
    },
    {
      items: [
        {
          title: { en: "Orders", ar: "الطلبات" },
          href: "/seller/orders",
          icon: SendToBack,
        },
        {
          title: { en: "Returns", ar: "المرتجعات" },
          href: "/seller/returns",
          icon: Undo2,
        },
        {
          title: { en: "Wishlist", ar: "المفضلة" },
          href: "/wishlist",
          icon: Heart,
        },
      ],
    },
    {
      title: { en: "My Account", ar: "حسابي" },
      items: [
        {
          title: { en: "Profile", ar: "الملف الشخصي" },
          href: "/seller/profile",
          icon: UserRoundPen,
        },
        {
          title: { en: "Addresses", ar: "العناوين" },
          href: "/seller/addresses",
          icon: MapPin,
        },
        {
          title: { en: "Payments", ar: "المدفوعات" },
          href: "/seller/payments",
          icon: WalletCards,
        },
      ],
    },
    {
      title: { en: "Others", ar: "أخرى" },
      items: [
        {
          title: { en: "Notifications", ar: "الإشعارات" },
          href: "/seller/notifications",
          icon: Bell,
        },
        {
          title: { en: "Security Settings", ar: "إعدادات الأمان" },
          href: "/seller/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
  admin: [
    {
      title: { en: "Dashboard", ar: "لوحة التحكم" },
      items: [
        {
          title: { en: "Dashboard", ar: "لوحة التحكم" },
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: { en: "Users", ar: "المستخدمين" },
          href: "/seller/products",
          icon: Users2,
          subItems: [
            {
              title: { en: "All Sellers", ar: "جميع البائعين" },
              href: "/admin/sellers",
              icon: Users2,
            },
            {
              title: { en: "All Customers", ar: "جميع العملاء" },
              href: "/admin/Customers",
              icon: Users2,
            },
          ],
        },
        {
          title: { en: "Financial", ar: "المالية" },
          href: "/admin/financial",
          icon: Building2,
        },
      ],
    },
    {
      title: { en: "Products", ar: "المنتجات" },
      items: [
        {
          title: { en: "All Products", ar: "كل المنتجات" },
          href: "/admin/products",
          icon: PackageSearch,
        },
        {
          title: { en: "Create Product", ar: "إنشاء منتج" },
          href: "/admin/create-product",
          icon: PackagePlus,
        },
        {
          title: { en: "Inventory", ar: "المخزون" },
          href: "/admin/inventory",
          icon: Layers3,
        },
        {
          title: {
            en: "Categories and Brands",
            ar: "التصنيفات والعلامات التجارية",
          },
          href: "/admin/categories",
          icon: Tags,
        },
      ],
    },
    {
      title: { en: "Sales", ar: "المبيعات" },
      items: [
        {
          title: { en: "Orders", ar: "الطلبات" },
          href: "/admin/orders",
          icon: SendToBack,
        },
        {
          title: { en: "Returns", ar: "المرتجعات" },
          href: "/admin/returns",
          icon: Undo2,
        },
      ],
    },
    {
      title: { en: "My Account", ar: "حسابي" },
      items: [
        {
          title: { en: "Profile", ar: "الملف الشخصي" },
          href: "/admin/profile",
          icon: UserRoundPen,
        },
        {
          title: { en: "Addresses", ar: "العناوين" },
          href: "/admin/addresses",
          icon: MapPin,
        },
        {
          title: { en: "Payments", ar: "المدفوعات" },
          href: "/admin/payments",
          icon: WalletCards,
        },
      ],
    },
    {
      title: { en: "Others", ar: "أخرى" },
      items: [
        {
          title: { en: "Notifications", ar: "الإشعارات" },
          href: "/admin/notifications",
          icon: Bell,
        },
        {
          title: { en: "Security Settings", ar: "إعدادات الأمان" },
          href: "/admin/security",
          icon: ShieldUser,
        },
      ],
    },
  ],
};
