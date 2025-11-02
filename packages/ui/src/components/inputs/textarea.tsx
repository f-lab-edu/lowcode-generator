import {
  type Ref,
  type CSSProperties,
  type TextareaHTMLAttributes,
  useId,
} from "react";
import { cn } from "../../utils/cn";
import { textarea, type TextareaVariants } from "./textarea.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaVariants & {
    className?: string;
    width?: CSSProperties["width"];
    ref?: Ref<HTMLTextAreaElement>;
  };

export function Textarea({
  id,
  className,
  disabled = false,
  inputSize = "md",
  width = "100%",
  rows = 3,
  style,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = `${id || "textarea"}_${generatedId}`;

  const classNames = cn(textarea({ inputSize }), className);

  const textareaStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };
  return (
    <textarea
      id={textareaId}
      ref={ref}
      rows={rows}
      disabled={disabled}
      className={classNames}
      style={textareaStyle}
      {...props}
    />
  );
}
