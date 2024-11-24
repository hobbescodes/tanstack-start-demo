import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { fakeExpenses } from "lib/mock/expenses";

export const Route = createAPIFileRoute("/api/expenses/total")({
  GET: async () => {
    const total = fakeExpenses.reduce((acc, cur) => acc + cur.amount, 0);

    return json({ total });
  },
});
