import { type Ref } from "react";
import {
  checkboxWrapper,
  checkbox,
  checkboxLabel,
  type CheckboxVariants,
} from "./checkbox.css";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> &
  CheckboxVariants & {
    label?: string;
    ref?: Ref<HTMLInputElement>;
  };

export function Checkbox({
  id,
  label,
  disabled = false,
  inputSize = "md",
  ref,
  ...props
}: CheckboxProps) {
  return (
    <label className={checkboxWrapper({ disabled })}>
      <input
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
