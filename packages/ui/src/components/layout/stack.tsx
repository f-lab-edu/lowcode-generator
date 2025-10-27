import { type Ref, type HTMLAttributes } from "react";
import { stackRecipe } from "@packages/vanilla-extract-config";
import { type RecipeVariants } from "@vanilla-extract/recipes";

export type StackVariants = RecipeVariants<typeof stackRecipe>;

export type StackProps = HTMLAttributes<HTMLDivElement> &
  StackVariants & {
    ref?: Ref<HTMLDivElement>;
    children?: React.ReactNode;
  };

export function Stack({
  gap,
  justify,
  align,
  direction,
  className,
  ref,
  children,
  ...props
}: StackProps) {
  const classNames = [
    stackRecipe({ gap, justify, align, direction }),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  );
}
