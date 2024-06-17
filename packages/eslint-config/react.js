/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "react/prop-types": "off",
  },
  globals: {
    React: "writable",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6, // or higher depending on the ECMAScript features you're using
    sourceType: 'module', // if you're using import/export statements
  },
};

module.exports = config;
