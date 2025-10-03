import { forwardRef } from "react";
import { button, type ButtonVariants } from "./button.css.ts";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "brand",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [button({ color, size, fullWidth }), className].join(
      " "
    );
    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);
