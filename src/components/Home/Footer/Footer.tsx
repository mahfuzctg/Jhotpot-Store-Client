import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-500 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Votegum</h2>
            <p className="text-sm text-gray-200 leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              luctus nec ullamcorper mattis pulvinar dapibus leo.
            </p>
            <div className="flex space-x-4 mt-4 text-xl">
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="#" className="hover:text-white">
                  Footer Menu 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  How to Vote
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact for Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Local Events
                </a>
              </li>
            </ul>
          </div>

          {/* Other Pages Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Other Page</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="#" className="hover:text-white">
                  Footer Menu 2
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Team Members
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Daily Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Registration Form
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Partners & Sponsors
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>+62 123 456 789</li>
              <li>Marina Boom, East Java - Indonesia</li>
              <li>Monday-Friday: 9:00 AM - 6:00 PM (GMT)</li>
            </ul>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Subscribe or Newsletter</h3>
          <p className="text-sm text-gray-200 mb-4">
            Receive the latest updates, news, and information.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Your email address here"
              className="p-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="p-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-r-lg">
              Subscribe
            </button>
          </div>
          <hr className="my-8 border-gray-300" />
          <p className="text-sm text-gray-100">
            © Themegum Template Kit © 2023. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
