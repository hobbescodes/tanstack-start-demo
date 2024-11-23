import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { createExpenseSchema, fakeExpenses } from "lib/mock/expenses";

export const Route = createAPIFileRoute("/api/expenses")({
  GET: () => {
    return json({ data: fakeExpenses });
  },
  POST: async ({ request }) => {
    const data = await request.json();

    const expense = createExpenseSchema.parse(data);

    if (!expense) {
      return new Response("Invalid expense data", { status: 400 });
    }

    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });

    return json(expense);
  },
});
