import { vars } from "@packages/vanilla-extract-config";
import { typography } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const input = recipe({
  base: [
    typography({ role: "textMdRegular" }),
    style({
      background: vars.color.background.input.default,
      border: vars.color.border.input.default,
      borderRadius: vars.sizing["2"],
      ":disabled": {
        background: vars.color.background.input.disabled,
        border: vars.color.border.input.disabled,
      },
      ":focus": {
        border: vars.color.border.input.active,
      },
      "::placeholder": {
        color: vars.color.text.subtle.default,
      },
    }),
  ],
  // variants: {
  //   size: {
  //     sm : style({
  //       paddingSt
  //     })
  //   },
  // },
  // defaultVariants: {
  //   size : md
  // }
});
