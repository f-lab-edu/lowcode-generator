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
          paddingLeft: vars.sizing[3],
          paddingRight: vars.sizing[3],
          paddingTop: vars.sizing[1],
          paddingBottom: vars.sizing[1],
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          paddingLeft: vars.sizing[4],
          paddingRight: vars.sizing[4],
          paddingTop: vars.sizing[2],
          paddingBottom: vars.sizing[2],
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
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
