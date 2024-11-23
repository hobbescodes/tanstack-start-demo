import { createFileRoute } from "@tanstack/react-router";

import { Layout } from "components/layout";

const RouteComponent = () => {
  return <Layout>Hello About</Layout>;
};

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});
