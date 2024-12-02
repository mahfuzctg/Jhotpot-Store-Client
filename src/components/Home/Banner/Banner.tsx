"use client";

import banner from "@/src/jsons/banner.json";
import parse from "html-react-parser";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  return (
    <div className="relative flex items-center justify-center lg:h-[500px]">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {banner.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center px-6 md:px-12">
              {/* Text Section centered */}
              <div className="text-center">
                <div className="text-primary font-medium text-sm mb-2">
                  🌟 {banner.heading_short} 🌟
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {parse(banner.heading)} 🎉
                </h1>
                <p className="text-white text-lg mb-6">{banner.description}</p>
                <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                  Shop now 🛍️
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
