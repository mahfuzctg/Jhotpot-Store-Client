"use client";

import { ICategory } from "@/src/types/schema";
import Link from "next/link";

const HomeCategoryCard = ({ category }: { category: ICategory }) => {
  const params = new URLSearchParams();
  params.set("category", category.name);

  return (
    <div className="flex justify-center items-center space-x-4 py-8">
      <div className="flex flex-col items-center relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-[235px] h-[235px] object-cover rounded-lg"
        />
        <p className="absolute text-lg font-semibold bg-[#82C408] w-[185px] rounded-full -bottom-6 py-2 text-center hover:bg-[#FFA900] cursor-pointer text-white">
          <Link href={`/allProducts?${params.toString()}`}>
            {category.name}
          </Link>
        </p>
      </div>
      <div className="border-l-2 border-dotted h-48 hidden md:block border-black" />
    </div>
  );
};

export default HomeCategoryCard;
