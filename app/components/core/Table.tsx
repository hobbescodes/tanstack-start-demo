import { cn } from "lib/utils";

import type { HTMLAttributes } from "react";

const Table = ({ className, ...rest }: HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...rest}
    />
  </div>
);

const TableHeader = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...rest} />
);

const TableBody = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...rest} />
);

const TableFooter = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...rest}
  />
);

const TableRow = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...rest}
  />
);

const TableHead = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...rest}
  />
);

const TableCell = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...rest}
  />
);

const TableCaption = ({
  className,
  ...rest
}: HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...rest}
  />
);

export {
  Table,
  TableHeader,
  TableBody,
  /** @knipignore */
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
