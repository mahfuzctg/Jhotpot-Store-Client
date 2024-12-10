"use client";

import { Key, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";

import { GrCompare } from "react-icons/gr";
import { BiFilterAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Slider from "react-slider";

import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import { ICategory, IProduct } from "@/src/types/schema";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/porduct.api";

const AllProducts = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [queryObj, setQueryObj] = useState({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category: category || selectedCategory,
    sort,
  });

  const updateDataPerPage = () => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setDataPerPage(12);
    } else if (width >= 768 && width < 1280) {
      setDataPerPage(9);
    } else if (width >= 425 && width < 768) {
      setDataPerPage(8);
    } else {
      setDataPerPage(6);
    }
  };

  useEffect(() => {
    updateDataPerPage();
    window.addEventListener("resize", updateDataPerPage);

    return () => {
      window.removeEventListener("resize", updateDataPerPage);
    };
  }, []);

  const { data: allCategories } = useGetAllCategoriesQuery(undefined);

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(queryObj);

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Debounce implementation using setTimeout for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (
      searchTerm ||
      category ||
      sort ||
      minPrice > 500 ||
      maxPrice < 7000 ||
      selectedCategory
    ) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  }, [searchTerm, category, sort, minPrice, maxPrice, selectedCategory]);

  const handleCategorySelect = (key: Key) => {
    setCategory(String(key));
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
  };

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  useEffect(() => {
    setQueryObj((prev) => ({
      ...prev,
      sort,
      searchTerm: debouncedSearchTerm,
      category: category || selectedCategory,
      minPrice,
      maxPrice,
      page: currentPage,
      limit: dataPerPage,
    }));
    refetch();
  }, [
    sort,
    debouncedSearchTerm,
    category,
    minPrice,
    maxPrice,
    currentPage,
    refetch,
    selectedCategory,
  ]);

  return (
    <div className="pb-16 mt-28">
      {/* Filter part */}
      <div className="flex flex-col xl:flex-row items-center my-5 p-4 border rounded-md border-red-500 shadow md:w-[95%] mx-auto gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-red-500 py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-700 placeholder-gray-600"
          />

          {/* Category filter part */}
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  color="primary"
                  variant="bordered"
                  className="capitalize font-medium text-gray-700"
                >
                  {category || "Select Product Category"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Select Product Category"
                color="primary"
                variant="bordered"
                onAction={handleCategorySelect}
              >
                {allCategories?.map((category: ICategory) => (
                  <DropdownItem key={category.name} className="text-gray-700">
                    {category.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Sorting part */}
          <div className="w-full md:w-32">
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  color="primary"
                  variant="bordered"
                  className="capitalize font-medium text-gray-700"
                >
                  Sort By Price
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort Posts"
                color="primary"
                variant="bordered"
                onAction={handleSortSelect}
              >
                <DropdownItem key="asc" className="text-gray-700">
                  Low to High
                </DropdownItem>
                <DropdownItem key="desc" className="text-gray-700">
                  High to Low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-5 items-center">
          <div className=" flex lg:justify-start items-center w-full lg:w-96 xl:w-80">
            <button className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-gray-700 py-2 px-3 font-medium w-full xl:w-auto">
              <span>
                <GrCompare className="text-xl text-gray-700" />
              </span>
              <span>Compare Products</span>
            </button>
          </div>
          <div className="space-y-3 mt-3 w-full">
            <Slider
              className="slider"
              min={500}
              max={7000}
              step={10}
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
            />
            <p className="xl:text-xl font-medium text-gray-700 text-center">
              Price Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Filter show part */}
      {filterApplied && (
        <div className="border border-primary mt-4 p-4 flex gap-3 items-center md:w-[95%] mx-auto rounded-md shadow">
          <p className="font-semibold text-gray-700">Filtered By:</p>
          <div onClick={() => setSearchTerm("")} className="flex flex-wrap gap-2">
            {debouncedSearchTerm && (
              <span className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-gray-700 cursor-pointer">
                <span>{debouncedSearchTerm}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {category && (
              <span
                onClick={() => setCategory(null)}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-gray-700 cursor-pointer"
              >
                <span>{category}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {selectedCategory && (
              <span
                onClick={() => {
                  setCategory(null);
                  const params = new URLSearchParams(window.location.search);
                  params.delete("category");
                  window.history.replaceState(
                    {},
                    "",
                    `${window.location.pathname}?${params.toString()}`
                  );
                }}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-gray-700 cursor-pointer"
              >
                <span>{selectedCategory}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 md:w-[95%] mx-auto">
        {isLoading
          ? Array(12).fill(0).map((_, i) => <ProductLoading key={i} />)
          : allProductsResponse?.data?.map((product: IProduct) => (
            <HomeProductCard singleProduct={product} />

            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination
          total={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllProducts;
