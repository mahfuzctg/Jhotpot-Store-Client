"use client";

import Title from "@/src/components/Sections/title";
import { FC } from "react";
import { MdLocationPin, MdEmail, MdPhone } from "react-icons/md";

const ContactPage: FC = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative text-center text-white">
        <Title heading="Get in Touch" sub="We'd love to hear from you!" />
      </div>

      {/* Main Content Section (Form + Icons) */}
      <section className="pb-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left: Contact Form */}
          <div className="w-full lg:w-1/2">
            <form action="#" method="POST" className="bg-[#FDFFF8] p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Name"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="relative mt-6">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="bg-[#82C408] text-white py-3 px-8 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact Info Icons */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-10">
            {/* Location Icon */}
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#82C408] text-white rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out">
                <MdLocationPin className="text-3xl" />
              </div>
              <div className="text-lg text-gray-700">123 Main Street, Ctg, Bangladesh</div>
            </div>

            {/* Phone Icon */}
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#82C408] text-white rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out">
                <MdPhone className="text-3xl" />
              </div>
              <div className="text-lg text-gray-700">+123 456 7890</div>
            </div>

            {/* Email Icon */}
            <div className="flex items-center gap-6">
              <div className="p-4 bg-[#82C408] text-white rounded-full shadow-xl transform hover:scale-110 transition duration-300 ease-in-out">
                <MdEmail className="text-3xl" />
              </div>
              <div className="text-lg text-gray-700">jhotpot@gmail.com</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
