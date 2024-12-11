"use client";

import { useState } from "react";
import Loading from "@/src/components/Loading/Loading";
import {
  useDeleteRecentProductMutation,
  useGetRecentViewProductsQuery,
} from "@/src/lib/redux/features/products/porduct.api";
import { PiStarFourFill } from "react-icons/pi";
import { IRecentProductView } from "@/src/types/schema";
import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import toast from "react-hot-toast";
import { FaRegSmileBeam } from "react-icons/fa";

const RecentViewProducts = () => {
  const { data: recentViewedProducts, isLoading } =
    useGetRecentViewProductsQuery(undefined);

  const [deleteRecentProduct] = useDeleteRecentProductMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 8;

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    recentViewedProducts?.slice(startIndex, endIndex) || [];
  const totalProducts = recentViewedProducts?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeletRecentViewedProduct = async (id: string) => {
    await toast.promise(deleteRecentProduct({ productId: id }).unwrap(), {
      loading: "Removing...",
      success: "Removed from Recent Viewed!",
      error: "Failed to remove product",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-4 mt-20">
          <div className="flex justify-center items-center gap-2 uppercase mt-6">
            <PiStarFourFill className="text-[#6DAE03] text-2xl" />
            <span className="font-medium text-[#6DAE03] text-xl">Your Next Favorite Is Waiting!
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-black text-center">
          Products You’ve Recently Explored
          </h1>

          <div>
            {totalProducts === 0 ? (
              <div className="max-w-lg mx-auto my-16 text-center">
                <p className="text-2xl font-semibold text-black mt-4">
                  <FaRegSmileBeam className="inline text-[#FFA900] text-4xl mr-2" />
                  Oops, looks like you haven't checked anything out yet!
                </p>
                <p className="text-lg text-gray-500 mt-2">
               
Why wait? Dive into our diverse range of products and start adding them to your recently viewed list. Your next find might be closer than you think!


                </p>
              </div>
            ) : (
              <>
                <div className="my-14 grid grid-cols-1 lg:grid-cols-2 gap-6 w-[95%] mx-auto">
                  {paginatedProducts.map((singleProduct: IRecentProductView) => {
                    const discountPercentage =
                      (singleProduct?.product.discount ?? 0) / 100;
                    const discountAmount =
                      singleProduct.product.price * discountPercentage;
                    const discountedPrice = singleProduct?.product.flashSale
                      ? singleProduct.product.price - discountAmount
                      : singleProduct.product.price;

                    const params = new URLSearchParams();
                    params.set("product", singleProduct.product.id);

                    return (
                      <div
                        key={singleProduct.id}
                        className="card card-side bg-white shadow-lg rounded-lg relative overflow-hidden"
                      >
                        <span
                          onClick={() =>
                            handleDeletRecentViewedProduct(singleProduct.product.id)
                          }
                          className="absolute right-3 top-3 w-9 h-9 border-2 border-[#6DAE03] rounded-full text-center p-1 font-bold text-[#6DAE03] cursor-pointer hover:bg-[#6DAE03] hover:text-white"
                        >
                          X
                        </span>
                        <figure className="w-[30%] md:w-[40%]">
                          <img
                            src={singleProduct.product.image[0]}
                            alt="Product"
                            className="w-full h-[220px] object-cover rounded-l-lg"
                          />
                        </figure>
                        <div className="card-body p-4">
                          <h2 className="card-title text-black text-xl font-semibold">
                            {singleProduct.product.name}
                          </h2>
                          <p className="text-sm text-gray-600 truncate">
                            {singleProduct.product.description?.slice(0, 90)}...
                          </p>
                          <div className="flex gap-2 items-center mt-3">
                            <span className="text-md text-black">Price:</span>
                            <h2
                              className={`text-xl font-medium text-black ${
                                singleProduct?.product.flashSale && "line-through"
                              }`}
                            >
                              <span>$</span>
                              {singleProduct.product.price}
                            </h2>
                            {singleProduct?.product.flashSale && (
                              <h2 className="text-xl font-medium text-[#6DAE03]">
                                <span>$</span>
                                {discountedPrice}
                              </h2>
                            )}
                          </div>
                          <div className="mt-2">
                            {singleProduct.product.flashSale && (
                              <div className="inline-block px-3 py-1 text-sm font-medium text-white bg-[#6DAE03] rounded-full animate-blink">
                                Flash Sale On!
                              </div>
                            )}
                          </div>
                          <div className="card-actions justify-center mt-4">
                            <Link href={`/productDetails?${params.toString()}`}>
                              <button className="w-full py-2 bg-[#6DAE03] text-white font-bold rounded-lg transition duration-300 hover:bg-[#FFA900]">
                                View Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-4 pb-16">
                  <Pagination
                    total={totalPages}
                    initialPage={1}
                    page={currentPage}
                    onChange={handlePageChange}
                    showControls
                    color="primary"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentViewProducts;
