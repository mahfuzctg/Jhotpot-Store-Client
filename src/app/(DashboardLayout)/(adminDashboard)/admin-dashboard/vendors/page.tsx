"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";

import { Pagination } from "@nextui-org/pagination";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableLoadingSkeleton from "@/src/components/LoadingCards/TableLoading";


import toast from "react-hot-toast";
import { useGetAllUsersQuery } from "@/src/lib/redux/features/auth/auth.api";
import { IUser } from "@/src/types/schema";
import { useBlockUserMutation, useUnblockUserMutation } from "@/src/lib/redux/features/users/user.api";

const VendorManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    role: "VENDOR",
  });

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const { data: allVendors, isLoading: vendorLoading } =
    useGetAllUsersQuery(queryObj);

  const totalPages = Math.ceil((allVendors?.meta?.total || 0) / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBlockUser = async (email: string) => {
    try {
      await toast.promise(blockUser(email).unwrap(), {
        loading: "Suspending...",
        success: (res) => {
          if (res.success) {
            return "Vendor is suspended successfully";
          } else {
            throw new Error(res.message);
          }
        },
        error: "Failed to suspend",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUnblockUser = async (email: string) => {
    try {
      await toast.promise(unblockUser(email).unwrap(), {
        loading: "Activating...",
        success: (res) => {
          if (res.success) {
            return "Vendor is activated successfully";
          } else {
            throw new Error(res.message);
          }
        },
        error: "Failed to activate!",
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
      role: "VENDOR",
    }));
  }, [currentPage]);

  return (
    <div>
      <DashboardSectionTitle heading="Vendor Management" />

      <div>
        {vendorLoading ? (
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
                <thead className="text-lg text-center">
                  <tr>
                    <th className="text-gray-300">No.</th>
                    <th className="text-gray-300">Shop Logo</th>
                    <th className="text-gray-300">Shop Name</th>
                    <th className="text-gray-300 text-center">Email</th>
                    <th className="text-gray-300">Vendor Name</th>
                    <th className="text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allVendors?.data.length > 0 &&
                    allVendors?.data?.map(
                      (singleVendor: IUser, index: number) => {
                        console.log(singleVendor?.vendor);
                        return (
                          <tr key={index} className="rounded-lg text-center">
                            <th className="text-gray-800">
                              {index + 1 + (currentPage - 1) * dataPerPage}
                            </th>
                            <td className="flex justify-center items-center">
                              <img
                                src={singleVendor?.vendor?.logo}
                                alt="profilePhoto"
                                className="w-16 h-16 object-contain"
                              />
                            </td>
                            <td className="text-gray-800 font-semibold">
                              {singleVendor?.vendor?.shopName}
                            </td>
                            <td className="font-semibold text-center text-gray-800">
                              {singleVendor?.email}
                            </td>
                            <td className="font-semibold text-gray-800">
                              {singleVendor?.vendor?.name}
                            </td>
                            <td className="">
                              {singleVendor?.status === "ACTIVE" ? (
                                <button
                                  onClick={() =>
                                    handleBlockUser(singleVendor?.email)
                                  }
                                  className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
                                >
                                  Suspend
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleUnblockUser(singleVendor?.email)
                                  }
                                  className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3 text-xs"
                                >
                                  Activate
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
              {allVendors?.data?.length > 0 && (
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

export default VendorManagement;