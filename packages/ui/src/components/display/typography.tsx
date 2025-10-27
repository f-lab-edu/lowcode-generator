import {
  type ElementType,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
} from "react";
import {
  typographyRecipe,
  type TypographyRole,
} from "@packages/vanilla-extract-config";

export const TYPOGRAPHY_ELEMENT = [
  "p",
  "span",
  "strong",
  "em",
  "label",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
] as const;

export type TypographyElement = (typeof TYPOGRAPHY_ELEMENT)[number];

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

export type TypographyProps<T extends TypographyElement = "p"> = {
  as?: T;
  role?: TypographyRole;
  children?: React.ReactNode;
  className?: string;
  ref?: PolymorphicRef<T>;
} & ComponentPropsWithoutRef<T>;

export function Typography<T extends TypographyElement = "p">({
  as,
  role = "textMdRegular",
  ref,
  children,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? "p") as ElementType;
  const classNames = [typographyRecipe({ role }), className]
    .filter(Boolean)
    .join(" ");
  return (
    <Component ref={ref} className={classNames} {...props}>
      {children}
    </Component>
  );
}
