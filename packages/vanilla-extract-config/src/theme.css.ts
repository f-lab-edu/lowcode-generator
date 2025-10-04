import { createThemeContract } from "@vanilla-extract/css";
import { themeTokens } from "@packages/tokens/vanilla-extract";

// Create a contract with the shape of the tokens.
// This doesn't generate any CSS, just a typed object of variable names.
export const vars = createThemeContract(themeTokens);