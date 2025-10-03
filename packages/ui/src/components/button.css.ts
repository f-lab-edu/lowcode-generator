import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { sprinkles, typography } from "@packages/vanilla-extract-config";

export const button = recipe({
  base: [
    typography({ role: "textMdRegular" }),
    sprinkles({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      borderStyle: "none",
      borderRadius: "md",
    }),
  ],

  variants: {
    color: {
      brand: sprinkles({
        background: {
          default: "brand",
          hover: "brand.bold",
        },
        text: "default.inverse",
      }),
      info: sprinkles({
        background: {
          default: "info",
          hover: "info.bold",
        },
        text: "default.inverse",
      }),
      success: sprinkles({
        background: {
          default: "success",
          hover: "success.bold",
        },
        text: "default.inverse",
      }),
      warning: sprinkles({
        background: {
          default: "warning",
          hover: "warning.bold",
        },
        text: "default.inverse",
      }),
      danger: sprinkles({
        background: {
          default: "danger",
          hover: "danger.bold",
        },
        text: "default.inverse",
      }),
    },

    size: {
      sm: [
        typography({ role: "textSmRegular" }),
        sprinkles({ paddingX: "3", paddingY: "1.5" }),
      ],
      md: [
        typography({ role: "textMdRegular" }),
        sprinkles({ paddingX: "4", paddingY: "2" }),
      ],
      lg: [
        typography({ role: "textLgRegular" }),
        sprinkles({ paddingX: "6", paddingY: "3" }),
      ],
    },
    fullWidth: {
      true: sprinkles({ width: "full" }),
    },
  },

  defaultVariants: {
    color: "brand",
    size: "md",
  },
});

export type ButtonVariants = RecipeVariants<typeof button>;

/**
 * Sprinkles를 사용한 버튼의 기본 스타일
 * 컴포넌트에서 `baseButton` 클래스와 함께 적용되어야 합니다.
 */
export const baseButton = [
  typography({ role: "headingXxl" }),
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderStyle: "none",
    borderRadius: "md",
  }),
];

/**
 * 버튼 색상 variants
 */
export const buttonColorVariants = {
  brand: sprinkles({
    background: {
      default: "brand",
      hover: "brand.bold",
    },
    text: "default.inverse",
  }),
  info: sprinkles({
    background: {
      default: "info",
      hover: "info.bold",
    },
    text: "default.inverse",
  }),
  success: sprinkles({
    background: {
      default: "success",
      hover: "success.bold",
    },
    text: "default.inverse",
  }),
  warning: sprinkles({
    background: {
      default: "warning",
      hover: "warning.bold",
    },
    text: "default.inverse",
  }),
  danger: sprinkles({
    background: {
      default: "danger",
      hover: "danger.bold",
    },
    text: "default.inverse",
  }),
};

/**
 * 버튼 크기 variants
 */
export const buttonSizeVariants = {
  sm: sprinkles({
    fontSize: "sm",
    paddingX: "3",
    paddingY: "1.5",
  }),
  md: sprinkles({
    fontSize: "md",
    paddingX: "4",
    paddingY: "2",
  }),
  lg: sprinkles({
    fontSize: "lg",
    paddingX: "6",
    paddingY: "3",
  }),
};

/**
 * 전체 너비 버튼
 */
export const fullWidth = sprinkles({
  width: "full",
});
