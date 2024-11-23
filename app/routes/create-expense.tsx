import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "components/layout";

const RouteComponent = () => {
  return <Layout>Hello Create Expense</Layout>;
};
export const Route = createFileRoute("/create-expense")({
  component: RouteComponent,
});
