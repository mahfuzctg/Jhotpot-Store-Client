import type { Metadata } from "next";
import {
  Home,
  BookOpenText,
  ShoppingBag,
  KeyRound,
  House,
  Package2,
  TicketPercent,
  Eye,
} from "lucide-react";
import Sidebar from "@/src/components/DashboardSidebar/Sidebar";

export const metadata: Metadata = {
  title: "Vendor Dashboard",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
};

export default function VendorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vendorLinks = [
    {
      label: "Dashboard Home",
      href: "/vendor-dashboard",
      icon: <Home size={20} />,
    },
    {
      label: "My Products",
      href: "/vendor-dashboard/myProducts",
      icon: <ShoppingBag size={20} />,
    },
    {
      label: "Order List",
      href: "/vendor-dashboard/orderList",
      icon: <BookOpenText size={20} />,
    },
    {
      label: "Security",
      href: "/vendor-dashboard/security",
      icon: <KeyRound size={20} />,
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
      <Sidebar links={vendorLinks} commonLinks={commonLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 md:px-10 mt-6">{children}</main>
    </div>
  );
}