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
import { ICategory, IProduct } from "@/src/types/schema";
import { GrCompare } from "react-icons/gr";

import Slider from "react-slider";
import { useGetAllProductsQuery } from "@/src/lib/redux/features/products/product.api";
import ProductLoading from "@/src/components/LoadingCards/ProductLoading";
import HomeProductCard from "@/src/components/Cards/HomeProductCard";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";

import { useDisclosure } from "@nextui-org/modal";
import { removeCompareProducts, selectCompareProducts, setCompareProducts } from "@/src/lib/redux/features/compare/compare.slice";
import ComparisonModal from "@/src/components/modal/ComparisonModal";


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
  const [isCompareActive, setIsCompareActive] = useState(false);
  const dispatch = useAppDispatch();
  const productsForComparison = useAppSelector(selectCompareProducts);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleCompareButton = async () => {
    setIsCompareActive(!isCompareActive);
  };

  const handleCompareCheckbox = (checked: boolean, singleProduct: IProduct) => {
    if (checked) {
      if (productsForComparison.length >= 3) {
        toast.error("You can only compare up to 3 products.");
        return;
      }

      // Check if category matches
      if (
        productsForComparison.length === 0 ||
        productsForComparison[0]?.category?.name === singleProduct.category.name
      ) {
        dispatch(
          setCompareProducts({
            products: [...productsForComparison, singleProduct],
          })
        );
        toast.success(`${singleProduct.name} added for comparison.`);
      } else {
        toast.error("Products must be from the same category to compare.");
      }
    } else {
      // Remove product from comparison
      dispatch(removeCompareProducts(singleProduct.id));
      toast.success(`${singleProduct.name} removed from comparison.`);
    }
  };

  return (
<div className="pb-16">
  {/* Filter and Sidebar */}
  <div className="flex flex-col xl:flex-row gap-4 md:w-[95%] mx-auto pt-8 px-3">
    <div className="w-full xl:w-[18%] space-y-8">
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

      {/* Compare Products Section */}
      <div className="flex-1 w-full flex flex-col lg:flex-row gap-5 items-center">
        <div className="flex lg:justify-start items-center w-full lg:w-96 xl:w-80">
          {productsForComparison?.length >= 2 ? (
            <button
              onClick={onOpen}
              className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-gray-800 py-2 px-3 font-medium w-full xl:w-auto"
            >
              <span>
                <GrCompare className="text-xl text-gray-800" />
              </span>
              <span>Compare Selected</span>
            </button>
          ) : (
            <button
              onClick={handleCompareButton}
              className="flex gap-2 justify-center items-center rounded-2xl border-2 border-primary text-gray-800 py-2 px-3 font-medium w-full xl:w-auto"
            >
              <span>
                <GrCompare className="text-xl text-gray-800" />
              </span>
              <span>Compare Products</span>
            </button>
          )}
        </div>
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
        <p className="text-xl font-medium text-gray-800">
          Price Range: ${minPrice} - ${maxPrice}
        </p>
      </div>

      {/* Clear Filters */}
      {filterApplied && (
        <button
          className="px-4 py-2 text-gray-800 border border-primary rounded-xl w-full"
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
                compareProducts={productsForComparison}
                onCompareCheckbox={handleCompareCheckbox}
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

  {/* Comparison Modal */}
  <ComparisonModal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    setIsCompareActive={setIsCompareActive}
  />
</div>


  
  );
};

export default AllProducts;