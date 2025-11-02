import type { RecipeVariants } from "@vanilla-extract/recipes";
import { vars, typographyRecipe } from "@packages/vanilla-extract-config";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const selectWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizing["2"],
  width: "fit-content",
  position: "relative",
});

export const selectLabel = recipe({
  base: [
    typographyRecipe({ role: "textSmSemibold" }),
    style({
      color: vars.color.text.subtle.default,
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

export const selectControl = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      width: "100%",
      appearance: "none",
      boxSizing: "border-box",
      backgroundColor: vars.color.background.input.default,
      backgroundRepeat: "no-repeat",
      backgroundPosition: `right ${vars.sizing["3"]} center`,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='${encodeURIComponent(
        vars.color.text.subtle.default
      )}' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5H7z'/%3E%3C/svg%3E")`,
      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
      border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
      borderRadius: vars.sizing["2"],
      color: vars.color.text.base.default,
      padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
      textAlign: "left",
      selectors: {
        "&:hover": {
          borderColor: vars.color.border.input.active,
        },
        "&:focus-visible": {
          outline: "none",
          borderColor: vars.color.border.input.active,
          boxShadow: vars.elevation.shadow.raised,
        },
        "&:disabled": {
          background: vars.color.background.input.disabled,
          color: vars.color.text.subtle.default,
          cursor: "not-allowed",
        },
      },
    }),
  ],
  variants: {
    inputSize: {
      sm: [
        typographyRecipe({ role: "textSmRegular" }),
        style({
          backgroundSize: `${vars.sizing["3"]} ${vars.sizing["3"]}`,
          padding: `${vars.sizing["1"]} ${vars.sizing["6"]} ${vars.sizing["1"]} ${vars.sizing["2"]}`,
        }),
      ],
      md: [
        typographyRecipe({ role: "textMdRegular" }),
        style({
          backgroundSize: `${vars.sizing["4"]} ${vars.sizing["4"]}`,
          padding: `${vars.sizing["2"]} ${vars.sizing["8"]} ${vars.sizing["2"]} ${vars.sizing["3"]}`,
        }),
      ],
      lg: [
        typographyRecipe({ role: "textLgRegular" }),
        style({
          backgroundSize: `${vars.sizing["5"]} ${vars.sizing["5"]}`,
          padding: `${vars.sizing["3"]} ${vars.sizing["10"]} ${vars.sizing["3"]} ${vars.sizing["4"]}`,
        }),
      ],
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export const selectMenu = style({
  position: "absolute",
  top: "100%",
  boxSizing: "border-box",
  left: 0,
  right: 0,
  zIndex: 10,
  marginTop: vars.sizing["1"],
  backgroundColor: vars.color.background.input.default,
  border: `${vars.sizing["0.5"]} solid ${vars.color.border.input.default}`,
  borderRadius: vars.sizing["2"],
  boxShadow: vars.elevation.shadow.raised,
  maxHeight: "200px",
  overflowY: "auto",
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const optionItem = recipe({
  base: [
    typographyRecipe({ role: "textMdRegular" }),
    style({
      padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
      cursor: "pointer",
      color: vars.color.text.base.default,
      selectors: {
        "&:hover": {
          backgroundColor: vars.color.background.input.hovered,
        },
      },
    }),
  ],
  variants: {
    isSelected: {
      true: {
        backgroundColor: vars.color.background.input.selected,
        color: vars.color.text.base.inverse,
        ":hover": {
          backgroundColor: vars.color.background.input.selected,
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: vars.color.background.input.disabled,
        color: vars.color.text.disabled,
        cursor: "no-drop",
        ":hover": {
          backgroundColor: vars.color.background.input.disabled,
        },
      },
    },
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

export type SelectVariants = RecipeVariants<typeof selectControl>;
