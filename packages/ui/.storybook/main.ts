import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/components/**/*.stories.@(ts|tsx)"],
  // staticDirs: ["../public"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vanillaExtractPlugin()],
    });
  },
};

export default config;
