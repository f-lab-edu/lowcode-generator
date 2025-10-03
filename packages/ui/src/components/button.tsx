import { forwardRef } from "react";
import * as styles from "./button.css.ts";

export type ButtonProps = {
  variant?: keyof typeof styles.buttonColorVariants;
  size?: keyof typeof styles.buttonSizeVariants;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "brand",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.baseButton,
      styles.buttonColorVariants[variant],
      styles.buttonSizeVariants[size],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);
