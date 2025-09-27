const StyleDictionary = require("style-dictionary");

function getStyleDictionaryConfig() {
  return {
    source: ["src/**/*.json"],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        files: [
          {
            destination: "variables.css",
            format: "css/variables",
          },
        ],
      },
      js: {
        transformGroup: "js",
        buildPath: "build/js/",
        files: [
          {
            destination: "index.js",
            format: "javascript/module",
          },
          {
            destination: "index.d.ts",
            format: "typescript/module-declarations",
          },
        ],
      },
    },
  };
}

function buildTokens() {
  console.log("Building design tokens...");
  const config = getStyleDictionaryConfig();
  const sd = StyleDictionary.extend(config);
  sd.buildAllPlatforms();
  console.log("Design tokens built successfully!");
}

module.exports = { buildTokens };
