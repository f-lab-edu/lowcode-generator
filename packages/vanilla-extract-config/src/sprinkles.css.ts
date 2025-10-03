import {
  defineProperties,
  createSprinkles,
  type ConditionalValue,
} from "@vanilla-extract/sprinkles";
import { themeTokens } from "@packages/tokens/vanilla-extract";
import { vars } from "./theme.css";

const responsiveProperties = defineProperties({
  conditions: {
    xs: { "@media": `screen and (min-width: ${themeTokens.breakpoints.xs})` },
    sm: { "@media": `screen and (min-width: ${themeTokens.breakpoints.sm})` },
    md: { "@media": `screen and (min-width: ${themeTokens.breakpoints.md})` },
    lg: { "@media": `screen and (min-width: ${themeTokens.breakpoints.lg})` },
    xl: { "@media": `screen and (min-width: ${themeTokens.breakpoints.xl})` },
    "2xl": {
      "@media": `screen and (min-width: ${themeTokens.breakpoints["2xl"]})`,
    },
  },
  defaultCondition: "xs",
  properties: {
    display: ["none", "flex", "block", "inline", "grid", "inline-flex"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    paddingTop: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,
    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,
    gap: vars.spacing,
    width: vars.sizing,
    height: vars.sizing,
    minWidth: vars.sizing,
    minHeight: vars.sizing,
    maxWidth: vars.sizing,
    maxHeight: vars.sizing,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    size: ["width", "height"],
  },
});

const stateProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    focus: { selector: "&:focus" },
    active: { selector: "&:active" },
    disabled: { selector: "&:disabled" },
  },
  defaultCondition: "default",
  properties: {
    backgroundColor: vars.color.background,
    color: vars.color.text,
    borderColor: vars.color.border,
    boxShadow: { ...vars.shadow, ...vars.elevation.shadow },
    opacity: vars.system.opacity,
  },
  shorthands: {
    background: ["backgroundColor"],
    text: ["color"],
    border: ["borderColor"],
  },
});

const unconditionalProperties = defineProperties({
  properties: {
    borderWidth: vars.shape["border-width"],
    borderRadius: vars.shape["border-radius"],
    borderStyle: ["solid", "dashed", "dotted", "none"],
    fontWeight: vars.font.weight,
    fontSize: vars.font.size,
    lineHeight: vars.font["line-height"],
    textAlign: ["left", "center", "right"],
    cursor: ["pointer", "not-allowed", "default"],
    transition: {
      "all-ease": "all 0.2s ease-in-out",
    },
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  stateProperties,
  unconditionalProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;
