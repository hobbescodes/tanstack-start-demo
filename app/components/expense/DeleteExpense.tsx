import { TrashIcon } from "lucide-react";

import { Button } from "components/core";
import { cn } from "lib/utils";

import type { ButtonProps } from "components/core";

interface Props extends ButtonProps {
  expenseId: number;
}

const DeleteExpense = ({ expenseId, className, ...rest }: Props) => {
  return (
    <Button
      variant="ghost"
      className={cn("text-red-500 hover:text-red-500", className)}
      {...rest}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteExpense;
