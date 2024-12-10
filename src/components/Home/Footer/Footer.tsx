import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
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
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#82C408]">Votegum</h2>
            <p className="text-sm leading-6 text-white">
              Making every vote count with seamless digital solutions. Join us
              in shaping a better future!
            </p>
            <div className="flex space-x-4 mt-6 text-xl">
              <a
                href="#"
                aria-label="Twitter"
                className="text-[#FFA900] hover:text-[#82C408]"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#FFA900] hover:text-[#82C408]"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#FFA900] hover:text-[#82C408]"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#FFA900] hover:text-[#82C408]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Information</h3>
            <ul className="space-y-2 text-sm">
              {["Footer Menu 1", "About Us", "How to Vote", "Contact for Media", "Local Events"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-[#FFA900] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Other Pages Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Other Pages</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Footer Menu 2",
                "Team Members",
                "Daily Updates",
                "Registration Form",
                "Partners & Sponsors",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#FFA900] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>+62 123 456 789</li>
              <li>Marina Boom, East Java - Indonesia</li>
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
            © Votegum Template Kit 2023. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
