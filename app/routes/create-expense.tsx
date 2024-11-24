import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { Button, Input, Label } from "components/core";
import { createExpenseSchema } from "lib/mock/expenses";
import { cn } from "lib/utils";

import type { InputExpense } from "lib/mock/expenses";

const addExpense = createServerFn()
  .validator((expense: unknown) => createExpenseSchema.parse(expense))
  .handler(async ({ data }) => {
    await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  });

const RouteComponent = () => {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (newExpense: InputExpense) => addExpense({ data: newExpense }),
    onSuccess: () => navigate({ to: "/expenses" }),
  });

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: createExpenseSchema,
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
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
        >
          {({ name, state, handleBlur, handleChange }) => (
            <div className="flex flex-col gap-2">
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
                  "text-red-400 h-5 text-sm",
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
          validators={{ onChange: createExpenseSchema.shape.amount }}
        >
          {({ name, state, handleBlur, handleChange }) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={name}>Amount</Label>
              <Input
                id={name}
                type="number"
                value={state.value}
                onChange={(e) => handleChange(e.target.valueAsNumber)}
                onBlur={handleBlur}
              />
              <em
                className={cn(
                  "text-red-400 h-5 text-sm",
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
