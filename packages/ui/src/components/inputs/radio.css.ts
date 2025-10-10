import { vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const radioWrapper = recipe({
  base: [
    style({
      display: "inline-flex",
      alignItems: "center",
      gap: vars.sizing[1],
      cursor: "pointer",
      userSelect: "none",
    }),
  ],
  variants: {
    disabled: {
      true: { cursor: "not-allowed", opacity: 0.6 },
    },
  },
});

export const radio = recipe({
  base: [
    style({
      appearance: "none",
      margin: 0,
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
      backgroundColor: vars.color.background.input.default,
      border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
      borderRadius: vars.sizing.full,
      transition: "background-color 0.15s ease, border-color 0.15s ease",
      selectors: {
        "&::after": {
          content: "''",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: vars.sizing.full,
          backgroundColor: vars.color.background.input.selected,
          opacity: 0,
          transition: "opacity 0.15s ease",
        },
        "&:hover": {
          borderColor: vars.color.border.input.active,
        },
        "&:checked": {
          borderColor: vars.color.border.input.selected,
        },
        "&:checked::after": {
          opacity: 1,
        },
        "&:focus-visible": {
          outline: `2px solid ${vars.color.border.input.active}`,
          outlineOffset: "2px",
        },
        "&:disabled": {
          backgroundColor: vars.color.background.input.disabled,
          borderColor: vars.color.border.input.disabled,
          cursor: "not-allowed",
        },
        "&:disabled:checked::after": {
          backgroundColor: vars.color.background.input.disabled,
        },
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: style({
        width: vars.sizing[3],
        height: vars.sizing[3],
        selectors: {
          "&::after": {
            width: vars.sizing[1.5],
            height: vars.sizing[1.5],
          },
        },
      }),
      md: style({
        width: vars.sizing[4],
        height: vars.sizing[4],
        selectors: {
          "&::after": {
            width: vars.sizing[2],
            height: vars.sizing[2],
          },
        },
      }),
      lg: style({
        width: vars.sizing[5],
        height: vars.sizing[5],
        selectors: {
          "&::after": {
            width: vars.sizing[3],
            height: vars.sizing[3],
          },
        },
      }),
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export const radioLabel = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      color: vars.color.text.base.default,
      selectors: {
        "[data-disabled='true'] &": {
          color: vars.color.text.subtle.default,
          cursor: "not-allowed",
        },
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: typographyRecipe({ role: "textSmRegular" }),
      md: typographyRecipe({ role: "textMdRegular" }),
      lg: typographyRecipe({ role: "textLgRegular" }),
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export type RadioVariants = RecipeVariants<typeof radio>;
