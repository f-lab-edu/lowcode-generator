import { type Ref } from "react";
import { button, type ButtonVariants } from "./button.css.ts";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
} & ButtonVariants;

export function Button({
  color = "brand",
  size = "md",
  fullWidth = false,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const classNames = [button({ color, size, fullWidth }), className].join(" ");
  return (
    <button ref={ref} className={classNames} {...props}>
      {children}
    </button>
  );
}
