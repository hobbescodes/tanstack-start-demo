import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { Button, Input, Label } from "components/core";
import { insertExpensesSchema } from "db/schema";
import { cn } from "lib/utils";
import { loadingExpenseQueryOptions } from "routes/expenses";

import type { z } from "zod";

type InputExpense = z.infer<typeof insertExpensesSchema>;

const addExpense = createServerFn()
  .validator((expense: unknown) => insertExpensesSchema.parse(expense))
  .handler(async ({ data }) => {
    await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  });

const RouteComponent = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (newExpense: InputExpense) =>
      await addExpense({ data: newExpense }),
    onMutate: async (expense) => {
      navigate({ to: "/expenses" });

      queryClient.setQueryData(loadingExpenseQueryOptions.queryKey, {
        expense,
      });
    },
    onSettled: () =>
      queryClient.setQueryData(loadingExpenseQueryOptions.queryKey, {}),
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      title: "",
      amount: "0",
    },
    asyncDebounceMs: 500,
    validatorAdapter: zodValidator(),
    validators: {
      onChangeAsync: insertExpensesSchema,
    },
    onSubmit: async ({ value }) => await mutateAsync(value),
  });

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-xl mx-auto"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
        reset();
      }}
    >
      <div className="flex flex-col gap-4">
        <Field
          name="title"
          asyncDebounceMs={500}
          validators={{
            onChangeAsync: insertExpensesSchema.shape.title,
          }}
        >
          {({ name, state, handleBlur, handleChange }) => (
            <div className="relative flex flex-col gap-2">
              <Label htmlFor={name}>Title</Label>
              <Input
                id={name}
                type="text"
                placeholder="Insert title..."
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
              <em
                className={cn(
                  "absolute top-0 right-0 text-red-400 h-5 text-sm",
                  state.meta.errors && state.meta.isDirty
                    ? "visible"
                    : "invisible"
                )}
              >
                {state.meta.errors?.join(", ") ?? "hidden"}
              </em>
            </div>
          )}
        </Field>
        <Field
          name="amount"
          asyncDebounceMs={500}
          validators={{ onChangeAsync: insertExpensesSchema.shape.amount }}
        >
          {({ name, state, handleBlur, handleChange }) => (
            <div className="relative flex flex-col gap-2">
              <Label htmlFor={name}>Amount</Label>
              <Input
                id={name}
                type="number"
                min={0}
                step={0.01}
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
              />
              <em
                className={cn(
                  "absolute top-0 right-0 text-red-400 h-5 text-sm",
                  state.meta.errors && state.meta.isDirty
                    ? "visible"
                    : "invisible"
                )}
              >
                {state.meta.errors?.join(", ") ?? "hidden"}
              </em>
            </div>
          )}
        </Field>
      </div>
      <Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isDirty,
        ]}
      >
        {([canSubmit, isSubmitting, isDirty]) => (
          <Button
            type="submit"
            disabled={!canSubmit || !isDirty || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Expense"}
          </Button>
        )}
      </Subscribe>
    </form>
  );
};
export const Route = createFileRoute("/create-expense")({
  component: RouteComponent,
});
