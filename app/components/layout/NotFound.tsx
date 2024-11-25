import { Link } from "@tanstack/react-router";

import { Button } from "components/core";

import type { ReactNode } from "react";

const NotFound = ({ children }: Readonly<{ children?: ReactNode }>) => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-4">
      <h1 className="text-8xl font-bold">404</h1>
      <div className="text-gray-600 dark:text-gray-400">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Link to="/">
          <Button variant="secondary">Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
