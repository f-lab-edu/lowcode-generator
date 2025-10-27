import {
  useState,
  useRef,
  useEffect,
  type Ref,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import {
  selectWrapper,
  selectControl,
  selectLabel,
  selectMenu,
  optionItem,
  type SelectVariants,
} from "./select.css";
import { cn } from "../../utils/cn";

export type SelectOption = { label: string; value: string; disabled?: boolean };

export type SelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> &
  SelectVariants & {
    label?: string;
    width?: CSSProperties["width"];
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    ref?: Ref<HTMLButtonElement>;
  };

export function Select({
  id,
  label,
  width,
  options = [],
  inputSize = "md",
  className,
  value,
  onChange,
  ref,
  disabled,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value ?? options.find((o) => !o.disabled)?.value
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 0 });

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

  // 메뉴 열릴 위치 계산 필요 (createPortal로 구현)
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const controlClassNames = cn(selectControl({ inputSize }), className);
  const wrapperStyle = {
    width: typeof width === "number" ? `${width}px` : width,
  };

  const menuRoot = document.body;

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
      {isOpen &&
        !disabled &&
        createPortal(
          <ul
            className={selectMenu}
            style={{
              position: "absolute",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: `${menuPosition.width}px`,
              zIndex: 9999,
            }}
          >
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
          </ul>,
          menuRoot
        )}
    </div>
  );
}
