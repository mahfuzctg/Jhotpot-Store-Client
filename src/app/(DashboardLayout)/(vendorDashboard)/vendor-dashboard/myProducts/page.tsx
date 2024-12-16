
"use client";


import DashboardProductCard from "@/src/components/Cards/DashboardProductCard";
import DashboardProductLoading from "@/src/components/LoadingCards/DashboardProductLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { IProduct } from "@/src/types/schema";

import { Pagination } from "@nextui-org/pagination";
import Link from "next/link";
import { useState } from "react";

const MyProducts = () => {
  const { userData, isLoading } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    userData?.userData?.products?.slice(startIndex, endIndex) || [];
  const totalProducts = userData?.userData?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  return (
    <div>
      <DashboardSectionTitle heading="My Products" />

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-5">
        <div>
          <h1 className="text-blacktext-2xl font-bold">
            Total Products: {userData?.userData?.products?.length || 0}
          </h1>
        </div>
        <div>
          <Link href={"/vendor-dashboard/addProduct"}>
            <button className="relative h-9 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-blackhover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
              Add New Product
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <DashboardProductLoading />
              </div>
            ))
          : paginatedProducts?.map((singleProduct: IProduct) => (
              <DashboardProductCard
                key={singleProduct?.id}
                singleProduct={singleProduct}
              />
            ))}
      </div>

      <div className="py-7">
        {totalProducts > 0 && (
          <div className="flex justify-center items-center mt-4">
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

export default MyProducts;
