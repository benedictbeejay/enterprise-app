import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./categoryMutations";
import { toast } from "sonner";

const useDeleteCategory = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      QueryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useDeleteCategory };
