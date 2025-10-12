// Size Types
export const SIZE_VARIANTS = ["sm", "md", "lg"] as const;
export type SizeVariant = (typeof SIZE_VARIANTS)[number];

// Color Types

// Role based
export const THEME_COLOR_VARIANTS = [
  "brand",
  "primary",
  "secondary",
  "tertiary",
] as const;
export type ThemeColorVariants = (typeof THEME_COLOR_VARIANTS)[number];

// 상태 based (info, warning, success, danger)
export const STATE_COLOR_VARIANTS = [
  "info",
  "success",
  "warning",
  "danger",
] as const;
export type StateColorVariants = (typeof STATE_COLOR_VARIANTS)[number];

// Theme + State color 통합
export const COLOR_VARIANTS = [
  ...THEME_COLOR_VARIANTS,
  ...STATE_COLOR_VARIANTS,
];

export type ColorVariants = (typeof COLOR_VARIANTS)[number];

// Alignment Variants
export const ALIGN_VARIANTS = ["left", "center", "right"] as const;
export type AlignVariant = (typeof ALIGN_VARIANTS)[number];
