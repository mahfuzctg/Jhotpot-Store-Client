/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";

import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import Title from "@/src/components/Sections/title";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/porduct.api";
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
    <div className="pb-14 px-8">
      <Title sub="Limited Time Offer" heading="Flash Sale Collection" />

      <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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

      <div className="flex justify-center items-center">
        <button className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
          View All Flash Sale
        </button>
      </div>
    </div>
  );
};

export default FlashSale;