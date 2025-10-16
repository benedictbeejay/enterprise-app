"use client";
import { Edit, Trash } from "lucide-react";
import { useDeleteCategory } from "../_services/use-category-mutations";
import { useCategories } from "../_services/use-category-queries";
import { Button } from "@/components/ui/button";
import { alert } from "@/lib/use-global-store";
import { useCategoriesStore } from "../_libs/use-category-store";

const CategoryCards = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoriesStore();
  const categoriesQuery = useCategories();
  const deleteCategoriesMutation = useDeleteCategory();

  return (
    <div className="grid grid-cols-4 gap-2">
      {categoriesQuery.data?.map((item) => (
        <div
          className="bg-accent flex flex-col justify-between gap-3 rounded-lg p-6 shadow-md"
          key={item.id}
        >
          <p className="truncate">{item.name}</p>
          <div className="flex gap-1">
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                updateSelectedCategoryId(item.id);
                updateCategoryDialogOpen(true);
              }}
            >
              <Edit />
            </Button>
            <Button
              className="size-6"
              variant="ghost"
              size="icon"
              onClick={() => {
                alert({
                  onConfirm: () => deleteCategoriesMutation.mutate(item.id),
                });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CategoryCards };
