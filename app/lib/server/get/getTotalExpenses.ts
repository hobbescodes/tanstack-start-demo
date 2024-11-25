import { createServerFn } from "@tanstack/start";
import { eq, sum } from "drizzle-orm";

import { db } from "db";
import { expensesTable } from "db/schema";
import { fetchClerkAuth } from "lib/server";

const getTotalExpenses = createServerFn({
  method: "GET",
}).handler(async (): Promise<{ total: number }> => {
  const { userId } = await fetchClerkAuth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const [amount] = await db
    .select({ total: sum(expensesTable.amount) })
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId));

  return { total: amount.total ? +amount.total : 0 };
});

export default getTotalExpenses;
