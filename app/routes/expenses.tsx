import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/core";

import type { selectExpensesSchema } from "../db/schema";
import type { z } from "zod";

type OutputExpense = z.infer<typeof selectExpensesSchema>;

const getAllExpenses = createServerFn({ method: "GET" }).handler(
  async (): Promise<OutputExpense[]> => {
    // TODO: set up fetch for production
    const response = await fetch("http://localhost:3000/api/expenses");

    return response.json();
  }
);

const allExpensesQueryOptions = queryOptions({
  queryKey: ["all-expenses"],
  queryFn: () => getAllExpenses(),
});

const Expenses = () => {
  const { data } = useSuspenseQuery(allExpensesQueryOptions);

  return (
    <Table className="max-w-xl mx-auto">
      <TableCaption>A list of all your expenses</TableCaption>
      <TableHeader>
        <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, title, amount }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const Route = createFileRoute("/expenses")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(allExpensesQueryOptions),
  component: Expenses,
});
