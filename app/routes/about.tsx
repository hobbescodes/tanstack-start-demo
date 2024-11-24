import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return "Hello About";
};

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});
