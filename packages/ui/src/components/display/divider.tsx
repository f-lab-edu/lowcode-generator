import { forwardRef, type HTMLAttributes } from "react";
import { divider, type DividerVariants } from "./divider.css";

export type DividerProps = HTMLAttributes<HTMLDivElement> &
  DividerVariants & {
    className?: string;
  };

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      color = "default",
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      divider({ orientation, variant, color }),
      className,
    ]
      .filter(Boolean)
      .join(" ");

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
);

Divider.displayName = "Divider";

export { Divider };