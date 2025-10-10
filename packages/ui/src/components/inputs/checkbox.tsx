import { forwardRef } from "react";
import {
  checkboxWrapper,
  checkbox,
  checkboxLabel,
  type CheckboxVariants,
} from "./checkbox.css";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
  CheckboxVariants & {
    label?: string;
  };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, label, disabled = false, inputSize = "md", ...props }, ref) => {
    const checkboxId =
      id ?? `checkbox-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <label htmlFor={checkboxId} className={checkboxWrapper({ disabled })}>
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={checkbox({ inputSize })}
          {...props}
        />
        {label && <span className={checkboxLabel({ inputSize })}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
