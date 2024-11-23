import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { fakeExpenses } from "lib/mock/expenses";

export const Route = createAPIFileRoute("/api/expense/$id")({
  GET: ({ params }) => {
    const id = Number.parseInt(params.id);

    const expense = fakeExpenses.find((e) => e.id === id);

    if (!expense) {
      return new Response("Expense not found", { status: 404 });
    }

    return json(expense);
  },
  DELETE: ({ params }) => {
    const id = Number.parseInt(params.id);

    const deletedExpense = fakeExpenses.find((e) => e.id === id);

    if (!deletedExpense) {
      return new Response("Expense not found", { status: 404 });
    }

    fakeExpenses.splice(fakeExpenses.indexOf(deletedExpense), 1);

    return json(deletedExpense);
  },
});
