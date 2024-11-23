import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { fakeExpenses } from "lib/mock/expenses";

export const Route = createAPIFileRoute("/api/expenses/total")({
  GET: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const total = fakeExpenses.reduce((acc, cur) => acc + cur.amount, 0);

    return json({ total });
  },
});