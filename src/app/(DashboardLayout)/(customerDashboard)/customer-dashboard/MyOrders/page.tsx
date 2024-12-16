"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Pagination } from "@nextui-org/pagination";
import TableLoadingSkeleton from "@/src/components/LoadingCards/TableLoading";
import { useDisclosure } from "@nextui-org/modal";
import { useGetAllOrdersQuery } from "@/src/lib/redux/features/orders/order.api";
import MainModal from "@/src/components/modal/Reusable/MainModal";
import ProductReviewModal from "@/src/components/modal/Reusable/ProductReviewModal";
import { IOrder } from "@/src/types/schema";


const MyOrders = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    customerId: userData?.userData?.id,
  });

  const { data: customerOrders, isLoading } = useGetAllOrdersQuery(queryObj, {
    skip: !userData?.userData,
  });

  const totalPages = Math.ceil(
    (customerOrders?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddReviewClick = (order: IOrder) => {
    setSelectedOrder(order);
    onOpen();
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      customerId: userData?.userData?.id,
    }));
  }, [currentPage, userData?.userData]);

  return (
    <div>
      <DashboardSectionTitle heading="My Orders" />

      <div>
        {isLoading ? (
          <TableLoadingSkeleton />
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
                overflowY: "auto" /* Enable scrolling */,
              }}
              className="overflow-x-auto mt-8"
            >
              <table className="table">
                {/* head */}
                <thead className="text-lg">
                  <tr>
                    <th className="text-gray-300">No.</th>
                    <th className="text-gray-300">Product Image</th>
                    <th className="text-gray-300">Product Name</th>
                    <th className="text-gray-300">Quantity</th>
                    <th className="text-gray-300">Shop Name</th>
                    <th className="text-gray-300">Total Price</th>
                    <th className="text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerOrders?.data.length > 0 &&
                    customerOrders?.data?.map(
                      (singleOrder: IOrder, index: number) => {
                        return (
                          <tr key={index} className="rounded-lg">
                            <th className="text-white">
                              {index + 1 + (currentPage - 1) * dataPerPage}
                            </th>
                            <td className="flex justify-center items-center">
                              <img
                                src={
                                  singleOrder?.orderDetails[0]?.product
                                    ?.image[0]
                                }
                                alt="product"
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                            </td>
                            <td className="text-white font-semibold">
                              {singleOrder?.orderDetails[0]?.product?.name}
                            </td>
                            <td className="font-semibold text-center text-white">
                              {singleOrder?.orderDetails[0]?.quantity}
                            </td>
                            <td className="font-semibold text-white">
                              {singleOrder?.vendor?.shopName}
                            </td>
                            <td className="font-semibold text-white">
                              <span>$</span>
                              {(singleOrder?.totalPrice).toFixed(2)}
                            </td>
                            <td className="">
                              <button
                                onClick={() =>
                                  handleAddReviewClick(singleOrder)
                                }
                                className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
                              >
                                Add Review
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </motion.div>

            <div className="pt-7">
              {customerOrders?.data?.length > 0 && (
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

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ProductReviewModal singleOrder={selectedOrder} />
      </MainModal>
    </div>
  );
};

export default MyOrders;