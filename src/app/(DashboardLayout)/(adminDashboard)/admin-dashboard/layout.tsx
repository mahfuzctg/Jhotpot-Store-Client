import type { Metadata } from "next";
import {
  Home,
  User,
  SquareMenu,
  CirclePercent,
  House,
  Package2,
  TicketPercent,
  Eye,
  ShoppingBag,
  BadgeDollarSign,
} from "lucide-react";
import Sidebar from "@/src/components/DashboardSidebar/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminLinks = [
    {
      label: "Dashboard Home",
      href: "/admin-dashboard",
      icon: <Home size={20} />,
    },
    {
      label: "User Management",
      icon: <User size={20} />,
      children: [
        {
          label: "Customer Management",
          href: "/admin-dashboard/customers",
          icon: <User size={20} />,
        },
        {
          label: "Vendor Management",
          href: "/admin-dashboard/vendors",
          icon: <ShoppingBag size={20} />,
        },
      ],
    },
    {
      label: "Category Management",
      href: "/admin-dashboard/category",
      icon: <SquareMenu size={20} />,
    },
    {
      label: "Payment Management",
      href: "/admin-dashboard/payments",
      icon: <BadgeDollarSign size={20} />,
    },
    {
      label: "Coupon Management",
      href: "/admin-dashboard/coupon",
      icon: <CirclePercent size={20} />,
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
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar links={adminLinks} commonLinks={commonLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 md:px-10 mt-6">{children}</main>
    </div>
  );
}