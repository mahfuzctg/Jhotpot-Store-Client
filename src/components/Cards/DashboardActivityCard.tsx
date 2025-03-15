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
    <div className=" rounded-2xl p-8 mb-12 w-full h-[60vh] mx-auto  transition-transform transform hover:scale-105 ">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Product Count by Vendor
      </h1>
      <div className="w-full h-full rounded-2xl overflow-hidden shadow-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: "#555" }}
              axisLine={{ stroke: "#ddd" }}
              tickLine={{ stroke: "#ddd" }}
              interval={0}
            />
            <YAxis
              domain={[0, Math.max(...chartData.map((d) => d.productCount), 20)]}
              tick={{ fontSize: 14, fill: "#555" }}
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
              fill="url(#gradient)"
              barSize={45}
              radius={[10, 10, 0, 0]}
              background={{ fill: "#f5f5f5" }}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#82C408" />
            <stop offset="100%" stopColor="#6D9D03" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default DashboardActivityCard;
