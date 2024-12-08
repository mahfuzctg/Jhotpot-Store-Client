"use client";

import { MdDiscount } from "react-icons/md";
import Countdown from "react-countdown";

const DealOffer = () => {
  const targetDate = new Date("2024-12-31T23:59:59");

  const renderer = ({ days, hours, minutes, seconds }: any) => (
    <div className="flex justify-center gap-4 text-center">
      {[
        { value: days, label: "DAYS" },
        { value: hours, label: "HOURS" },
        { value: minutes, label: "MINUTES" },
        { value: seconds, label: "SECONDS" },
      ].map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg"
        >
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative text-white py-20 px-4"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dxv10xebz/image/upload/v1733589260/spbo6hznzjymo4tsogxb.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We are working on something{" "}
          <span className="text-teal-500">awesome!</span>
        </h1>
        <p className="text-lg mb-8">
          Don't miss out! We're offering up to 70% off on all products.
        </p>

        <Countdown date={targetDate} renderer={renderer} />

        <div className="mt-8">
          <input
            type="email"
            placeholder="Enter your email here to stay tuned"
            className="p-3 rounded-l-lg w-2/3 max-w-md text-gray-900"
          />
          <button className="p-3 rounded-r-lg bg-red-500 text-white font-bold hover:bg-red-600">
            DO IT!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealOffer;
