/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useDisclosure } from "@nextui-org/modal";
import { motion } from "framer-motion";

import { useGetReviewsByIdQuery } from "@/src/lib/redux/features/reviews/reviewApi";
import Image from 'next/image';
import MainModal from "../modal/Reusable/MainModal";
import UpdateVendorModal from "../modal/Reusable/UpdateVendorModal";
import { useGetAllOrdersQuery } from "@/src/lib/redux/features/orders/order.api";
import VendorProfileLoading from "../LoadingCards/VendorProfileLoading";

const VendorProfileCard = () => {
  const { userData, isLoading } = useUserDetails();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const totalProducts = userData?.userData?.products?.length || 0;
  const { data: vendorOrders } = useGetAllOrdersQuery(
    { vendorId: userData?.userData?.id },
    {
      skip: !userData?.userData,
    }
  );

  const { data: allReviews } = useGetReviewsByIdQuery(
    { vendorId: userData?.userData?.id },
    {
      skip: !userData?.userData,
    }
  );

  const totalVendorOrders = vendorOrders?.data?.length || 0;
  const totalVendorReviews = allReviews?.length || 0;

  return (
    <>
      {isLoading ? (
        <VendorProfileLoading />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:max-w-2xl max-w-xs mx-auto overflow-hidden rounded-lg shadow-lg bg-[#ffffff] p-2 my-16"
        >
          <div className="p-2 sm:w-1/2">
          <Image
  className="rounded sm:h-80 object-contain border-2 border-dashed border-primary px-3"
  src={
    userData?.userData?.logo ||
    "https://res.cloudinary.com/dxv10xebz/image/upload/v1725440747/samples/smile.jpg"
  }
  alt="Article"
  width={300} // Set an appropriate width for your image
  height={300} // Set an appropriate height for your image
  priority // Add this to prioritize the image for faster loading
/>


            
          </div>
          <div className="sm:p-4 p-2 sm:w-1/2 flex flex-col justify-between">
            <div>
              <a
                href="#"
                className="block sm:mt-2 text-2xl font-semibold text-black"
              >
                {userData?.userData?.shopName || "[Provide Shop Name]"}
              </a>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-600">
                {userData?.userData?.description ||
                  "[Provide Shop Description]"}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between my-6">
              <div className="space-y-1">
                <p className="text-sm text-black/70 font-medium">Products</p>
                <p className="text-2xl tracking-wider text-primary lg:text-3xl text-center">
                  {totalProducts}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-black/70 font-medium">Orders</p>
                <p className="text-2xl tracking-wider text-primary lg:text-3xl text-center">
                  {totalVendorOrders}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-black/70 font-medium">Reviews</p>
                <p className="text-2xl tracking-wider text-primary lg:text-3xl text-center">
                  {totalVendorReviews}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <button
                  onClick={onOpen}
                  className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
            <UpdateVendorModal />
          </MainModal>
        </motion.div>
      )}
    </>
  );
};

export default VendorProfileCard;