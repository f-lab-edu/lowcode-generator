import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@packages/vanilla-extract-config";

export const divider = recipe({
  base: {
    border: 0,
    borderColor: vars.color.border.base.default,
  },
  variants: {
    orientation: {
      horizontal: {
        width: "100%",
        borderTopWidth: vars.sizing["px"],
      },
      vertical: {
        height: "100%",
        borderLeftWidth: vars.sizing["px"],
      },
    },
    variant: {
      solid: {
        borderStyle: "solid",
      },
      dashed: {
        borderStyle: "dashed",
      },
    },
    color: {
      default: {
        borderColor: vars.color.border.base.default,
      },
      subtle: {
        borderColor: vars.color.border.base.subtle,
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    color: "default",
  },
});

export type DividerVariants = Parameters<typeof divider>[0];
