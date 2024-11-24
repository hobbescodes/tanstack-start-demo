import { Link } from "@tanstack/react-router";

import type { LinkProps } from "@tanstack/react-router";

interface Navigation extends LinkProps {
  label: string;
}

const NAV_LINKS: Navigation[] = [
  { to: "/about", label: "About" },
  { to: "/expenses", label: "Expenses" },
  { to: "/create-expense", label: "Create" },
];

const Header = () => {
  return (
    <header className="sticky top-0 w-full flex justify-between items-center py-4 px-6 border-b border-border z-50 bg-background">
      <Link to="/" className="font-bold">
        Expense Tracker
      </Link>
      <div className="flex gap-4">
        {NAV_LINKS.map(({ to, label, activeProps, ...rest }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "font-bold" }}
            {...rest}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
