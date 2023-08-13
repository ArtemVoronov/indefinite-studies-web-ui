module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off"
  }
}