import { vars } from "@packages/vanilla-extract-config";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { COLOR_VARIANTS } from "@packages/vanilla-extract-config";

const makeColorVariant = () => {
  return Object.fromEntries(
    COLOR_VARIANTS.map((color) => [
      color,
      style({
        backgroundColor: vars.color.background[color].default,
        ":hover": { backgroundColor: vars.color.background[color].bold },
        ":disabled": { backgroundColor: vars.color.background[color].subtle },
      }),
    ])
  );
};

export const button = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
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
    color: { ...makeColorVariant() },
    size: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          padding: `${vars.sizing["1"]} ${vars.sizing["3"]}`,
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          padding: `${vars.sizing["2"]} ${vars.sizing["4"]}`,
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          padding: `${vars.sizing["3"]} ${vars.sizing["6"]}`,
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
