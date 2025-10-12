import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars, typographyRecipe } from "@packages/vanilla-extract-config";

export const paginationStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const paginationListStyle = style({
  display: "flex",
  alignItems: "center",
  listStyle: "none",
  padding: 0,
  margin: 0,
  gap: "4px",
});

export const paginationItemStyle = recipe({
  base: {
    cursor: "pointer",
    userSelect: "none",
    border: "1px solid transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  },

  variants: {
    shape: {
      rounded: {
        borderRadius: vars.sizing["2"],
      },
      circular: {
        borderRadius: vars.sizing.full,
      },
    },
    size: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        {
          height: vars.sizing[6],
          minWidth: vars.sizing[6],
        },
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        {
          height: vars.sizing[8],
          minWidth: vars.sizing[8],
        },
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        {
          height: vars.sizing[10],
          minWidth: vars.sizing[10],
        },
      ],
    },
    color: {
      primary: {},
      secondary: {},
      tertiary: {},
    },
    variant: {
      text: {
        backgroundColor: "transparent",
      },
      outlined: {
        borderColor: vars.color.border.base.default,
      },
    },
    isSelected: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.5,
        ":hover": {
          backgroundColor: "transparent",
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { color: "primary", isSelected: true },
      style: {
        backgroundColor: vars.color.background.primary.default,
        color: vars.color.text.base.inverse,
        ":hover": { backgroundColor: vars.color.background.primary.bold },
      },
    },
    {
      variants: { color: "primary", variant: "text", isSelected: false },
      style: {
        color: vars.color.text.primary.default,
        ":hover": { backgroundColor: vars.color.background.primary.subtle },
      },
    },
    {
      variants: { color: "primary", variant: "outlined", isSelected: false },
      style: {
        borderColor: vars.color.border.primary,
        color: vars.color.text.primary.default,
        ":hover": { backgroundColor: vars.color.background.primary.subtle },
      },
    },
    {
      variants: { color: "secondary", isSelected: true },
      style: {
        backgroundColor: vars.color.background.secondary.default,
        color: vars.color.text.base.inverse,
        ":hover": { backgroundColor: vars.color.background.secondary.bold },
      },
    },
    {
      variants: { color: "secondary", variant: "text", isSelected: false },
      style: {
        color: vars.color.text.secondary.default,
        ":hover": { backgroundColor: vars.color.background.secondary.subtle },
      },
    },
    {
      variants: { color: "secondary", variant: "outlined", isSelected: false },
      style: {
        borderColor: vars.color.border.secondary,
        color: vars.color.text.secondary.default,
        ":hover": { backgroundColor: vars.color.background.secondary.subtle },
      },
    },
    {
      variants: { color: "tertiary", isSelected: true },
      style: {
        backgroundColor: vars.color.background.tertiary.default,
        color: vars.color.text.base.inverse,
        ":hover": { backgroundColor: vars.color.background.tertiary.bold },
      },
    },
    {
      variants: { color: "tertiary", variant: "text", isSelected: false },
      style: {
        color: vars.color.text.tertiary.default,
        ":hover": { backgroundColor: vars.color.background.tertiary.subtle },
      },
    },
    {
      variants: { color: "tertiary", variant: "outlined", isSelected: false },
      style: {
        borderColor: vars.color.border.tertiary,
        color: vars.color.text.tertiary.default,
        ":hover": { backgroundColor: vars.color.background.tertiary.subtle },
      },
    },
  ],
  defaultVariants: {
    shape: "rounded",
    size: "md",
    variant: "text",
    isSelected: false,
    disabled: false,
    color: "primary",
  },
});

export type PaginationVariants = Parameters<typeof paginationItemStyle>[0];
