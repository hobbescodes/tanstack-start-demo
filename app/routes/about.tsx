import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return "Coming Soon!";
};

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});
