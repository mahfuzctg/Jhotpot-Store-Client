"use client";

import TableLoadingSkeleton from "@/src/components/LoadingCards/TableLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
;
import { Pagination } from "@nextui-org/pagination";
import { IOrder } from "@/src/types/schema";
import { useGetAllOrdersQuery } from "@/src/lib/redux/features/orders/order.api";

const OrderList = () => {
  const { userData } = useUserDetails();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    vendorId: userData?.userData?.id,
  });

  const { data: vendorOrders, isLoading } = useGetAllOrdersQuery(queryObj, {
    skip: !userData?.userData,
  });

  const totalPages = Math.ceil((vendorOrders?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      vendorId: userData?.userData?.id,
    }));
  }, [currentPage, userData?.userData]);

  return (
    <div>
      <DashboardSectionTitle heading="Order History" />

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
                    <th className="text-gray-300">Product</th>
                    <th className="text-gray-300">Quantity</th>
                    <th className="text-gray-300">Customer Name</th>
                    <th className="text-gray-300">Total Price</th>
                    {/* <th className="text-gray-300">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {vendorOrders?.data.length > 0 &&
                    vendorOrders?.data?.map(
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
                              {singleOrder?.customer?.name}
                            </td>
                            <td className="font-semibold text-white">
                              <span>$</span>
                              {(singleOrder?.totalPrice).toFixed(2)}
                            </td>
                       
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </motion.div>

            <div className="pt-7">
              {vendorOrders?.data?.length > 0 && (
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
    </div>
  );
};

export default OrderList;