
"use client";


import DashboardCategoryCard from "@/src/components/Cards/DashboardCategoryCard";
import DashboardCategoryLoading from "@/src/components/LoadingCards/DashboardCategoryLoading";
import CreateCategoryModal from "@/src/components/modal/Reusable/CreateCategoryModal";
import MainModal from "@/src/components/modal/Reusable/MainModal";
import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { ICategory } from "@/src/types/schema";

import { useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { useState } from "react";

const CategoryManagement = () => {
  const { data: allCategories, isLoading } =
    useGetAllCategoriesQuery(undefined);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const paginatedCategories = allCategories?.slice(startIndex, endIndex) || [];
  const totalCategories = allCategories?.length || 0;
  const totalPages = Math.ceil(totalCategories / dataPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <DashboardSectionTitle heading="Product Category Management" />

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-5">
        <div>
          <h1 className="text-gray-800 text-2xl font-bold">
            Total Categories: {allCategories?.length || 0}
          </h1>
        </div>
        <div>
          <button
            onClick={onOpen}
            className="relative h-9 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-800 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
          >
            Add New Category
          </button>
        </div>
      </div>

      <div className="pb-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index}>
                <DashboardCategoryLoading />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5 mr-5 lg:mr-0">
            {paginatedCategories?.map((singleCategory: ICategory) => (
              <DashboardCategoryCard
                key={singleCategory?.id}
                singleCategory={singleCategory}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pb-8">
        {totalCategories > 0 && (
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

      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <CreateCategoryModal />
      </MainModal>
    </div>
  );
};

export default CategoryManagement;
