"use client";

import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CategoryLoading from "@/src/components/LoadingCards/CategoryLoading";
import Title from "@/src/components/Sections/title";
import { ICategory } from "@/src/types/schema";
import { useRouter } from "next/navigation"; // Correct import

const AllCategories = () => {
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery(undefined);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter(); // Add the router hook correctly

  // Function to navigate to the category
  const navigateToCategory = (categoryName: string) => {
    const formattedCategory = categoryName.replace(/\s+/g, "+"); // Replace spaces with "+"
    router.push(`/allProducts?category=${formattedCategory}`);
  };

  return (
    <div className="bg-[#FFFFFF] py-14 px-4 sm:px-8 lg:px-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <Title sub="Categories" heading="Discover Top Categories" />
       
      </div>

      {/* Swiper Section */}
      <div className="relative">
        <Swiper
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          loop={true}
          modules={[Navigation]}
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <CategoryLoading />
                </SwiperSlide>
              ))
            : allCategories?.map((category: ICategory, index: number) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#FFFFFF] border border-[#ddf5b8] rounded-lg shadow-sm hover:shadow-md p-4 transition-shadow text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-32 w-auto mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-[#82C408]">
                      {category.name}
                    </h3>
                    <button
                      onClick={() => navigateToCategory(category.name)}
                      className="mt-4 px-4 py-2 bg-[#82C408] text-[#FFFFFF] rounded-md shadow hover:bg-[#A4D44C] transition"
                    >
                      View More
                    </button>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          ref={prevRef}
          className="w-12 h-12 bg-[#82C408] rounded-full text-[#FFFFFF] flex justify-center items-center hover:bg-[#A4D44C] transition"
        >
          &#9664;
        </button>
        <button
          ref={nextRef}
          className="w-12 h-12 bg-[#82C408] rounded-full text-[#FFFFFF] flex justify-center items-center hover:bg-[#A4D44C] transition"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
