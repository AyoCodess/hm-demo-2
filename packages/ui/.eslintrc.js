/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  include: [
    '@repo/tailwind-config/tailwind.config.js',
    '@repo/tailwind-config/postcss.config.js'
  ],
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
