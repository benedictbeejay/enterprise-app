// "use server";

// import {
//   FoodFiltersSchema,
//   foodFiltersSchema,
// } from "../_types/foodFilterSchema";
// import { FoodSchema } from "../_types/foodSchema";
// import db from "@/lib/db";
// import { PaginatedResult } from "@/lib/types/paginatedResult";
// import { toStringSafe } from "@/lib/utils";
// import { Prisma } from "$/generated/prisma";

// type FoodWithServingUnits = Prisma.FoodGetPayload<{
//   include: {
//     foodServingUnit: true;
//   };
// }>;

// const getFoods = async (
//   filters: FoodFiltersSchema,
// ): Promise<PaginatedResult<FoodWithServingUnits>> => {
//   const validatedFilters = foodFiltersSchema.parse(filters);

//   const {
//     searchTerm,
//     caloriesRange = ["", ""],
//     proteinRange = ["", ""],
//     categoryId,
//     sortBy = "name",
//     sortOrder = "asc",
//     page = 1,
//     pageSize = 10,
//   } = validatedFilters || {};

//   const where: Prisma.FoodWhereInput = {};

//   if (searchTerm) {
//     where.name = { contains: searchTerm };
//   }

//   const [minCaloriesStr, maxCaloriesStr] = caloriesRange;
//   const numericMinCalories =
//     minCaloriesStr === "" ? undefined : Number(minCaloriesStr);
//   const numericMaxCalories =
//     maxCaloriesStr === "" ? undefined : Number(maxCaloriesStr);

//   if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
//     where.calories = {};
//     if (numericMinCalories !== undefined)
//       where.calories.gte = numericMinCalories;
//     if (numericMaxCalories !== undefined)
//       where.calories.lte = numericMaxCalories;
//   }

//   const [minProteinStr, maxProteinStr] = proteinRange;
//   const numericMinProtein =
//     minProteinStr === "" ? undefined : Number(minProteinStr);
//   const numericMaxProtein =
//     maxProteinStr === "" ? undefined : Number(maxProteinStr);

//   if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
//     where.protein = {};
//     if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
//     if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
//   }

//   const numericCategoryId = categoryId ? Number(categoryId) : undefined;
//   if (numericCategoryId !== undefined && numericCategoryId !== 0) {
//     where.category = {
//       id: numericCategoryId,
//     };
//   }

//   const skip = (page - 1) * pageSize;

//   const [total, data] = await Promise.all([
//     db.food.count({ where }),
//     db.food.findMany({
//       where,
//       orderBy: { [sortBy]: sortOrder },
//       skip,
//       take: pageSize,
//       include: { foodServingUnits: true },
//     }),
//   ]);

//   return {
//     data,
//     total,
//     page,
//     pageSize,
//     totalPages: Math.ceil(total / pageSize),
//   };
// };

// const getFood = async (id: number): Promise<FoodSchema | null> => {
//   const res = await db.food.findFirst({
//     where: { id },
//     include: {
//       foodServingUnit: true,
//     },
//   });

//   if (!res) return null;

//   return {
//     action: "update" as const,
//     id,
//     name: toStringSafe(res.name),
//     calories: toStringSafe(res.calories),
//     carbohydrates: toStringSafe(res.carbohydrates),
//     fat: toStringSafe(res.fat),
//     fiber: toStringSafe(res.fiber),
//     protein: toStringSafe(res.protein),
//     sugar: toStringSafe(res.sugar),
//     categoryId: toStringSafe(res.categoryId),
//     foodServingUnits:
//       res.foodServingUnits.map((item) => ({
//         foodServingUnitId: toStringSafe(item.servingUnitId),
//         grams: toStringSafe(item.grams),
//       })) ?? [],
//   };
// };

// export { getFood, getFoods };
"use server";

