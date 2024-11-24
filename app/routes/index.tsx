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

const getTotalExpenses = createServerFn({
  method: "GET",
}).handler(async (): Promise<{ total: number }> => {
  // TODO: set up fetch for production
  const response = await fetch("http://localhost:3000/api/expenses/total");

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
