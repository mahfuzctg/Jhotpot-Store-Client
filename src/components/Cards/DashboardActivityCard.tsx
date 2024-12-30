
"use client";

import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import { IProduct } from "@/src/types/schema";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  productCount: number;
}

const DashboardActivityCard = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const { data: allProductsResponse } = useGetAllProductsQuery({});

  useEffect(() => {
    if (!allProductsResponse?.data) return;

    // console.log("Total Products Received:", allProductsResponse.data.length);

    const groupedData = allProductsResponse.data.reduce(
      (acc: Record<string, ChartData>, product: IProduct) => {
        const vendorName =
          product.vendor?.shopName || product.vendor?.name || "Unknown Vendor";

        if (!acc[vendorName]) {
          acc[vendorName] = { name: vendorName, productCount: 0 };
        }

        acc[vendorName].productCount += 1;
        return acc;
      },
      {} as Record<string, ChartData>
    );

    // console.log("Grouped Data:", groupedData);

    const formattedData = Object.values(groupedData) as ChartData[];

    // console.log("Formatted Chart Data:", formattedData);

    setChartData(formattedData);
  }, [allProductsResponse]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center lg:text-left lg:ml-8">
        Product Count by Vendor
      </h1>
      <div className="w-full h-[400px] sm:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
            <YAxis
              domain={[
                0,
                Math.max(...chartData.map((d) => d.productCount), 20),
              ]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip contentStyle={{ fontSize: "12px" }} />
            <Bar dataKey="productCount" fill="#f5840c" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardActivityCard;
