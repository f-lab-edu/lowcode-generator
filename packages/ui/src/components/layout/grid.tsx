import { type Ref, type CSSProperties, type HTMLAttributes } from "react";
import { gridRecipe } from "@packages/vanilla-extract-config";
import type { RecipeVariants } from "@vanilla-extract/recipes";

export type GridVariants = RecipeVariants<typeof gridRecipe>;

export type GridProps = HTMLAttributes<HTMLDivElement> &
  GridVariants & {
    container?: boolean;
    size?: number;
    children?: React.ReactNode;
    ref?: Ref<HTMLDivElement>;
  };

export function Grid({
  container = false,
  size,
  gap,
  padding,
  columns,
  align,
  justify,
  inline,
  className,
  style,
  ref,
  children,
  ...props
}: GridProps) {
  const isContainer = container;

  // container
  const containerClass = isContainer
    ? gridRecipe({
        gap: gap ?? "md",
        padding,
        columns,
        align,
        justify,
        inline,
      })
    : undefined;

  // grid item
  const itemStyle: CSSProperties =
    !isContainer && size ? { gridColumn: `span ${size}` } : {};

  const classNames = [containerClass, className].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className={classNames}
      style={{ ...style, ...itemStyle }}
      {...props}
    >
      {children}
    </div>
  );
}
