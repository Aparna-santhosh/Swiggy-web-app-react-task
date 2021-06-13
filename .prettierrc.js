const { NoEmitOnErrorsPlugin } = require("webpack");

module.exports = {
  semi: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 4,
  singleQuote: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  semi: true,
  trailingComma: "none",
  parser: "typescript",
  overrides: [
    {
      files: "*.scss",
      options: {
        parser: "scss"
      }
    }
  ]
};
