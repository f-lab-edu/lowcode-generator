import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { themeTokens, type ThemeTokens } from "@packages/tokens/vanilla-extract";

export const vars = createThemeContract(themeTokens as ThemeTokens);

createGlobalTheme(':root', vars, themeTokens);

export type ThemeVars = typeof vars;
