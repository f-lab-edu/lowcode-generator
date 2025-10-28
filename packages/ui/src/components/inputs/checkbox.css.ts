import { vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const checkboxWrapper = recipe({
  base: [
    style({
      display: "inline-flex",
      alignItems: "center",
      gap: vars.sizing["1"],
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

export const checkbox = recipe({
  base: [
    style({
      appearance: "none",
      margin: 0,
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
      backgroundColor: vars.color.background.input.default,
      border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
      borderRadius: vars.sizing["1"],
      transition: "background-color 0.15s ease, border-color 0.15s ease",
      selectors: {
        "&::after": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5.5L5 9.5L13 1.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "80%",
          opacity: 0,
          transition: "opacity 0.15s ease",
        },
        "&:hover": {
          borderColor: vars.color.border.input.active,
        },
        "&:checked": {
          backgroundColor: vars.color.background.input.selected,
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
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: [
        style({
          width: vars.sizing["3"],
          height: vars.sizing["3"],
        }),
      ],
      md: [
        style({
          width: vars.sizing["4"],
          height: vars.sizing["4"],
        }),
      ],
      lg: [
        style({
          width: vars.sizing["5"],
          height: vars.sizing["5"],
        }),
      ],
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export const checkboxLabel = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      color: vars.color.text.base.default,
      lineHeight: "1",
      selectors: {
        "[data-disabled='true'] &": {
          color: vars.color.text.subtle.default,
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

export type CheckboxVariants = RecipeVariants<typeof checkbox>;
