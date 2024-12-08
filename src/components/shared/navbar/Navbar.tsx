"use client";

import logo from "@/src/assets/store-logo.png";
import { siteConfig } from "@/src/config/site";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogIn, FiLogOut, FiSearch, FiCreditCard } from "react-icons/fi";
import NavbarUserDropdown from "./NavbarUserDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { userData, isLoading } = useUserDetails();

  const handleLogout = () => {
    console.log("User logged out."); // Replace with actual logout logic
  };

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto">
        {/* Navbar in a single row */}
        <div className="flex items-center justify-between py-2 px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="logo"
              height={50}
              width={50}
              className="transition-transform transform hover:scale-110 rounded-full"
            />
          </div>

          {/* Search Field */}
          <div className="relative flex items-center">
            <div className="flex items-center bg-gray-200 hover:bg-gray-300 transition-all rounded-full p-2 shadow">
              <FiSearch className="text-gray-500 cursor-pointer" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="absolute left-0 top-0 w-0 opacity-0 bg-gray-100 text-gray-700 rounded-full focus:w-48 focus:opacity-100 focus:pl-10 focus:pr-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-[#14B6A5] transition-all"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8 items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
            {siteConfig.navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`text-lg font-semibold text-[#14B6A5] transition-all duration-300 hover:border-b-4 hover:border-[#14B6A5] ${
                  pathname === item.href ? "border-b-4 border-[#14B6A5]" : ""
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Card Icon */}
            <Link
              href="/cart"
              className={`text-lg font-semibold text-[#14B6A5] transition-all duration-300 hover:border-b-4 hover:border-[#14B6A5] ${
                pathname === "/cart" ? "border-b-4 border-[#14B6A5]" : ""
              }`}
            >
              <FiCreditCard className="mr-2 text-lg" />
              Cart
            </Link>
          </div>

          {/* Login/Logout Button */}
          <div className="text-center">
            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400 mx-auto" />
            ) : userData ? (
              <Button
                color="danger"
                radius="lg"
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600 transition-all mx-auto"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" /> Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  color="primary"
                  radius="lg"
                  size="sm"
                  className="bg-[#14B6A5] text-white hover:bg-[#0E867A] transition-all mx-auto"
                >
                  <FiLogIn className="mr-2" /> Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
