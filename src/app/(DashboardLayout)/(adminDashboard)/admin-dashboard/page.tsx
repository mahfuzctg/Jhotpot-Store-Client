/* eslint-disable react/self-closing-comp */
"use client";

import DashboardActivityCard from "@/src/components/Cards/DashboardActivityCard";
import DashboardChartLoading from "@/src/components/LoadingCards/DashboardChartLoading";
import StatCardLoading from "@/src/components/LoadingCards/StatCardLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllUsersQuery } from "@/src/lib/redux/features/auth/auth.api";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import { PackageOpen, Users } from "lucide-react";

const AdminDashboardHome = () => {
  const { data: allCustomers, isLoading: customerLoading } =
    useGetAllUsersQuery({
      role: "CUSTOMER",
    });

  const { data: allVendors, isLoading: vendorLoading } = useGetAllUsersQuery({
    role: "VENDOR",
  });

  const { data: allProductsResponse, isLoading: productLoading } =
    useGetAllProductsQuery({});

  const totalProducts = allProductsResponse?.meta?.total || 0;
  const totalVendors = allVendors?.meta?.total || 0;
  const totalCustomers = allCustomers?.meta?.total || 0;

  return (
    <div>
      <DashboardSectionTitle heading="Website Overview" />

      <div>
        {customerLoading || vendorLoading || productLoading ? (
          <StatCardLoading />
        ) : (
          <div className="flex flex-col md:flex-row justify-center my-7">
            <div className="grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 mr-5 gap-6 xl:gap-8">
              <div className="shadow-md p-4 flex-1 border-2 border-primary rounded-md md:col-span-4 xl:col-span-4">
                <div className="flex justify-between items-center w-full md:w-56">
                  <div>
                    <div className="uppercase text-sm text-gray-800 font-semibold">
                      Total Vendors
                    </div>
                    <div className="mt-1 text-2xl text-gray-500 font-bold">
                      {totalVendors}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-cart h-16 w-20 text-gray-600"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </div>
              </div>

              <div className="shadow-md p-4 flex-1 border-2 border-primary rounded-md md:col-span-4 xl:col-span-4">
                <div className="flex justify-between items-center w-full md:w-56">
                  <div>
                    <div className="uppercase text-sm text-gray-800 font-semibold">
                      Total Products
                    </div>
                    <div className="mt-1 text-2xl text-gray-500 font-bold">
                      {totalProducts}
                    </div>
                  </div>
                  <PackageOpen className="h-16 w-20 text-gray-600" />
                </div>
              </div>

              <div className="shadow-md p-4 flex-1 border-2 border-primary rounded-md md:col-start-3 md:col-span-4 xl:col-span-4">
                <div className="flex justify-between items-center w-full md:w-56">
                  <div>
                    <div className="uppercase text-sm text-gray-800 font-semibold">
                      Total Customers
                    </div>
                    <div className="mt-1 text-2xl font-bold text-gray-500">
                      {totalCustomers}
                    </div>
                  </div>
                  <Users className="h-16 w-20 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-5">
        {productLoading ? <DashboardChartLoading /> : <DashboardActivityCard />}
      </div>
    </div>
  );
};

export default AdminDashboardHome;