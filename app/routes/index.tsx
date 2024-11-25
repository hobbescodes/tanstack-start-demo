import { SignedIn, SignedOut, useAuth } from "@clerk/tanstack-start";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "components/core";
import { getTotalExpenses } from "lib/server";

const Home = () => {
  const { userId } = useAuth();

  const { data } = useQuery({
    queryKey: ["expenses", "total"],
    queryFn: () => getTotalExpenses(),
    enabled: !!userId,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <SignedIn>
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>The total amount of expenses.</CardDescription>
          </CardHeader>
          <CardContent>{data?.total ?? 0}</CardContent>
        </Card>
      </SignedIn>

      {/* TODO: customize */}
      <SignedOut>Welcome to the Expense Tracker App!</SignedOut>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
