"use client";

import DashboardActivityCard from "@/src/components/Cards/DashboardActivityCard";
import DashboardChartLoading from "@/src/components/LoadingCards/DashboardChartLoading";
import StatCardLoading from "@/src/components/LoadingCards/StatCardLoading";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllUsersQuery } from "@/src/lib/redux/features/auth/auth.api";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import { PackageOpen, Store, Users } from "lucide-react";

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
    <div className="min-h-screen bg-white px-10 py-12">
      <div className="text-center mb-10">
        <DashboardSectionTitle heading="Website Overview" />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-10">
        {customerLoading || vendorLoading || productLoading ? (
          <StatCardLoading />
        ) : (
          <>
         {/* Total Vendors Card */}
<div className="flex flex-col items-center justify-center bg-white text-gray-800 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300 w-[300px]">
  <div className="text-xl font-semibold mb-3">Total Vendors</div>
  <div className="text-4xl font-bold">{totalVendors}</div>
  <div className="mt-4 text-gray-800">
    <Store className="h-16 w-16 text-[#82C408]" /> {/* Green icon color */}
  </div>
</div>


            {/* Total Products Card */}
            <div className="flex flex-col items-center justify-center bg-white text-gray-800 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300 w-[300px]">
              <div className="text-xl font-semibold mb-3">Total Products</div>
              <div className="text-4xl font-bold">{totalProducts}</div>
              <div className="mt-4 text-gray-800">
                <PackageOpen className="h-16 w-16 text-[#82C408]" /> {/* Green icon color */}
              </div>
            </div>

            {/* Total Customers Card */}
            <div className="flex flex-col items-center justify-center bg-white text-gray-800 shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300 w-[300px]">
              <div className="text-xl font-semibold mb-3">Total Customers</div>
              <div className="text-4xl font-bold">{totalCustomers}</div>
              <div className="mt-4 text-gray-800">
                <Users className="h-16 w-16 text-[#82C408]" /> {/* Green icon color */}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className="my-12">
        {productLoading ? <DashboardChartLoading /> : <DashboardActivityCard />}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
