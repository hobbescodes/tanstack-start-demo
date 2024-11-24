import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/core";
import { API_BASE_URL } from "lib/config/env";

const getTotalExpenses = createServerFn({
  method: "GET",
}).handler(async (): Promise<{ total: number }> => {
  const response = await fetch(`${API_BASE_URL}/api/expenses/total`);

  return response.json();
});

const totalExpensesQueryOptions = queryOptions({
  queryKey: ["expenses", "total"],
  queryFn: () => getTotalExpenses(),
});

const Home = () => {
  const { data } = useSuspenseQuery(totalExpensesQueryOptions);

  return (
    <div className="w-full flex flex-col items-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>The total amount of expenses.</CardDescription>
        </CardHeader>
        <CardContent>{data.total}</CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(totalExpensesQueryOptions),
  component: Home,
});
