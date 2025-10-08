import {
  forwardRef,
  type ElementType,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
} from "react";
import {
  typographyRecipe,
  type TypographyRole,
} from "@packages/vanilla-extract-config";

export type TypographyElement =
  | "p"
  | "span"
  | "strong"
  | "em"
  | "label"
  | "blockquote"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "pre";

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

export type TypographyProps<T extends TypographyElement = "p"> = {
  as?: T;
  role?: TypographyRole;
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<T>;

const Typography = forwardRef(
  <T extends TypographyElement = "p">(
    {
      as,
      role = "textMdRegular",
      children,
      className,
      ...props
    }: TypographyProps<T>,
    ref: PolymorphicRef<T>
  ) => {
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
);

Typography.displayName = "Typography";

export { Typography };
