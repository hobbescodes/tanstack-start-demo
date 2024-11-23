import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return "Hello Expenses";
};

export const Route = createFileRoute("/expenses")({
  component: RouteComponent,
});
