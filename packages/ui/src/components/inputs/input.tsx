import { type Ref, type CSSProperties, useId } from "react";
import { input, type InputVariants } from "./input.css";
import { cn } from "../../utils/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  width?: CSSProperties["width"];
  ref?: Ref<HTMLInputElement>;
} & InputVariants;

export function Input({
  id,
  className,
  type = "text",
  inputSize = "md",
  width = "100%",
  style,
  ref,
  ...props
}: InputProps) {
  const inputId = id || useId();
  const classNames = cn(input({ inputSize }), className);

  const inputStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };
  return (
    <input
      id={inputId}
      ref={ref}
      type={type}
      className={classNames}
      style={inputStyle}
      {...props}
    />
  );
}
