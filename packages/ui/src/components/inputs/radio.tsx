import { useId, type Ref } from "react";
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
  // name
  const radioName = name || `radio`;

  // id (generated using use id hook)
  const generatedId = useId();
  const radioId = `${id || "radio"}_${generatedId}`;

  return (
    <label className={radioWrapper({ disabled })}>
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
