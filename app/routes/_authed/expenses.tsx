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
import { createServerFn } from "@tanstack/start";
import { formatInTimeZone } from "date-fns-tz";
import { asc, eq } from "drizzle-orm";
import { TrashIcon } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

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
import { db } from "db";
import { expensesTable, selectExpensesSchema } from "db/schema";
import { validateUser } from "lib/server";
import { cn } from "lib/utils";

import type { OutputExpense } from "db/schema";

const getAllExpenses = createServerFn({
  method: "GET",
  // NB: explicit return type to indicate that userId is not required
})
  .middleware([validateUser])
  .handler(async ({ context: { userId } }): Promise<OutputExpense[]> => {
    return await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, userId))
      .orderBy(asc(expensesTable.id));
  });

const deleteExpense = createServerFn({
  method: "POST",
})
  .middleware([validateUser])
  .validator((id: unknown) => selectExpensesSchema.shape.id.parse(id))
  .handler(async ({ data: id, context: { userId } }) => {
    // ! NB: simulate expense deletion delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const [deletedExpense] = await db
      .delete(expensesTable)
      .where(eq(expensesTable.id, id))
      .returning();

    if (!deletedExpense) {
      throw new Error("Error deleting expense");
    }

    return deletedExpense;
  });

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
              // TODO: determine best way to disable for the optimistically added expense upon creation
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
