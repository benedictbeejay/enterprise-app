import { useCategoriesStore } from "../_libs/use-category-store";
import { getCategories, getCategory } from "./categoryQueries";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

const useCategory = () => {
  const { selectedCategoryId } = useCategoriesStore();
  return useQuery({
    queryKey: ["categories", { selectedCategoryId }],
    queryFn: () => getCategory(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};

export { useCategories, useCategory };
