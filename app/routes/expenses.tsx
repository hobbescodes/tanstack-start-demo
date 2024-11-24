import {
  queryOptions,
  useIsMutating,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createServerFn } from "@tanstack/start";
import { formatInTimeZone } from "date-fns-tz";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/core";
import { cn } from "lib/utils";

import type { InputExpense, OutputExpense } from "db/schema";

const getAllExpenses = createServerFn({ method: "GET" }).handler(
  async (): Promise<OutputExpense[]> => {
    // TODO: set up fetch for production
    const response = await fetch("http://localhost:3000/api/expenses");

    return response.json();
  }
);

export const allExpensesQueryOptions = queryOptions({
  queryKey: ["all-expenses"],
  queryFn: () => getAllExpenses(),
});

export const loadingExpenseQueryOptions = queryOptions<{
  expense?: InputExpense;
}>({
  queryKey: ["loading-expense"],
  queryFn: async () => ({}),
  staleTime: Number.POSITIVE_INFINITY,
});

const columnHelper = createColumnHelper<OutputExpense>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount (USD)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => {
      const value = info.getValue();

      return value
        ? formatInTimeZone(value, "America/Chicago", "MM/dd/yyyy")
        : "-";
    },
  }),
];

const Expenses = () => {
  const { data } = useSuspenseQuery(allExpensesQueryOptions);

  const isCreatingExpense = useIsMutating({ mutationKey: ["add-expense"] });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="max-w-xl mx-auto">
      <TableCaption>A list of all your expenses</TableCaption>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow
            key={headerGroup.id}
            className="bg-primary text-primary-foreground hover:bg-primary"
          >
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className={cn(
              "even:bg-muted",
              isCreatingExpense && "last:opacity-30"
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
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
