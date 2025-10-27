import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import mdx from "eslint-plugin-mdx";
import reactCompiler from "eslint-plugin-react-compiler";
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-compiler": reactCompiler,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "react*",
              group: "external",
              position: "before",
            },
            {
              pattern: "@hooks/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@pages/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@components/*",
              group: "internal",
              position: "after",
            },
          ],
        },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    ignores: ["dist/**", "build/**"],
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.mdx"],
    plugins: { mdx },
    extends: ["plugin:mdx/recommended"],
    rules: {
      "react/jsx-no-undef": "off",
      "react/jsx-filename-extension": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-fragments": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/no-unknown-property": "off",
    },
  },
];
