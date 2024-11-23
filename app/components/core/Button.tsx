import { Slot } from "@radix-ui/react-slot";
import { cva } from "cva";

import { cn } from "lib/utils";

import type { VariantProps } from "cva";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/70",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/70",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      unstyled: null,
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isDisabled = false,
  type = "button",
  ...rest
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        className,
        isDisabled
          ? "opacity-40 cursor-not-allowed bg-transparent hover:bg-transparent"
          : "cursor-pointer"
      )}
      type={type}
      {...rest}
    />
  );
};

export default Button;
