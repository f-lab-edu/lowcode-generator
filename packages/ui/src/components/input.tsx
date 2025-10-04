import { forwardRef } from "react";

type InputProps = {
  type: string;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return <input ref={ref} type={type} className={className} {...props} />;
  }
);

Input.displayName = "Input";

export { Input };
