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
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-gray-600">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FiFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FiTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600"
            >
              <FiInstagram />
            </a>
          </div>

          {/* Login/Account */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-green-600 transition duration-200">
              Login
            </Link>
            <Link href="/account" className="flex items-center hover:text-green-600 transition duration-200">
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
    {/* Logo Image */}
    <img
      src="https://i.postimg.cc/fyPZHC34/pngtree-online-shopping-logo-with-cart-icon-png-image-8647239.png" 
      alt=" Logo"
      className="h-10"  // Adjust the height of the logo image
    />
    {/* Logo Text */}
    <span className="ml-2 text-lg font-semibold text-green-600">
     JHOTPOT STORE
    </span>
  </Link>
</div>


        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/" className="hover:text-green-600 transition duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-green-600 transition duration-200">
            About
          </Link>
          <Link href="/allProducts" className="hover:text-green-600 transition duration-200">
            Products
          </Link>
          <Link href="/shop" className="hover:text-green-600 transition duration-200">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-green-600 transition duration-200">
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
              className="border rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Cart Icon */}
          <button className="text-gray-700 hover:text-green-600 transition duration-200">
            <FiShoppingCart size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-green-600 transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 py-4 px-4 text-gray-700">
            <Link
              href="/"
              className="hover:text-green-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-green-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link href="/allProducts" className="hover:text-green-600 transition duration-200">
            Products
          </Link>
            <Link
              href="/shop"
              className="hover:text-green-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="hover:text-green-600 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="hover:text-green-600 transition duration-200"
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
