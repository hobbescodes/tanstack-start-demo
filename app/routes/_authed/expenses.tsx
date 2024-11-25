import {
  queryOptions,
  useIsMutating,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatInTimeZone } from "date-fns-tz";
import { TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/core";
import { deleteExpense, getAllExpenses } from "lib/server";
import { cn } from "lib/utils";

import type { OutputExpense } from "db/schema";

export const allExpensesQueryOptions = queryOptions({
  queryKey: ["expenses"],
  queryFn: () => getAllExpenses(),
});

const columnHelper = createColumnHelper<OutputExpense>();

const Expenses = () => {
  const [deletedId, setDeletedId] = useState<number | null>(null);
  const { data } = useSuspenseQuery(allExpensesQueryOptions);

  const { mutate } = useMutation({
    mutationFn: async (expenseIdToDelete: number) =>
      await deleteExpense({ data: expenseIdToDelete }),
    onMutate: (expenseId) => setDeletedId(expenseId),
    onSettled: () => setDeletedId(null),
  });

  const columns = useMemo(
    () => [
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
      columnHelper.accessor("id", {
        header: "Remove",
        cell: (info) => {
          const expenseId = info.getValue();

          return (
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-500"
              disabled={expenseId === deletedId}
              onClick={() => mutate(expenseId)}
            >
              <TrashIcon />
            </Button>
          );
        },
      }),
    ],
    [deletedId, mutate]
  );

  const isCreatingExpense = useIsMutating({
    mutationKey: ["expense", "create"],
  });

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
              isCreatingExpense && "last:opacity-30",
              row.original.id === deletedId && "opacity-30"
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

export const Route = createFileRoute("/_authed/expenses")({
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(allExpensesQueryOptions),
  component: Expenses,
});
