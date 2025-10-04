import { vars } from "@packages/vanilla-extract-config";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { typography } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";

export const button = recipe({
  base: [
    typography({ role: "textMdRegular" }),
    style({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "none",
      color: vars.color.text.base.inverse,
      borderRadius: vars.sizing["3"],
    }),
  ],

  variants: {
    color: {
      brand: style({
        backgroundColor: vars.color.background.brand.default,
        ":hover": {
          backgroundColor: vars.color.background.brand.bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background.brand.subtle,
        },
      }),
      info: style({
        backgroundColor: vars.color.background.info.default,
        ":hover": {
          backgroundColor: vars.color.background.info.bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background.info.subtle,
        },
      }),
      success: style({
        backgroundColor: vars.color.background.success.default,
        ":hover": {
          backgroundColor: vars.color.background.success.bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background.success.subtle,
        },
      }),
      warning: style({
        backgroundColor: vars.color.background.warning.default,
        ":hover": {
          backgroundColor: vars.color.background.warning.bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background.warning.subtle,
        },
      }),
      danger: style({
        backgroundColor: vars.color.background.danger.default,
        ":hover": {
          backgroundColor: vars.color.background.danger.bold,
        },
        ":disabled": {
          backgroundColor: vars.color.background.danger.subtle,
        },
      }),
    },

    size: {
      sm: [
        typography({ role: "textSmRegular" }),
        style({
          paddingLeft: vars.sizing[3],
          paddingRight: vars.sizing[3],
          paddingTop: vars.sizing[2],
          paddingBottom: vars.sizing[2],
        }),
      ],
      md: [
        typography({ role: "textMdRegular" }),
        style({
          paddingLeft: vars.sizing[4],
          paddingRight: vars.sizing[4],
          paddingTop: vars.sizing[2],
          paddingBottom: vars.sizing[2],
        }),
      ],
      lg: [
        typography({ role: "textLgRegular" }),
        style({
          paddingLeft: vars.sizing[6],
          paddingRight: vars.sizing[6],
          paddingTop: vars.sizing[3],
          paddingBottom: vars.sizing[3],
        }),
      ],
    },
    fullWidth: {
      true: style({ width: vars.sizing.full }),
    },
  },

  defaultVariants: {
    color: "brand",
    size: "md",
  },
});
export type ButtonVariants = RecipeVariants<typeof button>;
