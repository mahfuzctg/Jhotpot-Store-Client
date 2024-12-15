import { useMemo } from "react";
import { useGetAllCategoriesQuery } from "@/src/lib/redux/features/category/categoryApi";
import { ICategory } from "@/src/types/schema";


export function useCategories() {
  const {
    data: allCategories,
    isLoading,
    isError,
    error,
  } = useGetAllCategoriesQuery(undefined);

  const categories = useMemo(() => {
    if (!allCategories) return [];
    return allCategories.map((category: ICategory) => ({
      key: category.id,
      label: category.name,
    }));
  }, [allCategories]);

  return { categories, isLoading, isError, error };
}