import {
  FoodFiltersSchema,
  foodFiltersSchema,
} from "../_types/foodFilterSchema";
import { FoodSchema } from "../_types/foodSchema";
import db from "@/lib/db";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import { toStringSafe } from "@/lib/utils";
import { Prisma } from "$/generated/prisma";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: {
    FoodServingUnit: true; // ✅ Correct name from your Prisma model
  };
}>;

const getFoods = async (
  filters: FoodFiltersSchema,
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const validatedFilters = foodFiltersSchema.parse(filters);

  const {
    searchTerm,
    caloriesRange = ["", ""],
    proteinRange = ["", ""],
    categoryId,
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    pageSize = 10,
  } = validatedFilters || {};

  const where: Prisma.FoodWhereInput = {};

  if (searchTerm) {
    where.name = { contains: searchTerm };
  }

  const [minCaloriesStr, maxCaloriesStr] = caloriesRange;
  const numericMinCalories =
    minCaloriesStr === "" ? undefined : Number(minCaloriesStr);
  const numericMaxCalories =
    maxCaloriesStr === "" ? undefined : Number(maxCaloriesStr);

  if (numericMinCalories !== undefined || numericMaxCalories !== undefined) {
    where.calories = {};
    if (numericMinCalories !== undefined)
      where.calories.gte = numericMinCalories;
    if (numericMaxCalories !== undefined)
      where.calories.lte = numericMaxCalories;
  }

  const [minProteinStr, maxProteinStr] = proteinRange;
  const numericMinProtein =
    minProteinStr === "" ? undefined : Number(minProteinStr);
  const numericMaxProtein =
    maxProteinStr === "" ? undefined : Number(maxProteinStr);

  if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
    where.protein = {};
    if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
    if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
  }

  const numericCategoryId = categoryId ? Number(categoryId) : undefined;
  if (numericCategoryId !== undefined && numericCategoryId !== 0) {
    where.category = {
      id: numericCategoryId,
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    db.food.count({ where }),
    db.food.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
      include: { FoodServingUnit: true }, // ✅ Fixed relation include
    }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

// const getFood = async (id: number): Promise<FoodSchema | null> => {
//   const res = await db.food.findFirst({
//     where: { id },
//     include: {
//       FoodServingUnit: true, // ✅ Fixed relation include
//     },
//   });

//   if (!res) return null;

//   return {
//     action: "update" as const,
//     id,
//     name: toStringSafe(res.name),
//     calories: toStringSafe(res.calories),
//     carbohydrates: toStringSafe(res.carbohydrates),
//     fat: toStringSafe(res.fat),
//     fiber: toStringSafe(res.fibre), // ✅ Note: model field is “fibre”, not “fiber”
//     protein: toStringSafe(res.protein),
//     sugar: toStringSafe(res.sugar),
//     categoryId: toStringSafe(res.categoryId),
//     foodServingUnits:
//       res.FoodServingUnit.map((item) => ({
//         foodServingUnitId: toStringSafe(item.servingUnitId),
//         grams: toStringSafe(item.grams),
//       })) ?? [],
//   };
// };

const getFood = async (id: number): Promise<FoodSchema | null> => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      FoodServingUnit: true,
    },
  });

  if (!res) return null;

  return {
    action: "update" as const,
    id,
    name: toStringSafe(res.name),
    calories: toStringSafe(res.calories),
    carbohydrates: toStringSafe(res.carbohydrates),
    fat: toStringSafe(res.fat),
    fiber: toStringSafe(res.fibre),
    protein: toStringSafe(res.protein),
    sugar: toStringSafe(res.sugar),
    categoryId: toStringSafe(res.categoryId),
    foodServingUnits:
      res.FoodServingUnit.map(
        (item: FoodWithServingUnits["FoodServingUnit"][number]) => ({
          foodServingUnitId: toStringSafe(item.servingUnitId),
          grams: toStringSafe(item.grams),
        }),
      ) ?? [],
  };
};

export { getFood, getFoods };
