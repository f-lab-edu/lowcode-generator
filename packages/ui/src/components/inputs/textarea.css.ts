import { vars } from "@packages/vanilla-extract-config";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const textarea = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      background: vars.color.background.input.default,
      border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
      boxSizing: "border-box",
      borderRadius: vars.sizing["2"],
      ":disabled": {
        background: vars.color.background.input.disabled,
        borderColor: vars.color.border.input.disabled,
      },
      ":focus-visible": {
        outline: "none",
        borderColor: vars.color.border.input.active,
        boxShadow: vars.elevation.shadow.raised,
      },
      "::placeholder": {
        color: vars.color.text.subtle.default,
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          padding: `${vars.sizing["1"]} ${vars.sizing["2"]}`,
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          padding: `${vars.sizing["3"]}`,
        }),
      ],
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export type TextareaVariants = RecipeVariants<typeof textarea>;
