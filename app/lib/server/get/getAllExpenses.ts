import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { db } from "db";
import { expensesTable } from "db/schema";
import { fetchClerkAuth } from "lib/server";

import type { OutputExpense } from "db/schema";

const getAllExpenses = createServerFn({
  method: "GET",
}).handler(async (): Promise<OutputExpense[]> => {
  const { userId } = await fetchClerkAuth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId));
});

export default getAllExpenses;
