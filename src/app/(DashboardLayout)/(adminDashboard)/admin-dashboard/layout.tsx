import type { Metadata } from "next";
import {
  Home,
  User,
  MessageSquareQuote,
  Contact,
  ContactRound,
  BookOpenText,
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
      href: "/admin-dashboard/users",
      icon: <User size={20} />,
    },
    {
      label: "Content Management",
      href: "/admin-dashboard/posts",
      icon: <BookOpenText size={20} />,
    },
    {
      label: "Payment Management",
      href: "/admin-dashboard/payments",
      icon: <BadgeDollarSign size={20} />,
    },
  ];

  const commonLinks = [
    {
      label: "NewsFeed",
      href: "/",
      icon: <MessageSquareQuote size={20} />,
    },
    {
      label: "About",
      href: "/about",
      icon: <ContactRound size={20} />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Contact size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={adminLinks} commonLinks={commonLinks} />

      {/* Dashboard Content */}
      <main className="flex-1 md:px-10 mt-6">{children}</main>
    </div>
  );
}