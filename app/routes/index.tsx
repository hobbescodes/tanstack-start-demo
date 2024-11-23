import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { serverOnly } from "@tanstack/start";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/core";
import { Layout } from "components/layout";

// TODO: figure out appropriate use of serverOnly vs createServerFn (createServerFn always returns a ReadableStream? How to type that appropriately?)
const getTotalExpenses = serverOnly<Promise<{ total: number }>>(async () => {
  // TODO: set up fetch for production
  const response = await fetch("http://localhost:3000/api/expenses/total");

  return response.json();
});

const totalExpensesQueryOptions = queryOptions({
  queryKey: ["total-expenses"],
  queryFn: getTotalExpenses,
});

const Home = () => {
  const { data } = useSuspenseQuery(totalExpensesQueryOptions);

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>The total amount of expenses.</CardDescription>
        </CardHeader>
        <CardContent>{data?.total ?? 0}</CardContent>
      </Card>
    </Layout>
  );
};

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(totalExpensesQueryOptions),
  component: Home,
});
