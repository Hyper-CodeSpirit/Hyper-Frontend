import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginClass from "eslint-plugin-class";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Enforce class components for JSX files
      "react/prefer-stateless-function": ["error", { ignorePureComponents: true }],
      "react/no-functional-set-state": "error",
      "react/no-this-in-sfc": "error",
      
      // Ensure ordering inside class components: variables → hooks → functions
      "class/methods-use-this": "off", // Allow class methods that don’t use 'this'
      "sort-class-members/sort-class-members": [
        "error",
        {
          order: [
            "field",
            "constructor",
            "lifecycle",
            "everything-else",
            "render"
          ],
          groups: {
            field: [{ type: "property" }],
            constructor: [{ kind: "constructor" }],
            lifecycle: [
              { name: "componentDidMount" },
              { name: "componentDidUpdate" },
              { name: "componentWillUnmount" }
            ],
            render: [{ name: "render" }],
          },
        }
      ],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.recommended,
];