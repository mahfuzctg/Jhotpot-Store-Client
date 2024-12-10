"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiShoppingCart,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiUser,
} from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <div className="bg-[#82C408] py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-white">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#82C408]"
            >
              <FiFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#82C408]"
            >
              <FiTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#82C408]"
            >
              <FiInstagram />
            </a>
          </div>

          {/* Login/Account */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-[#82C408] transition duration-200">
              Login
            </Link>
            <Link href="/account" className="flex items-center hover:text-[#82C408] transition duration-200">
              <FiUser className="mr-1" />
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img
              src="https://i.postimg.cc/fyPZHC34/pngtree-online-shopping-logo-with-cart-icon-png-image-8647239.png"
              alt="Logo"
              className="h-10"
            />
            <span className="ml-2 text-lg font-semibold text-[#82C408]">
              JHOTPOT STORE
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/" className="hover:text-[#82C408] transition duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#82C408] transition duration-200">
            About
          </Link>
          <Link href="/allProducts" className="hover:text-[#82C408] transition duration-200">
            Products
          </Link>
          <Link href="/shop" className="hover:text-[#82C408] transition duration-200">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-[#82C408] transition duration-200">
            Contact
          </Link>
        </div>

        {/* Search Bar & Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-[#82C408]"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Cart Icon */}
          <button className="text-white hover:text-[#82C408] transition duration-200">
            <FiShoppingCart size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-[#82C408] transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed left-0 top-0 w-1/2 h-full bg-black text-white shadow-md transform transition-all duration-300 ease-in-out"
          style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="flex flex-col space-y-4 py-4 px-4">
            <Link
              href="/"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/allProducts"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/shop"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="hover:text-[#82C408] transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
