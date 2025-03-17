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
import { ICategory, IProduct } from "@/src/types/schema";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";

const FlashSale = () => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(12);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [isCompareActive, setIsCompareActive] = useState(false);

  const { data: allCategories } = useGetAllCategoriesQuery(undefined);

  const {
    data: allProductsResponse,
    isLoading,
    refetch,
  } = useGetAllProductsQuery({
    page: currentPage,
    limit: dataPerPage,
    searchTerm: debouncedSearchTerm,
    minPrice,
    maxPrice,
    category,
    sort,
  });

  const totalPages = Math.ceil(
    (allProductsResponse?.meta?.total || 0) / dataPerPage
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
    refetch();
  }, [sort, debouncedSearchTerm, category, minPrice, maxPrice, currentPage, refetch]);

  return (
    <div className="pb-16">
      {/* Filter and Sidebar */}
      <div className="flex flex-col xl:flex-row gap-4 md:w-[95%]  mx-auto pt-8 px-3">
        {/* Sidebar - Filters */}
        <div className="w-full xl:w-[18%]  space-y-12 items-center mt-0 md:mt-0 xl:mt-28">
  {/* Search Input */}
  <input
    type="text"
    name="name"
    id="name"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-xl border-2 border-primary py-[6px] px-6 text-base font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-800 placeholder-gray-600"
  />

  {/* Category Filter */}
  <div>
    <Dropdown>
      <DropdownTrigger className="w-full">
        <Button
          color="primary"
          variant="bordered"
          className="capitalize font-medium text-gray-800"
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
          <DropdownItem key={category.name} className="text-gray-800">
            {category.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </div>

  {/* Sorting */}
  <div>
    <Dropdown>
      <DropdownTrigger className="w-full">
        <Button
          color="primary"
          variant="bordered"
          className="capitalize font-medium text-gray-800"
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
        <DropdownItem key="asc" className="text-gray-800">
          Low to High
        </DropdownItem>
        <DropdownItem key="desc" className="text-gray-800">
          High to Low
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

  {/* Price Range Slider */}
  <div className="space-y-3">
    <Slider
      className="slider"
      min={500}
      max={7000}
      step={10}
      value={[minPrice, maxPrice]}
      onChange={handleSliderChange}
    />
    <p className="text-xl text-center font-medium text-gray-800">
      Price Range: ${minPrice} - ${maxPrice}
    </p>
  </div>

  {/* Clear Filters */}
  {filterApplied && (
    <button
      className="px-3 py-2 flex items-center gap-2 text-gray-800 border border-primary rounded-2xl"
      onClick={() => {
        setSearchTerm("");
        setCategory("");
        setSort("");
        setFilterApplied(false);
        setMinPrice(500);
        setMaxPrice(7000);
      }}
    >
      Clear All Filters
    </button>
  )}
</div>


        {/* Products Section */}
        <div className="w-full xl:w-[80%] space-y-6">
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8">
            {isLoading
              ? Array.from({ length: dataPerPage }).map((_, index) => (
                  <ProductLoading key={index} />
                ))
              : allProductsResponse?.data?.map((singleProduct: IProduct) => (
                  <HomeProductCard
                    key={singleProduct.id}
                    singleProduct={singleProduct}
                    isCompareActive={isCompareActive}
                  />
                ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6">
            {allProductsResponse?.data?.length > 0 && (
              <Pagination
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={handlePageChange}
                showControls
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
