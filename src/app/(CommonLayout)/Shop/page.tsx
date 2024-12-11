"use client";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import Loading from "@/src/components/Loading/Loading";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useGetSingleCustomerQuery, useGetSingleVendorQuery } from "@/src/lib/redux/features/auth/auth.api";

import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/src/lib/redux/features/users/user.api";
import { IFollow, IProduct } from "@/src/types/schema";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const dataPerPage = 8;

  useEffect(() => {
    const id = searchParams.get("shop");
    setVendorId(id);

    if (userData?.userData?.email) {
      setEmail(userData?.userData?.email);
    }
  }, [searchParams, userData?.userData]);

  const { data: singleVendor, isLoading } = useGetSingleVendorQuery(
    vendorId ?? "",
    {
      skip: !vendorId,
    }
  );

  const { data: singleCustomer } = useGetSingleCustomerQuery(email ?? "", {
    skip: !email,
  });
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedProducts =
    singleVendor?.products?.slice(startIndex, endIndex) || [];
  const totalProducts = singleVendor?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / dataPerPage);

  const handleFollowVendor = async () => {
    const vendorInfo = {
      vendorId: singleVendor?.id,
    };

    await toast.promise(followUser(vendorInfo).unwrap(), {
      loading: "Following...",
      success: `You followed ${singleVendor?.shopName}`,
      error: "Failed to follow shop",
    });
  };

  const handleunfollowVendor = async () => {
    const vendorInfo = {
      vendorId: singleVendor?.id,
    };

    await toast.promise(unfollowUser(vendorInfo).unwrap(), {
      loading: "Unfollowing...",
      success: `You unfollowed ${singleVendor?.shopName}`,
      error: "Failed to unfollow shop",
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="pb-14">
          {/* Shop Details part */}
          <div className="p-6 flex flex-col justify-center items-center">
            <div className="mb-4 space-y-2">
              <div className="flex justify-center items-center">
                <img
                  src={singleVendor?.logo}
                  alt={singleVendor?.shopName || "Vendor Logo"}
                  className="object-cover h-24"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-center items-center">
                <h2 className="text-4xl font-semibold text-white">
                  {singleVendor?.shopName || "Shop Name"}
                </h2>
                <p className="text-white/80 text-lg max-w-lg mx-auto text-center">
                  {singleVendor?.description || "No description available."}
                </p>
                <p className="text-white/70 text-lg flex gap-2 items-center">
                  <span>
                    <FaUserFriends className="text-xl" />
                  </span>{" "}
                  <span> {singleVendor?.followers?.length || 0} Followers</span>
                </p>
                {userData?.userData?.role === "CUSTOMER" &&
                !singleCustomer?.follows?.some(
                  (follow: IFollow) => follow.vendorId === vendorId
                ) ? (
                  <button
                    onClick={handleFollowVendor}
                    className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={handleunfollowVendor}
                    className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Shop product part */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3">
            {isLoading
              ? Array.from({ length: dataPerPage }).map((_, index) => (
                  <div key={index}>
                    <ProductLoading />
                  </div>
                ))
              : paginatedProducts.map((singleProduct: IProduct) => (
                  <div key={singleProduct.id}>
                    <HomeProductCard singleProduct={singleProduct} />
                  </div>
                ))}
          </div>

          <div className="pt-7">
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
      )}
    </div>
  );
};

export default ShopPage;