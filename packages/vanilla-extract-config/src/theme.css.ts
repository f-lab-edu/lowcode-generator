import { createThemeContract } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/vanilla-extract";

export const vars = createThemeContract(themeTokens);
