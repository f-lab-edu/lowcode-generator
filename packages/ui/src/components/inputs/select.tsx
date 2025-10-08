import { forwardRef, type SelectHTMLAttributes } from "react";
import {
  selectWrapper,
  selectControl,
  selectLabel,
  selectOption,
  type SelectVariants,
} from "./select.css";

export type SelectOption = { label: string; value: string; disabled?: boolean };

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  SelectVariants & {
    label?: string;
    width?: string | number;
    options?: SelectOption[];
  };
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { id, label, width, options = [], inputSize = "md", className, ...props },
    ref
  ) => {
    const selectId = id ?? `select-${Math.random().toString(36).slice(2, 8)}`;
    const inputWidth = {
      width: typeof width === "number" ? `${width}px` : width,
    };
    const classNames = [selectControl({ inputSize }), className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={selectWrapper}>
        {label && (
          <label htmlFor={selectId} className={selectLabel({ inputSize })}>
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={classNames}
          style={inputWidth}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className={selectOption}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
