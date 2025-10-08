import { forwardRef } from "react";
import { input, type InputVariants } from "./input.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
} & InputVariants;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, className, type = "text", inputSize = "md", width = 200, ...props },
    ref
  ) => {
    const classNames = [input({ inputSize }), className]
      .filter(Boolean)
      .join(" ");

    const inputWidth = {
      width: typeof width === "number" ? `${width}px` : width,
    };
    return (
      <input
        id={id}
        ref={ref}
        type={type}
        className={classNames}
        style={inputWidth}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
