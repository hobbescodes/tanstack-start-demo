import { createServerFn } from "@tanstack/start";
import { eq } from "drizzle-orm";

import { db } from "db";
import { expensesTable, selectExpensesSchema } from "db/schema";
import { fetchClerkAuth } from "lib/server";

const deleteExpense = createServerFn({
  method: "POST",
})
  .validator((id: unknown) => selectExpensesSchema.shape.id.parse(id))
  .handler(async ({ data: id }) => {
    const { userId } = await fetchClerkAuth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const [deletedExpense] = await db
      .delete(expensesTable)
      .where(eq(expensesTable.id, id))
      .returning();

    if (!deletedExpense) {
      throw new Error("Error deleting expense");
    }

    return deletedExpense;
  });

export default deleteExpense;
