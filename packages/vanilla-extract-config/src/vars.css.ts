import { createGlobalTheme } from "@vanilla-extract/css";
import tokens from "@packages/tokens/build/json/index.json";
import { mapTokens } from "./utils/mapTokens";

export const vars: Record<string, any> = createGlobalTheme(
  ":root",
  mapTokens(tokens)
);
