"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Key, useEffect, useState } from "react";

import { BiFilterAlt } from "react-icons/bi";
import { GrCompare } from "react-icons/gr";
import { ImCross } from "react-icons/im";

import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/porduct.api";
import { ICategory, IProduct } from "@/src/types/schema";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import Slider from "react-slider";

const AllProducts = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
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
    // setPage(1);
    // setPosts([]);
  };

  const handleSortSelect = (key: Key) => {
    setSort(String(key));
    // setPage(1);
    // setPosts([]);
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
    <div className="pb-16">
      {/* Filter part */}
      <div className="flex flex-col xl:flex-row items-center my-5 p-4 border rounded-md border-primary shadow md:w-[95%] mx-auto gap-4">
        <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border-2 border-primary py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-white"
          />

          {/* Category filter part */}
          <div className="w-full">
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  color="primary"
                  variant="bordered"
                  className="capitalize font-medium text-white"
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
                  <DropdownItem key={category.name} className="text-white">
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
                  className="capitalize font-medium text-white"
                >
                  Sort By Price
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort Posts"
                color="primary"
                variant="bordered"
                onAction={handleSortSelect} // Handle sort selection
              >
                <DropdownItem key="asc" className="text-white">
                  Low to High
                </DropdownItem>
                <DropdownItem key="desc" className="text-white">
                  High to Low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col lg:flex-row gap-5 items-center">
          <div className=" flex lg:justify-start items-center w-full lg:w-96 xl:w-80">
            <button className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-white py-2 px-3 font-medium w-full xl:w-auto">
              <span>
                <GrCompare className="text-xl text-white" />
              </span>
              <span>Compare Products</span>
            </button>
          </div>
          <div className=" space-y-3 mt-3 w-full">
            <Slider
              className="slider"
              min={500}
              max={7000}
              step={10}
              value={[minPrice, maxPrice]}
              onChange={handleSliderChange}
            />

            <p className="xl:text-xl font-medium text-white text-center">
              Price Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Filter show part */}
      {filterApplied && (
        <div className="border border-primary mt-4 p-4 flex gap-3 items-center md:w-[95%] mx-auto rounded-md shadow">
          <p className="font-semibold text-white">Filtered By:</p>
          <div
            onClick={() => setSearchTerm("")}
            className="flex flex-wrap gap-2"
          >
            {debouncedSearchTerm && (
              <span className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer">
                <span>{debouncedSearchTerm}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {category && (
              <span
                onClick={() => setCategory("")}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
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
                  setCategory("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("category");
                  window.history.replaceState(
                    null,
                    "",
                    `?${params.toString()}`
                  );
                }}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>{selectedCategory}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {sort && (
              <span
                onClick={() => setSort("")}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>{sort === "asc" ? "Low to High" : "High to Low"}</span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            {(minPrice > 500 || maxPrice < 7000) && (
              <span
                onClick={() => {
                  setMinPrice(500);
                  setMaxPrice(7000);
                }}
                className="border border-primary px-3 py-2 rounded-2xl flex gap-2 items-center text-white cursor-pointer"
              >
                <span>
                  Price: {minPrice}-{maxPrice}
                </span>
                <span>
                  <ImCross className="text-sm" />
                </span>
              </span>
            )}
            <button
              className="px-3 py-2 flex items-center gap-2 text-white border border-primary rounded-2xl"
              onClick={() => {
                setSearchTerm("");
                setCategory("");
                setSort("");
                setFilterApplied(false);
                setMinPrice(500);
                setMaxPrice(7000);
                const params = new URLSearchParams(searchParams.toString());
                params.delete("category");
                window.history.replaceState(null, "", `?${params.toString()}`);
              }}
            >
              <span>
                <BiFilterAlt className="text-lg" />
              </span>
              <span>Clear All</span>
            </button>
          </div>
        </div>
      )}

      {/* Product Card Part */}
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-3">
        {isLoading
          ? Array.from({ length: dataPerPage }).map((_, index) => (
              <div key={index}>
                <ProductLoading />
              </div>
            ))
          : allProductsResponse?.data?.map((singleProduct: IProduct) => (
              <div key={singleProduct.id}>
                <HomeProductCard singleProduct={singleProduct} />
              </div>
            ))}
      </div>

      {/* Pagination part */}
      <div className="pt-7">
        {allProductsResponse?.data?.length > 0 && (
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
  );
};

export default AllProducts;
