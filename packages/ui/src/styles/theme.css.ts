import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "@packages/vanilla-extract-config";
import { themeTokens } from "@packages/tokens/vanilla-extract";

createGlobalTheme(":root", vars, themeTokens);
