module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json", extraFileExtensions: [".mjs"] },
  plugins: ["simple-import-sort", "import"],
  extends: ["@react-native-community", "prettier"],
  rules: {
    "no-console": ["error", { allow: ["warn", "info", "error"] }],

    // import
    "import/newline-after-import": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    // react
    "react/react-in-jsx-scope": "off",

    // @typescript-eslint
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
  },
};
