import {
  forwardRef,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from "react";
import { textarea, type TextareaVariants } from "./textarea.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaVariants & {
    className?: string;
    width?: CSSProperties["width"];
  };

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      className,
      disabled = false,
      inputSize = "md",
      width = "100%",
      rows = 3,
      style,
      ...props
    },
    ref
  ) => {
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
);

Textarea.displayName = "Textarea";

export { Textarea };
