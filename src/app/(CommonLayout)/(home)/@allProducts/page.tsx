"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import Title from "@/src/components/Sections/title";
import { IProduct } from "@/src/types/schema";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(4);
  const [queryObj, setQueryObj] = useState({
    flashSale: false,
    page: currentPage,
    limit: dataPerPage,
  });

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateDataPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setDataPerPage(8); // Larger screens
    } else if (width >= 768 && width < 1280) {
      setDataPerPage(6); // Medium screens
    } else {
      setDataPerPage(4); // Small screens
    }
  };

  useEffect(() => {
    updateDataPerPage();
    window.addEventListener("resize", updateDataPerPage);

    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
    }));

    // Refetch data whenever queryObj changes
    refetch();
  }, [currentPage, dataPerPage, refetch]);

  return (
    <div className="pb-14 mx-auto ">
      <Title sub="Shop The Best" heading="Explore Our Collection" />

      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-y-8 px-8">
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

      <div>
        {allProductsResponse?.data?.length > 0 && (
          <div className="flex justify-center items-center ">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={handlePageChange}
              showControls
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
