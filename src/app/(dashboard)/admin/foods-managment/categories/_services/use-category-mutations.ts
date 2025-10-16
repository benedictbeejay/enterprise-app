// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteCategory } from "./categoryMutations";
// import { toast } from "sonner";

// const useDeleteCategory = () => {
//   const QueryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (id: number) => {
//       await deleteCategory(id);
//     },
//     onSuccess: () => {
//       toast.success("Category deleted successfully");
//       QueryClient.invalidateQueries({ queryKey: ["categories"] });
//     },
//   });
// };

// export { useDeleteCategory };

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "./categoryMutations";
import { CategorySchema } from "../_types/categorySchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await createCategory(data);
    },
    onSuccess: () => {
      toast.success("Category created successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await updateCategory(data);
    },
    onSuccess: () => {
      toast.success("Category updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      toast.success("Category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useCreateCategory, useDeleteCategory, useUpdateCategory };
