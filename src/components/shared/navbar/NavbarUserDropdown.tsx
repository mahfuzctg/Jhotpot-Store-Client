"use client";

import logo from "@/src/assets/store-logo.png";
import { siteConfig } from "@/src/config/site";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiLogIn, FiMenu, FiSearch, FiX } from "react-icons/fi";
import NavbarUserDropdown from "./NavbarUserDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const { userData, isLoading } = useUserDetails();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-400">
      <div className="max-w-screen-xl mx-auto">
        {/* First Row: Search Bar and Logo */}
        <div className="flex items-center justify-between py-4 px-6 flex-wrap">
          {/* Search Bar */}
          <div className="flex items-center w-full sm:w-1/2 bg-white rounded-full shadow-lg p-2 mb-4 sm:mb-0">
            <FiSearch className="text-gray-500 mx-2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-gray-700 focus:outline-none py-2 px-4 rounded-full"
            />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={logo}
              alt="logo"
              height={80}
              width={80}
              className="transition-transform transform hover:scale-110"
            />
          </div>

          {/* Hamburger Icon (Visible on small screens) */}
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Second Row: Routes and Login Button */}
        <div
          className={`flex flex-wrap items-center justify-between bg-black text-white py-3 px-6 transition-all duration-300 ${
            isMenuOpen ? "block" : "hidden"
          } sm:flex`}
        >
          {/* Navigation Links */}
          <div className="flex gap-8 items-center justify-center w-full sm:w-auto mb-4 sm:mb-0">
            {siteConfig.navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`text-lg font-semibold transition-all duration-300 hover:text-green-300 ${
                  pathname === item.href ? "text-green-300" : ""
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
                  size="lg"
                  className="bg-green-700 text-white hover:bg-green-600 transition-all mx-auto sm:mx-0"
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
