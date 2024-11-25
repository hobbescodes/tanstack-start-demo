import { cn } from "lib/utils";

import type { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  isLoading?: boolean;
  skeletonClassName?: string;
}

const Skeleton = ({
  isLoading = true,
  skeletonClassName,
  className,
  ...rest
}: Props) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          "animate-pulse rounded-md bg-muted text-transparent",
          skeletonClassName
        )}
        {...rest}
      />
    );
  }

  return <div className={className} {...rest} />;
};

export default Skeleton;
