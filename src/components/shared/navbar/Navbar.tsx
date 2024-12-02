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
    <div className="bg-gradient-to-r from-gray-600 to-gray-800">
      <div className="max-w-screen-xl mx-auto">
        {/* First Row: Search Bar on Right and Logo on Left */}
        <div className="flex items-center justify-between py-2 px-6 flex-wrap">
          {/* Logo (on the left) */}
          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="logo"
              height={50}
              width={50}
              className="transition-transform transform hover:scale-110 rounded-full"
            />
          </div>

          {/* Search Bar (on the right) */}
          <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-lg p-2 mb-4 sm:mb-0 order-first sm:order-last">
            <FiSearch className="text-gray-500 mx-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-gray-700 focus:outline-none px-4 rounded-full"
            />
          </div>
        </div>

        {/* Second Row: Routes and Login Button */}
        <div className="flex flex-wrap items-center justify-between text-white px-6 py-2">
          {/* Navigation Links */}
          <div className="flex gap-8 items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
            {siteConfig.navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`text-lg font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white p-2 rounded-md ${
                  pathname === item.href ? "text-white" : ""
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="w-full sm:w-auto text-center sm:text-right">
            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400 mx-auto sm:mx-0" />
            ) : userData ? (
              <NavbarUserDropdown user={userData} />
            ) : (
              <Link href="/login">
                <Button
                  color="primary"
                  radius="lg"
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200 transition-all mx-auto sm:mx-0"
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
