module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "react/react-in-jsx-scope": 0,
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }
    ],
    semi: [2, "always"],
    indent: 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none"
      }
    ],
    "generator-star-spacing": ["error", { before: false, after: true }]

  },
};
