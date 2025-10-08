import { forwardRef } from "react";
import {
  radioWrapper,
  radio,
  radioLabel,
  type RadioVariants,
} from "./radio.css";

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> &
  RadioVariants & {
    label?: string;
  };

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, name, label, disabled = false, inputSize = "md", ...props }, ref) => {
    const radioName = name ?? `radio`;

    const radioId = id ?? `radio-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <label htmlFor={radioId} className={radioWrapper({ disabled })}>
        <input
          id={radioId}
          name={radioName}
          ref={ref}
          type="radio"
          className={radio({ inputSize })}
          {...props}
        />
        {label && <span className={radioLabel({ inputSize })}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Radio };
