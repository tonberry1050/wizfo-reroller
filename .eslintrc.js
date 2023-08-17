module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
  },
  "plugins": [
    "@typescript-eslint",
    "react",
  ],
  "rules": {
    "no-console": 0,
    "max-len": [1, 150],
    "object-curly-newline": 0,
    "comma-dangle": 0,
    "import/prefer-default-export": 0,
    "no-await-in-loop": 0,
    "no-promise-executor-return": 0,
    "@typescript-eslint/dot-notation": 0,
    "@typescript-eslint/comma-dangle": 0,
  }
}
