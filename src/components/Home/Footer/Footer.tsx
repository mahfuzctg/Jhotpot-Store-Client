import logo from "@/src/assets/store-logo.png";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#14B6A5] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Image
              src={logo}
              alt="Jhotpot Vegetables Store"
              width={100}
              height={100}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold">Jhotpot Store</h2>
            <p className="mt-4 leading-relaxed">
              Your trusted online store for fresh vegetables. We bring
              farm-fresh produce directly to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold">Contact</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <MdEmail className="inline mr-2" />
                <a
                  href="mailto:support@jhotpotstore.com"
                  className="hover:underline"
                >
                  support@jhotpotstore.com
                </a>
              </li>
              <li>
                📞{" "}
                <a href="tel:+123456789" className="hover:underline">
                  +123-456-789
                </a>
              </li>
              <li>🌍 Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-white/50 pt-6 text-center">
          <p>
            © {new Date().getFullYear()} Jhotpot Store. All rights reserved.
          </p>
          <p>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>{" "}
            |{" "}
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
