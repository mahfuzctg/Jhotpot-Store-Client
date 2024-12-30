"use client";

import TableLoadingSkeleton from "@/src/components/LoadingCards/TableLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllUsersQuery } from "@/src/lib/redux/features/auth/auth.api";
import { useBlockUserMutation, useUnblockUserMutation } from "@/src/lib/redux/features/users/user.api";
import { IUser } from "@/src/types/schema";

import { Pagination } from "@nextui-org/pagination";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    role: "CUSTOMER",
  });

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data: allCustomers, isLoading: customerLoading } =
    useGetAllUsersQuery(queryObj);

  const totalPages = Math.ceil((allCustomers?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBlockUser = async (email: string) => {
    try {
      await toast.promise(blockUser(email).unwrap(), {
        loading: "Blocking...",
        success: (res) => {
          if (res.success) {
            return "Customer is blocked successfully!";
          } else {
            throw new Error(res.message);
          }
        },
        error: "Failed to block",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUnblockUser = async (email: string) => {
    try {
      await toast.promise(unblockUser(email).unwrap(), {
        loading: "Unblocking...",
        success: (res) => {
          if (res.success) {
            return "Customer is unblocked successfully!";
          } else {
            throw new Error(res.message);
          }
        },
        error: "Failed to unblock!",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      page: currentPage,
      limit: dataPerPage,
      role: "CUSTOMER",
    }));
  }, [currentPage]);

  return (
    <div>
      <DashboardSectionTitle heading="Customer Management" />

      <div>
        {customerLoading ? (
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
                    <th className="text-gray-300">Profile Photo</th>
                    <th className="text-gray-300">Name</th>
                    <th className="text-gray-300 text-center">Email</th>
                    <th className="text-gray-300">Address</th>
                    <th className="text-gray-300">Phone</th>
                    <th className="text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomers?.data.length > 0 &&
                    allCustomers?.data?.map(
                      (singleCustomer: IUser, index: number) => {
                        return (
                          <tr key={index} className="rounded-lg">
                            <th className="text-gray-800">
                              {index + 1 + (currentPage - 1) * dataPerPage}
                            </th>
                            <td className="flex justify-center items-center">
                              <img
                                src={singleCustomer?.customer?.profilePhoto}
                                alt="profilePhoto"
                                className="w-12 h-12 object-cover rounded-full"
                              />
                            </td>
                            <td className="text-gray-800 font-semibold">
                              {singleCustomer?.customer?.name}
                            </td>
                            <td className="font-semibold text-center text-gray-800">
                              {singleCustomer?.email}
                            </td>
                            <td className="font-semibold text-gray-800">
                              {singleCustomer?.customer?.address}
                            </td>
                            <td className="font-semibold text-gray-800">
                              {singleCustomer?.customer?.phone}
                            </td>
                            <td className="">
                              {singleCustomer?.status === "ACTIVE" ? (
                                <button
                                  onClick={() =>
                                    handleBlockUser(singleCustomer?.email)
                                  }
                                  className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
                                >
                                  Block
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleUnblockUser(singleCustomer?.email)
                                  }
                                  className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
                                >
                                  Unblock
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </motion.div>

            <div className="py-7">
              {allCustomers?.data?.length > 0 && (
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

export default CustomerManagement;