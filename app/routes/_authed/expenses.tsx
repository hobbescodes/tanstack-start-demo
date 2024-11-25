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
import { useMemo } from "react";

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
import { toast } from "sonner";

export const allExpensesQueryOptions = queryOptions({
  queryKey: ["expenses"],
  queryFn: () => getAllExpenses(),
});

const columnHelper = createColumnHelper<OutputExpense>();

const Expenses = () => {
  const { data } = useSuspenseQuery(allExpensesQueryOptions);

  const {
    variables: deletedId,
    mutateAsync,
    isPending,
  } = useMutation({
    mutationFn: async (expenseIdToDelete: number) =>
      await deleteExpense({ data: expenseIdToDelete }),
  });

  const isCreatingExpense = useIsMutating({
    mutationKey: ["expense", "create"],
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

          const deleteExpense = () =>
            toast.promise(mutateAsync(expenseId), {
              loading: "Deleting expense...",
              success: "Expense deleted successfully!",
              error: "Error deleting expense",
              duration: 5000,
            });

          return (
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-500"
              disabled={expenseId === deletedId && isPending}
              onClick={deleteExpense}
            >
              <TrashIcon />
            </Button>
          );
        },
      }),
    ],
    [deletedId, isPending, mutateAsync]
  );

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
              row.original.id === deletedId && isPending && "opacity-30"
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
