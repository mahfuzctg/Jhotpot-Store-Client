"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import Title from "@/src/components/Sections/title";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import { IProduct } from "@/src/types/schema";
import { useEffect, useState } from "react";


const FlashSale = () => {
  const [dataPerPage, setDataPerPage] = useState(4);
  const [queryObj, setQueryObj] = useState({
    flashSale: true,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  console.log(allProductsResponse);

  const updateDataPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setDataPerPage(8);
    } else if (width >= 768 && width < 1280) {
      setDataPerPage(6);
    } else {
      setDataPerPage(4);
    }
  };

  useEffect(() => {
    updateDataPerPage();
    window.addEventListener("resize", updateDataPerPage);

    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  return (
 <div>
        

  
      <Title sub="Limited Time Offer" heading="Flash Sale Collection" />
   
<div
      className="py-28 md:px-6 relative"
      style={{
        backgroundImage: "url('https://i.postimg.cc/52CXn9ft/360-F-960615103-DEPocb-Oh-XTHpp-Sg-Z6-E3-AZa-Xt-Q2i-MJb-GC.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Bird-like Shape Background with Clip-Path
      <div
        className="absolute top-0 left-0 right-0 z-0 "
        style={{
          height: "100%",
          clipPath: "polygon(50% 0%, 70% 30%, 100% 50%, 70% 70%, 50% 100%, 30% 70%, 0% 50%, 30% 30%)", 
          background: "#82C408", 
        }}
      ></div> */}


      {/* Flash Sale Section with Grid of Products */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-4 relative z-10 mx-auto">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <ProductLoading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomeProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center items-center mt-6">
        <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-[#fffff] text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#6EAE03] uppercase font-bold px-3">
          View All Products
        </button>
      </div>
    </div>
 </div>
  );
};

export default FlashSale;
