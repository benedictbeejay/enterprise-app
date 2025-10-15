"use server";
import { executeAction } from "@/lib/executeAction";
import db from "@/lib/db";

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => db.category.delete({ where: { id } }),
  });
};

export { deleteCategory };
