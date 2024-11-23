import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return "Hello Create Expense";
};
export const Route = createFileRoute("/create-expense")({
  component: RouteComponent,
});
