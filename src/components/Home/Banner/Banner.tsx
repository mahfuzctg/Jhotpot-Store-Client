"use client";

import { useEffect, useState } from "react";

const Banner = () => {
  // Background images for the slider
  const images = [
    "https://i.postimg.cc/vmJT7tR4/istockphoto-471254900-612x612.jpg",
    "https://i.postimg.cc/3RfLbNB0/77cd8cd5c72f7900be1557a2b9122a4d.avif",
    "https://i.postimg.cc/SNMZDyzj/man-offers-vegetables-266732-15670.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Set the target date for the countdown
  const targetDate = new Date("2024-12-31T23:59:59").getTime();

  // State to hold the time remaining
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the remaining time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [targetDate]);

  return (
    <div
      className="relative bg-cover bg-center h-[90vh] flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentImage]})`, // Automatically sliding background
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 lg:px-8">
        {/* Welcome Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFFFFF]">
          Welcome to Jhotpot Store
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Limited Offer / Yearly Offer - Grab the best deals now!
        </p>

        {/* Countdown Timer */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#13A193] mb-4">
            Start Your New Year Buy Something Fresh!
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-xl font-semibold">
            <div className="text-center">
              <p
                className="bg-gradient-to-r from-[#13A193] to-[#F3901E] text-transparent bg-clip-text text-4xl sm:text-5xl font-bold"
              >
                {timeLeft.days}
              </p>
              <p className="text-gray-300">Days</p>
            </div>
            <div className="text-center">
              <p
                className="bg-gradient-to-r from-[#13A193] to-[#F3901E] text-transparent bg-clip-text text-4xl sm:text-5xl font-bold"
              >
                {timeLeft.hours}
              </p>
              <p className="text-gray-300">Hours</p>
            </div>
            <div className="text-center">
              <p
                className="bg-gradient-to-r from-[#13A193] to-[#F3901E] text-transparent bg-clip-text text-4xl sm:text-5xl font-bold"
              >
                {timeLeft.minutes}
              </p>
              <p className="text-gray-300">Minutes</p>
            </div>
            <div className="text-center">
              <p
                className="bg-gradient-to-r from-[#13A193] to-[#F3901E] text-transparent bg-clip-text text-4xl sm:text-5xl font-bold"
              >
                {timeLeft.seconds}
              </p>
              <p className="text-gray-300">Seconds</p>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="mt-8">
          <button className="px-8 py-4 bg-gradient-to-r from-[#F3901E] to-[#13A193] text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
