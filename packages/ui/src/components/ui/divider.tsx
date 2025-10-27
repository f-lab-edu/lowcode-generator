import { type Ref, type HTMLAttributes } from "react";
import { divider, type DividerVariants } from "./divider.css";
import { cn } from "../../utils/cn";

export type DividerProps = HTMLAttributes<HTMLDivElement> &
  DividerVariants & {
    className?: string;
    ref?: Ref<HTMLDivElement>;
  };

export function Divider({
  orientation = "horizontal",
  variant = "solid",
  color = "default",
  ref,
  className,
  ...props
}: DividerProps) {
  const classNames = cn(divider({ orientation, variant, color }), className);

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={classNames}
      {...props}
    />
  );
}
