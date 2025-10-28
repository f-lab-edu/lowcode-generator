import { createThemeContract } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/design-tokens";

export const vars = createThemeContract(themeTokens);
