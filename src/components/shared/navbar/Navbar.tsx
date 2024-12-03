"use client";

import logo from "@/src/assets/store-logo.png";
import { siteConfig } from "@/src/config/site";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogIn, FiSearch } from "react-icons/fi";
import NavbarUserDropdown from "./NavbarUserDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { userData, isLoading } = useUserDetails();

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

          {/* Search Bar */}
          <div className="flex items-center w-1/2 border-b-4 border-[#14B6A5]  rounded-full shadow p-1">
            <FiSearch className="text-gray-500 mx-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-gray-700 focus:outline-none px-4 rounded-full"
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
          </div>

          {/* Login Button */}
          <div className="text-center">
            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400 mx-auto" />
            ) : userData ? (
              <NavbarUserDropdown user={userData} />
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
