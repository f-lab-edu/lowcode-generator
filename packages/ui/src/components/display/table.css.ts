import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars, typographyRecipe } from "@packages/vanilla-extract-config";

export const table = recipe({
  base: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
    textAlign: "left",
  },
  variants: {
    variant: {
      simple: {
        borderTop: `1px solid ${vars.color.border.base.default}`,
      },
      bordered: {
        border: `1px solid ${vars.color.border.base.default}`,
      },
      striped: {
        borderTop: `1px solid ${vars.color.border.base.default}`,
      },
    },
    color: {
      base: {},
      primary: {},
      secondary: {},
      tertiary: {},
    },
  },
  defaultVariants: {
    variant: "simple",
    color: "base",
  },
});

export const tableCaption = recipe({
  base: [
    typographyRecipe({ role: "textSmRegular" }),
    {
      padding: vars.sizing["2"],
      textAlign: "center",
      color: vars.color.text.subtle.default,
    },
  ],
});

export const tableHead = recipe({
  base: {},
  variants: {
    variant: {
      simple: {},
      bordered: {},
      striped: {},
    },
    color: {
      base: {
        backgroundColor: vars.color.background.base.default,
      },
      primary: {
        backgroundColor: vars.color.background.primary.default,
      },
      secondary: {
        backgroundColor: vars.color.background.secondary.default,
      },
      tertiary: {
        backgroundColor: vars.color.background.tertiary.default,
      },
    },
  },
});

export const tableBody = style({});

export const tableFoot = style({});

export const tableRow = recipe({
  base: {
    transition: "background-color 0.15s ease",
  },
  variants: {
    color: {
      base: {},
      primary: {},
      secondary: {},
      tertiary: {},
    },
    variant: {
      simple: {
        borderBottom: `1px solid ${vars.color.border.base.default}`,
      },
      bordered: {
        border: `1px solid ${vars.color.border.base.default}`,
      },
      striped: {},
    },
    hover: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { color: "base", hover: true },
      style: {
        ":hover": {
          backgroundColor: vars.color.background.base.subtle,
        },
      },
    },
    {
      variants: { color: "primary", hover: true },
      style: {
        ":hover": {
          backgroundColor: vars.color.background.primary.subtle,
        },
      },
    },
    {
      variants: { color: "secondary", hover: true },
      style: {
        ":hover": {
          backgroundColor: vars.color.background.secondary.subtle,
        },
      },
    },
    {
      variants: { color: "tertiary", hover: true },
      style: {
        ":hover": {
          backgroundColor: vars.color.background.tertiary.subtle,
        },
      },
    },
    {
      variants: { color: "base", variant: "striped" },
      style: {
        selectors: {
          "&:nth-of-type(odd)": {
            backgroundColor: vars.color.background.base.subtle,
          },
        },
      },
    },
    {
      variants: { color: "primary", variant: "striped" },
      style: {
        selectors: {
          "&:nth-of-type(odd)": {
            backgroundColor: vars.color.background.primary.subtle,
          },
        },
      },
    },
    {
      variants: { color: "secondary", variant: "striped" },
      style: {
        selectors: {
          "&:nth-of-type(odd)": {
            backgroundColor: vars.color.background.secondary.subtle,
          },
        },
      },
    },
    {
      variants: { color: "tertiary", variant: "striped" },
      style: {
        selectors: {
          "&:nth-of-type(odd)": {
            backgroundColor: vars.color.background.tertiary.subtle,
          },
        },
      },
    },
  ],
});

const cellBase = [
  typographyRecipe({ role: "textSmRegular" }),
  style({
    padding: `${vars.sizing["2"]} ${vars.sizing["3"]}`,
    verticalAlign: "middle",
    borderTop: `1px solid ${vars.color.border.base.default}`,
  }),
];

export const tableHeaderCell = recipe({
  base: [
    cellBase,
    typographyRecipe({ role: "textSmSemibold" }),
    {
      color: vars.color.text.base.default,
    },
  ],
  variants: {
    variant: {
      simple: {},
      bordered: {
        borderLeft: `1px solid ${vars.color.border.base.default}`,
        selectors: {
          "&:last-child": {
            borderRight: `1px solid ${vars.color.border.base.default}`,
          },
        },
      },
      striped: {},
    },
    color: {
      base: {
        backgroundColor: vars.color.background.base.default,
      },
      primary: {
        backgroundColor: vars.color.background.primary.default,
      },
      secondary: {
        backgroundColor: vars.color.background.secondary.default,
      },
      tertiary: {
        backgroundColor: vars.color.background.tertiary.default,
      },
    },
    size: {
      sm: { padding: `${vars.sizing["1"]} ${vars.sizing["2"]}` },
      md: { padding: `${vars.sizing["2"]} ${vars.sizing["3"]}` },
      lg: { padding: `${vars.sizing["3"]} ${vars.sizing["4"]}` },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
  },
});

export const tableCell = recipe({
  base: [cellBase],
  variants: {
    variant: {
      simple: {},
      bordered: {
        borderLeft: `1px solid ${vars.color.border.base.default}`,
        selectors: {
          "&:last-child": {
            borderRight: `1px solid ${vars.color.border.base.default}`,
          },
        },
      },
      striped: {},
    },
    size: {
      sm: { padding: `${vars.sizing["1"]} ${vars.sizing["2"]}` },
      md: { padding: `${vars.sizing["2"]} ${vars.sizing["3"]}` },
      lg: { padding: `${vars.sizing["3"]} ${vars.sizing["4"]}` },
    },
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
  },
});

export type TableVariants = Parameters<typeof table>[0];
export type TableRowVariants = Parameters<typeof tableRow>[0];
export type TableHeaderCellVariants = Parameters<typeof tableHeaderCell>[0];
export type TableCellVariants = Parameters<typeof tableCell>[0];
