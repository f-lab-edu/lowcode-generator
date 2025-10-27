import { type Ref, type CSSProperties } from "react";
import { input, type InputVariants } from "./input.css";

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
  const classNames = [input({ inputSize }), className]
    .filter(Boolean)
    .join(" ");

  const inputStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };
  return (
    <input
      id={id}
      ref={ref}
      type={type}
      className={classNames}
      style={inputStyle}
      {...props}
    />
  );
}
