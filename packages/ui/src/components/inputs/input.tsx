import { forwardRef, type CSSProperties } from "react";
import { input, type InputVariants } from "./input.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  width?: CSSProperties["width"];
} & InputVariants;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      className,
      type = "text",
      inputSize = "md",
      width = "100%",
      style,
      ...props
    },
    ref
  ) => {
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
);

Input.displayName = "Input";

export { Input };
