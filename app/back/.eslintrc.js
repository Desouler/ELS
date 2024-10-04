module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/prefer-for-of": "off",
    "comma-dangle": "off",
    "no-console": "off",
    "no-empty": "off",
    "no-empty-function": "off",
    radix: "off",
  },
};
