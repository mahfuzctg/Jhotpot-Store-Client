"use client";

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
import Title from "@/src/components/Sections/title";

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

  const handlePageChange = (page: number) => setCurrentPage(page);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="w-full max-w-6xl mx-auto p-4 lg:p-6"
    >
      <Title sub="Track and manage all your recent orders effortlessly." heading="Order Management" />
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border-t-4 border-[#70B103] overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#70B103] text-gray-700 py-3 px-6 rounded-t-lg">
            <h2 className="text-lg font-semibold">Your Recent Orders</h2>
          </div>

          {/* Table Body */}
          <motion.div
            className="overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <table className="w-[90%] mx-auto table-fixed lg:table-auto">
              <thead className="bg-gray-100 text-gray-700  ">
                <tr className="text-left text-sm lg:text-base   ">
                  <th className="py-3 px-4">No.</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Shop</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {customerOrders?.data.length > 0 &&
                  customerOrders?.data?.map(
                    (singleOrder: IOrder, index: number) => {
                      return (
                        <tr key={index} className="rounded-lg ">
                          <th className="text-gray-700">
                            {index + 1 + (currentPage - 1) * dataPerPage}
                          </th>
                          <td className="flex justify-evently items-center">
                            <img
                              src={singleOrder?.orderDetails[0]?.product?.image[0]}
                              alt="product"
                              className="w-20 h-20 rounded-xl object-cover"
                            />
                          </td>
                          <td className="text-gray-700 font-semibold">
                            {singleOrder?.orderDetails[0]?.product?.name}
                          </td>
                          <td className="font-semibold text-center text-gray-700">
                            {singleOrder?.orderDetails[0]?.quantity}
                          </td>
                          <td className="font-semibold text-gray-700">
                            {singleOrder?.vendor?.shopName}
                          </td>
                          <td className="font-semibold text-orange-500">
                            <span>$</span>
                            {(singleOrder?.totalPrice).toFixed(2)}
                          </td>
                          <td className="font-semibold text-orange-500">
                            <button
                              onClick={() => handleAddReviewClick(singleOrder)}
                              className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-[#70B103] text-black before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-700 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
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

          {/* Pagination */}
          {customerOrders?.data.length > 0 && (
            <div className="flex justify-center items-center py-6 bg-gray-50">
              <Pagination
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={handlePageChange}
                showControls
                className="text-gray-700"
              />
            </div>
          )}
        </div>
      )}

      {/* Add Review Modal */}
      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ProductReviewModal singleOrder={selectedOrder} />
      </MainModal>
    </motion.div>
  );
};

export default MyOrders;
