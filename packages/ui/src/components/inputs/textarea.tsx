import { forwardRef } from "react";
import { textarea, type TextareaVariants } from "./textarea.css";

export type TextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement> &
  TextareaVariants & {
    className?: string;
  };

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, className, inputSize = "md", ...props }, ref) => {
    const classNames = [textarea({ inputSize }), className]
      .filter(Boolean)
      .join(" ");

    return <textarea id={id} ref={ref} className={classNames} {...props} />;
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
