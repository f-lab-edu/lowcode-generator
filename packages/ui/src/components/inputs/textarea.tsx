import {
  type Ref,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from "react";
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
  const classNames = [textarea({ inputSize }), className]
    .filter(Boolean)
    .join(" ");

  const textareaStyle: CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };
  return (
    <textarea
      id={id}
      ref={ref}
      rows={rows}
      disabled={disabled}
      className={classNames}
      style={textareaStyle}
      {...props}
    />
  );
}
