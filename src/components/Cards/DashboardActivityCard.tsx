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

    const formattedData = Object.values(groupedData) as ChartData[];

    setChartData(formattedData);
  }, [allProductsResponse]);

  return (
    <div className=" shadow-lg rounded-xl p-6 mb-8 w-full h-[50vh] mx-auto transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Product Count by Vendor
      </h1>
      <div className="w-full h-full rounded-xl overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 40,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: "#444" }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={{ stroke: "#ddd" }}
              interval={0}
            />
            <YAxis
              domain={[0, Math.max(...chartData.map((d) => d.productCount), 20)]}
              tick={{ fontSize: 14, fill: "#444" }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={{ stroke: "#ddd" }}
            />
            <Tooltip
              contentStyle={{
                fontSize: "14px",
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "8px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar
              dataKey="productCount"
              fill="#82C408"
              barSize={35}
              radius={[8, 8, 0, 0]}
              background={{ fill: "#f5f5f5" }}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardActivityCard;
