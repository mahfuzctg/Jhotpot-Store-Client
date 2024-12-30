"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableLoadingSkeleton from "@/src/components/LoadingCards/TableLoading";

import { Pagination } from "@nextui-org/pagination";
import { useGetAllOrdersQuery } from "@/src/lib/redux/features/orders/order.api";
import { IOrder } from "@/src/types/schema";

const PaymentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
  });

  const { data: allOrders, isLoading } = useGetAllOrdersQuery(queryObj);

  const totalPages = Math.ceil((allOrders?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
    }));
  }, [currentPage]);

  return (
    <div>
      <DashboardSectionTitle heading="Payment Management" />

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
                    <th className="text-gray-300">Customer Name</th>
                    <th className="text-gray-300">Customer Email</th>
                    <th className="text-gray-300">Shop Name</th>
                    <th className="text-gray-300">Vendor Email</th>
                    <th className="text-gray-300">Total Price</th>
                    <th className="text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders?.data.length > 0 &&
                    allOrders?.data?.map(
                      (singleOrder: IOrder, index: number) => {
                        return (
                          <tr key={index} className="rounded-lg">
                            <th className="text-gray-800">
                              {index + 1 + (currentPage - 1) * dataPerPage}
                            </th>
                            <td className="text-gray-800 font-semibold">
                              {singleOrder?.customer?.name}
                            </td>
                            <td className="text-gray-800 font-semibold">
                              {singleOrder?.customer?.email}
                            </td>
                            <td className="font-semibold text-center text-gray-800">
                              {singleOrder?.vendor?.shopName}
                            </td>
                            <td className="font-semibold text-gray-800">
                              {singleOrder?.vendor?.email}
                            </td>
                            <td className="font-semibold text-gray-800">
                              <span>$</span>
                              {(singleOrder?.totalPrice).toFixed(2)}
                            </td>
                            <td className="font-semibold text-gray-800">
                              <button className="relative h-8 origin-top transform rounded-lg border-2 border-primary text-primary uppercase font-bold px-3">
                                PAID
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
              {allOrders?.data?.length > 0 && (
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

export default PaymentManagement;