import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { serverOnly } from "@tanstack/start";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/core";

// TODO: figure out appropriate use of serverOnly vs createServerFn (createServerFn always returns a ReadableStream? How to type that appropriately?)
const getTotalExpenses = serverOnly(async () => {
  const response = await fetch("http://localhost:3000/api/expenses/total");

  return (await response.json()) as { total: number };
});

const Home = () => {
  const data = useLoaderData({ from: "/" });

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>The total amount of expenses.</CardDescription>
        </CardHeader>
        <CardContent>{data?.total ?? 0}</CardContent>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/")({
  loader: async () => await getTotalExpenses(),
  component: Home,
});
