import { type Ref, type CSSProperties, type HTMLAttributes } from "react";
import {
  containerRecipe,
  type ContainerRecipeVariants,
} from "@packages/vanilla-extract-config";

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  ContainerRecipeVariants & {
    minHeight?: string | number;
    ref?: Ref<HTMLDivElement>;
  };

export function Container({
  widthScale = "lg",
  minHeight,
  className,
  style,
  children,
  ref,
  ...props
}: ContainerProps) {
  const classNames = [containerRecipe({ widthScale }), className]
    .filter(Boolean)
    .join(" ");

  const containerStyle: CSSProperties = minHeight
    ? {
        minHeight: typeof minHeight === "string" ? minHeight : `${minHeight}px`,
      }
    : { minHeight: "100svh" };

  return (
    <div
      ref={ref}
      className={classNames}
      style={{ ...containerStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
