"use client";

import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import { useEffect, useState } from "react";
import ProductLoading from "../../LoadingCards/ProductLoading";
import { IProduct } from "@/src/types/schema";
import NavSearchProductCard from "../../Cards/NavSearchProductCard";

const NavSearchModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { data: allProductsResponse, isLoading } = useGetAllProductsQuery(
    {
      searchTerm: debouncedSearchTerm,
    },
    {
      skip: !debouncedSearchTerm,
    }
  );

  // Debounce implementation using setTimeout for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  console.log(allProductsResponse);

  return (
    <div>
      <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent pb-3 placeholder:text-xl border-b border-gray-300 outline-none invalid:border-red-400 transition px-3 text-lg md:text-xl"
        />
      </div>

      <div className="py-8 grid grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <ProductLoading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <NavSearchProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default NavSearchModal;