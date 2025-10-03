import { style } from "@vanilla-extract/css";
import { sprinkles } from "@packages/vanilla-extract-config";

/**
 * `sprinkles`로 처리할 수 없는 복잡한 스타일(e.g. transform)을 위한 기본 클래스
 */
export const baseButton = style({
  transition: "transform 0.2s ease-in-out",
  ":hover": {
    transform: "translateY(-2px)",
  },
  ":active": {
    transform: "translateY(0)",
  },
});

/**
 * Sprinkles를 사용한 버튼의 기본 스타일
 * 컴포넌트에서 `baseButton` 클래스와 함께 적용되어야 합니다.
 */
export const buttonSprinkles = sprinkles({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderStyle: "none",
  borderRadius: "md",
  fontWeight: "semibold",
});

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
