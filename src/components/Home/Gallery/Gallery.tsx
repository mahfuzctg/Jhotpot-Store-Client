"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const GallerySection = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause scrolling when hovering over the gallery
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      if (galleryRef.current) {
        galleryRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3000);
  };

  const galleryImages = [
    "https://i.postimg.cc/TPfZRWrS/smiling-market-vendor-stockcake.webp",
    "https://i.postimg.cc/TP0BhY0P/istockphoto-943025686-612x612.jpg",
    "https://i.postimg.cc/FRK8S5CV/istockphoto-1349787961-612x612.jpg",
    "https://i.postimg.cc/QtnPk4RG/couple-standing-with-basket-of-vegetables-in-garden-BLEF10530.jpg",
    "https://i.postimg.cc/906ns4mL/mother-and-son-gardening-in-backyard-BLEF06209.jpg",
    "https://i.postimg.cc/W1ws6V8B/images.jpg",
    "https://i.postimg.cc/xCcY2zQQ/istockphoto-1589023450-2048x2048.webp",
    "https://i.postimg.cc/bwphvMP3/farmer-harvests-zucchini-vegetable-field-farm-177476963.webp",
    "https://i.postimg.cc/TPfZRWrS/smiling-market-vendor-stockcake.webp",
    "https://i.postimg.cc/TP0BhY0P/istockphoto-943025686-612x612.jpg",
    "https://i.postimg.cc/FRK8S5CV/istockphoto-1349787961-612x612.jpg",
    "https://i.postimg.cc/QtnPk4RG/couple-standing-with-basket-of-vegetables-in-garden-BLEF10530.jpg",
    "https://i.postimg.cc/906ns4mL/mother-and-son-gardening-in-backyard-BLEF06209.jpg",
    "https://i.postimg.cc/W1ws6V8B/images.jpg",
    "https://i.postimg.cc/xCcY2zQQ/istockphoto-1589023450-2048x2048.webp",
    "https://i.postimg.cc/bwphvMP3/farmer-harvests-zucchini-vegetable-field-farm-177476963.webp",
  ];

  return (
    <div className="bg-[#fdfff8] py-10">
      <div className=" mx-auto text-center">
        <div
          ref={galleryRef}
          className="relative  overflow-x-scroll flex space-x-4 scrollbar-hide rounded-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative flex-none rounded-2xl  w-[70%] sm:w-[50%] md:w-[33%] lg:w-[25%] xl:w-[15%] transform transition-all duration-300 hover:scale-105 group"
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover  group-hover:opacity-90 rounded-2xl"
              />
              <div className="absolute rounded-2xl inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-0 transition-all duration-300"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-lg md:text-xl font-bold">View Image</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
