import { vars } from "@packages/vanilla-extract-config";

export type BackgroundOption = keyof typeof vars.color.background;

export type TextColorOption = keyof typeof vars.color.text;
