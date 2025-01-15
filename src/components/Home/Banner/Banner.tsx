"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const images = [
    "https://i.postimg.cc/nz7jzVMp/fruits-products.jpg",
    "https://i.postimg.cc/3wz0Y08t/d24041f9ff122f1c52f0c73f5a9fe703.jpg",
    "https://i.postimg.cc/52WrYX6R/afdan-slider-1.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  // Change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Countdown logic
  const targetDate = new Date("2025-01-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleBuyNow = () => {
    router.push("/allProducts");
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[100vh] lg:h-[65vh] overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-full flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white  px-4">
        <h1 className="text-3xl md:text-5xl text-center font-bold uppercase">
          Welcome to Jhotpot Store
        </h1>

        {/* Countdown Timer */}
        <div className="mt-6 sm:mt-8 text-center">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
            Start Your New Year Buy Something Fresh!
          </h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
            {["Days", "Hours", "Minutes", "Seconds"].map((unit, index) => (
              <div key={unit} className="text-center flex flex-col items-center">
                {/* Countdown Value */}
                <p className="bg-gradient-to-b from-[#82C408] to-[#71AA07] rounded-lg text-white text-3xl  font-bold  lg:w-28 py-2 px-4">
                  {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][index]}
                </p>
                
                {/* Countdown Unit */}
                <p className="mt-2 text-gray-200 font-medium text-sm sm:text-lg">{unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={handleBuyNow}
            className="px-4 py-2 sm:px-6 sm:py-2 lg:px-8 lg:py-3 bg-gradient-to-r from-[#82C408] to-[#82C408] text-white font-bold text-sm sm:text-lg lg:text-xl rounded-lg shadow-lg hover:scale-105 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
