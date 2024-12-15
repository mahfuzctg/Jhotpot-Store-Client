
import type { Metadata } from "next";
import {
  User,
  ShoppingBag,
  Store,
  House,
  Package2,
  Eye,
  TicketPercent,
} from "lucide-react";
import Sidebar from "@/src/components/DashboardSidebar/Sidebar";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description:
    "Shoply is a comprehensive e-commerce platform that offers an exceptional online shopping experience for users, vendors, and administrators. It allows users to browse and purchase a variety of products, vendors to manage their shops and inventories, and administrators to oversee and maintain the entire system efficiently.",
};

export default function CustomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customerLinks = [
    {
      label: "Profile",
      href: "/customer-dashboard",
      icon: <User size={20} />,
    },
    {
      label: "My Orders",
      href: "/customer-dashboard/MyOrders",
      icon: <ShoppingBag size={20} />,
    },
    {
      label: "Favorite Shops",
      href: "/customer-dashboard/favoriteShops",
      icon: <Store size={20} />,
    },
  ];

  const commonLinks = [
    {
      label: "Home",
      href: "/",
      icon: <House size={20} />,
    },
    {
      label: "All Products",
      href: "/allProducts",
      icon: <Package2 size={20} />,
    },
    {
      label: "Flash Sale",
      href: "/flashSale",
      icon: <TicketPercent size={20} />,
    },
    {
      label: "Recent Viewed",
      href: "/recentView",
      icon: <Eye size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={customerLinks} commonLinks={commonLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 md:px-10 mt-6">{children}</main>
    </div>
  );
}
