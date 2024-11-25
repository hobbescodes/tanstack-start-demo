import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "cva";

import { cn } from "lib/utils";

import type { VariantProps } from "cva";
import type { ComponentProps } from "react";

const labelVariants = cva({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

interface LabelProps
  extends ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = ({ className, ...rest }: LabelProps) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...rest} />
);

export default Label;
