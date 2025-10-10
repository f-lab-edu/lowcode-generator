import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type ButtonHTMLAttributes,
} from "react";
import {
  selectWrapper,
  selectControl,
  selectLabel,
  selectMenu,
  optionItem,
  type SelectVariants,
} from "./select.css";

export type SelectOption = { label: string; value: string; disabled?: boolean };

export type SelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> &
  SelectVariants & {
    label?: string;
    width?: string | number;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
  };

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      id,
      label,
      width,
      options = [],
      inputSize = "md",
      className,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
      value ?? options.find((o) => !o.disabled)?.value
    );
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectId = id ?? `select-${Math.random().toString(36).slice(2, 8)}`;

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleOptionClick = (option: SelectOption) => {
      if (option.disabled) return;
      setSelectedValue(option.value);
      onChange?.(option.value);
      setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const controlClassNames = [selectControl({ inputSize }), className]
      .filter(Boolean)
      .join(" ");

    const wrapperStyle = {
      width: typeof width === "number" ? `${width}px` : width,
    };

    return (
      <div ref={wrapperRef} className={selectWrapper} style={wrapperStyle}>
        {label && (
          <label htmlFor={selectId} className={selectLabel({ inputSize })}>
            {label}
          </label>
        )}
        <button
          id={selectId}
          ref={ref}
          className={controlClassNames}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          {...props}
        >
          {selectedOption?.label || "Select..."}
        </button>
        {isOpen && !disabled && (
          <ul className={selectMenu}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={optionItem({
                  isSelected: selectedValue === opt.value,
                  disabled: opt.disabled,
                  inputSize,
                })}
                onClick={() => handleOptionClick(opt)}
                role="option"
                aria-disabled={opt.disabled}
                aria-selected={selectedValue === opt.value}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
