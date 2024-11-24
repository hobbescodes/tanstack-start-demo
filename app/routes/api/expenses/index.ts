import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { dbPool } from "db";
import { expensesTable, insertExpensesSchema } from "db/schema";

export const Route = createAPIFileRoute("/api/expenses")({
  GET: async () => {
    const expenses = await dbPool.select().from(expensesTable);

    return json(expenses);
  },
  POST: async ({ request }) => {
    const data = await request.json();

    const expense = insertExpensesSchema.parse(data);

    if (!expense) {
      return new Response("Invalid expense data", { status: 400 });
    }

    await dbPool.insert(expensesTable).values(expense);

    return json(expense);
  },
});
