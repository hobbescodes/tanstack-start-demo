import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { eq } from "drizzle-orm";

import { dbPool } from "db";
import { expensesTable } from "db/schema";

export const Route = createAPIFileRoute("/api/expense/$id")({
  GET: async ({ params }) => {
    const id = Number.parseInt(params.id);

    const [expense] = await dbPool
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, id));

    if (!expense) {
      return new Response("Expense not found", { status: 404 });
    }

    return json(expense);
  },
  DELETE: async ({ params }) => {
    const id = Number.parseInt(params.id);

    const [deletedExpense] = await dbPool
      .delete(expensesTable)
      .where(eq(expensesTable.id, id))
      .returning();

    if (!deletedExpense) {
      return new Response("Expense not found", { status: 404 });
    }

    return json(deletedExpense);
  },
});
