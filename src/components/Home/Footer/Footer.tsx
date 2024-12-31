"use client";

import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Import arrow icons for up and down
import Link from "next/link"; // Import Link for routing

const Footer = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);

  // Handle scrolling visibility
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollBtn(true); // Show button after 300px scroll
    } else {
      setShowScrollBtn(false); // Hide button when scrolled back to top
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
      setShowScrollDownBtn(false); // Hide button when at the bottom
    } else {
      setShowScrollDownBtn(true); // Show button when not at the bottom
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener on unmount
    };
  }, []);

  return (
    <footer className="relative bg-black text-white py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://i.postimg.cc/85LYkC3j/headerpng-parspng-com-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      ></div>

      <div className="relative container mx-auto px-4">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold mb-4 text-[#82C408]">Jhotpot-Store</h2>
            <p className="text-sm leading-6 text-white mb-4">
              Jhotpot-Store is a responsive e-commerce platform built with Next.js, React, and PostgreSQL.
              It allows users to browse and buy products, vendors to manage their stores, and admins to control the system.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6 mt-6 text-4xl">
              <a
                href="#"
                aria-label="Twitter"
                className="text-[#82C408] hover:text-[#fbfbfb] transform transition-transform duration-300 hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#82C408] hover:text-[#f9f9f9] transform transition-transform duration-300 hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#82C408] hover:text-[#f7f7f7] transform transition-transform duration-300 hover:scale-110"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#82C408] hover:text-[#ffffff] transform transition-transform duration-300 hover:scale-110"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Routes Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[{ label: "Home", href: "/" }, { label: "Products", href: "/allProducts" }, { label: "Recent Viewed", href: "/recentView" }, { label: "Flash Sale", href: "/flashSale" }, { label: "Shop", href: "/shop" }, { label: "Contact", href: "/contact" }].map((route) => (
                <li key={route.href}>
                  <Link href={route.href} passHref>
                    <span className="hover:text-[#FFA900] transition-colors">{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Information</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "How to Buy", "Shipping Info", "Privacy Policy", "Return Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FFA900] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>+62 123 456 789</li>
              <li>123, Ctg - Bangladesh</li>
              <li>Monday-Friday: 9:00 AM - 6:00 PM (GMT)</li>
            </ul>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-sm text-white mb-4">
            Stay updated with our latest news and events.
          </p>
          <div className="flex justify-center items-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address here"
              className="p-3 rounded-l-lg text-gray-900 w-2/3 focus:outline-none"
            />
            <button className="p-3 bg-[#82C408] hover:bg-[#FFA900] text-white font-semibold rounded-r-lg">
              Subscribe
            </button>
          </div>
          <hr className="my-8 border-gray-600" />
          <p className="text-sm text-gray-400">
            © Jhotpot-Store 2024. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top and Bottom Buttons */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#82C408] text-white p-3 rounded-full shadow-lg hover:bg-[#FFA900] transform transition duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}

      {showScrollDownBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-6 right-16 bg-[#82C408] text-white p-3 rounded-full shadow-lg hover:bg-[#FFA900] transform transition duration-300 hover:scale-110"
          aria-label="Scroll to bottom"
        >
          <FaArrowDown />
        </button>
      )}
    </footer>
  );
};

export default Footer;
