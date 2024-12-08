"use client";

import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import HomeCategoryCard from "@/src/components/Cards/HomeCategoryCard";

import CategoryLoading from "@/src/components/LoadingCards/CategoryLoading";
import Title from "@/src/components/Sections/title";
import { ICategory } from "@/src/types/schema";
import { useRef } from "react";

const AllCategories = () => {
  const { data: allCategories, isLoading } =
    useGetAllCategoriesQuery(undefined);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const getCardCount = () => {
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    return 1; // sm and below
  };

  const renderLoadingCards = () => {
    const cardCount = getCardCount();
    return Array.from({ length: cardCount }).map((_, index) => (
      <SwiperSlide key={index}>
        <CategoryLoading />
      </SwiperSlide>
    ));
  };

  return (
    <div className="pb-14 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-10">
        <Title sub="Categories" heading="Browse Top Category" />
        {/* navigation button */}
        <div className="flex gap-4">
          <button
            ref={prevRef}
            className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-full flex justify-center items-center"
          >
            <BsArrowLeft className="text-white text-xl" />
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 md:w-14 md:h-14 bg-primary rounded-full flex justify-center items-center"
          >
            <BsArrowRight className="text-white text-xl" />
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 3 }, // For small screens
          768: { slidesPerView: 3 }, // For medium screens
          1024: { slidesPerView: 4 }, // For large screens
          1280: { slidesPerView: 5 }, // For extra-large screens
        }}
        loop={true}
        modules={[Navigation]}
        className="mySwiper"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
      >
        <div
          className="grid gap-4 
            grid-cols-1 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5"
        >
          {isLoading
            ? renderLoadingCards()
            : allCategories?.map((category: ICategory, index: number) => (
                <SwiperSlide key={index}>
                  <HomeCategoryCard category={category} />
                </SwiperSlide>
              ))}
        </div>
      </Swiper>
    </div>
  );
};

export default AllCategories;
