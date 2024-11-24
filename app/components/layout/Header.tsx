import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/tanstack-start";
import { Link } from "@tanstack/react-router";

import { Button } from "components/core";

import type { LinkProps } from "@tanstack/react-router";

interface Navigation extends LinkProps {
  label: string;
}

const SIGNED_IN_NAV_LINKS: Navigation[] = [
  { to: "/expenses", label: "Expenses" },
  { to: "/create-expense", label: "Create" },
];

const SIGNED_OUT_NAV_LINKS: Navigation[] = [{ to: "/about", label: "About" }];

const Header = () => {
  return (
    <header className="sticky top-0 w-full flex justify-between items-center py-4 px-6 border-b border-border z-50 bg-background">
      <Link to="/" className="font-bold">
        Expense Tracker
      </Link>
      <div className="flex gap-4 items-center min-h-10">
        <SignedIn>
          {SIGNED_IN_NAV_LINKS.map(({ to, label, activeProps, ...rest }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "font-bold" }}
              {...rest}
            >
              {label}
            </Link>
          ))}
          <SignOutButton redirectUrl="/">
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          {SIGNED_OUT_NAV_LINKS.map(({ to, label, activeProps, ...rest }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "font-bold" }}
              {...rest}
            >
              {label}
            </Link>
          ))}
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
