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
    useGetAllUsersQuery({ role: "CUSTOMER" });

  const { data: allVendors, isLoading: vendorLoading } =
    useGetAllUsersQuery({ role: "VENDOR" });

  const { data: allProductsResponse, isLoading: productLoading } =
    useGetAllProductsQuery({});

  const totalProducts = allProductsResponse?.meta?.total || 0;
  const totalVendors = allVendors?.meta?.total || 0;
  const totalCustomers = allCustomers?.meta?.total || 0;

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      {/* Title Section */}
      <div className="text-center mb-8">
        <DashboardSectionTitle heading="📊 Admin Overview" />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {customerLoading || vendorLoading || productLoading ? (
          <StatCardLoading />
        ) : (
          <>
            {/* Stats Card Component with Green Gradient */}
            {[{
              title: "Total Vendors",
              value: totalVendors,
              icon: <Store className="h-12 w-12 text-white" />,
              bg: "bg-gradient-to-r from-[#82C408] to-[#6D9D03]",
            },
            {
              title: "Total Products",
              value: totalProducts,
              icon: <PackageOpen className="h-12 w-12 text-white" />,
              bg: "bg-gradient-to-r from-[#82C408] to-[#6D9D03]",
            },
            {
              title: "Total Customers",
              value: totalCustomers,
              icon: <Users className="h-12 w-12 text-white" />,
              bg: "bg-gradient-to-r from-[#82C408] to-[#6D9D03]",
            }]
            .map(({ title, value, icon, bg }, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center text-white shadow-lg rounded-lg p-4 w-[250px] transition-all transform hover:scale-105 hover:shadow-lg ${bg}`}
                style={{
                  clipPath: "polygon(0% 10%, 10% 10%, 10% 0%, 90% 0%, 90% 10%, 100% 10%, 100% 90%, 90% 90%, 90% 100%, 10% 100%, 10% 90%, 0% 90%)",
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-lg"></div>

                <div className="text-sm font-semibold">{title}</div>
                <div className="text-4xl font-extrabold">{value}</div>
                <div className="mt-3">{icon}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className="my-8">
        {productLoading ? <DashboardChartLoading /> : <DashboardActivityCard />}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
