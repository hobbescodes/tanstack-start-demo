import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { db } from "db";
import { expensesTable, insertExpensesSchema } from "db/schema";

export const Route = createAPIFileRoute("/api/expenses")({
  GET: async () => {
    const expenses = await db.select().from(expensesTable);

    return json(expenses);
  },
  POST: async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await request.json();

    const expense = insertExpensesSchema.parse(data);

    if (!expense) {
      return new Response("Invalid expense data", { status: 400 });
    }

    await db.insert(expensesTable).values(expense);

    return json(expense);
  },
});
