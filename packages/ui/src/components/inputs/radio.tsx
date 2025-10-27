import { type Ref } from "react";
import {
  radioWrapper,
  radio,
  radioLabel,
  type RadioVariants,
} from "./radio.css";

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> &
  RadioVariants & {
    label?: string;
    ref?: Ref<HTMLInputElement>;
  };

export function Radio({
  id,
  name,
  label,
  disabled = false,
  inputSize = "md",
  ref,
  ...props
}: RadioProps) {
  const radioName = name ?? `radio`;

  const radioId = id ?? `radio-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label htmlFor={radioId} className={radioWrapper({ disabled })}>
      <input
        id={radioId}
        name={radioName}
        ref={ref}
        type="radio"
        disabled={disabled}
        className={radio({ inputSize })}
        {...props}
      />
      {label && <span className={radioLabel({ inputSize })}>{label}</span>}
    </label>
  );
}
