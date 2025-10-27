import { type Ref, type HTMLAttributes } from "react";
import {
  sectionRecipe,
  type SectionRecipeVariants,
} from "@packages/vanilla-extract-config";
import { cn } from "../../utils/cn";

export type SectionProps = HTMLAttributes<HTMLElement> &
  SectionRecipeVariants & {
    minHeight?: string | number;
    ref?: Ref<HTMLElement>;
  };

export function Section({
  spacingScale = "md",
  minHeight,
  className,
  style,
  ref,
  children,
  ...props
}: SectionProps) {
  const classNames = cn(sectionRecipe({ spacingScale }), className);

  const sectionStyle = minHeight
    ? {
        minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      }
    : {};

  return (
    <section
      ref={ref}
      className={classNames}
      style={{ ...sectionStyle, ...style }}
      {...props}
    >
      {children}
    </section>
  );
}
