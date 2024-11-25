import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { db } from "db";
import { expensesTable, selectExpensesSchema } from "db/schema";
import { fetchClerkAuth } from "lib/server";

const getExpense = createServerFn({
  method: "GET",
})
  .validator((id: unknown) => selectExpensesSchema.shape.id.parse(id))
  .handler(async ({ data: id }) => {
    const { userId } = await fetchClerkAuth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const [expense] = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, id));

    if (!expense) {
      throw new Error("Expense not found");
    }

    return expense;
  });

export default getExpense;
