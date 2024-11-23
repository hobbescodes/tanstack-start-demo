import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { serverOnly } from "@tanstack/start";

import { Layout } from "components/layout";

import type { OutputExpense } from "lib/mock/expenses";

const getAllExpenses = serverOnly<Promise<OutputExpense[]>>(async () => {
  // TODO: set up fetch for production
  const response = await fetch("http://localhost:3000/api/expenses");

  return response.json();
});

const allExpensesQueryOptions = queryOptions({
  queryKey: ["all-expenses"],
  queryFn: getAllExpenses,
});

const Expenses = () => {
  const { data } = useSuspenseQuery(allExpensesQueryOptions);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <div className="flex flex-col gap-4">
          {data?.map(({ id, title, amount }) => (
            <div key={id} className="flex gap-4 items-center">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-muted-foreground">{amount} USD</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const Route = createFileRoute("/expenses")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(allExpensesQueryOptions),
  component: Expenses,
});
