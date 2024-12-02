"use client";

import bannerInfo from "@/src/jsons/bannerInfo.json";
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
        {bannerInfo.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row justify-center items-center px-6 md:px-12">
              {/* Text Section */}
              <div className="flex-1">
                <div className="text-primary font-medium text-sm mb-2 text-center lg:text-left">
                  ★ {banner.heading_short} ★
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                  {parse(banner.heading)}
                </h1>
                <p className="text-white text-lg mb-6">{banner.description}</p>
                <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                  Shop now
                </button>
              </div>

              {/* Image Section */}
              <div className="relative flex-1">
                {/* Unique shape */}
                <div className="absolute right-1/2 -top-[172px] md:-top-[344px] lg:left-0 lg:top-0">
                  <img
                    src="https://i.postimg.cc/3wxFSz6R/image.png"
                    alt="Women Clothing"
                    className="h-[400px] md:h-auto lg:h-[500px] rotate-90 lg:rotate-0 md:w-auto"
                  />
                </div>

                <img
                  src={banner.bannerImg}
                  alt="Women Clothing"
                  className="w-full object-cover object-bottom rounded-lg h-[500px]"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Content Section */}
      </Swiper>
    </div>
  );
};

export default Banner;
