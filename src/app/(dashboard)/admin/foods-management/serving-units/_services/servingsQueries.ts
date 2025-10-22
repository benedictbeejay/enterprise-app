"use server";

import db from "@/lib/db";

const getServingUnits = async () => {
  return await db.category.findMany();
};

export { getServingUnits };
