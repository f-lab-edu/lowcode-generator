const sharedConfig = require("@packages/tailwind-config");

module.exports = {
  presets: [sharedConfig],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
