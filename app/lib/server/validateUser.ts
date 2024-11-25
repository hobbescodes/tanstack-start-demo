import { createMiddleware } from "@tanstack/start";

import { fetchClerkAuth } from "lib/server";

const validateUser = createMiddleware().server(async ({ next }) => {
  const { userId } = await fetchClerkAuth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return next({
    context: {
      userId,
    },
  });
});

export default validateUser;
