import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "./theme.css";

export const typography = recipe({
  variants: {
    role: {
      headingXxl: { ...vars.typography.heading.xxl },
      headingXl: { ...vars.typography.heading.xl },
      headingLg: { ...vars.typography.heading.lg },
      headingMd: { ...vars.typography.heading.md },
      headingSm: { ...vars.typography.heading.sm },
      headingXs: { ...vars.typography.heading.xs },
      textSmRegular: { ...vars.typography.text.sm.regular },
      textSmSemibold: { ...vars.typography.text.sm.semibold },
      textMdRegular: { ...vars.typography.text.md.semibold },
      textMdSemibold: { ...vars.typography.text.md.semibold },
      textLgRegular: { ...vars.typography.text.lg.regular },
      textLgSemibold: { ...vars.typography.text.lg.semibold },
      displaySm: { ...vars.typography.display.sm },
      displayMd: { ...vars.typography.display.md },
      displayLg: { ...vars.typography.display.lg },
      captionSm: { ...vars.typography.caption.sm },
      captionMd: { ...vars.typography.caption.md },
      overline: { ...vars.typography.overline },
      codeInline: { ...vars.typography.code.inline },
      codeBlock: { ...vars.typography.code.block },
    },
  },
});

export type TypographyVariants = RecipeVariants<typeof typography>;
