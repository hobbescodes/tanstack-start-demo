import { createServerFn } from "@tanstack/start";

import { db } from "db";
import { expensesTable, insertExpensesSchema } from "db/schema";
import { fetchClerkAuth } from "lib/server";

const getAllExpenses = createServerFn({
  method: "POST",
})
  .validator((expense: unknown) => insertExpensesSchema.parse(expense))
  .handler(async ({ data }) => {
    const { userId } = await fetchClerkAuth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // ! NB: simulate expense creation delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const [expense] = await db.insert(expensesTable).values(data).returning();

    return expense;
  });

export default getAllExpenses;
