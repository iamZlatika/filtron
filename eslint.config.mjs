import next from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{ts,tsx}"],
        ignores: [".next/**", "node_modules/**"],
        languageOptions: {
            parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            prettier,
            "simple-import-sort": simpleImportSort,
            "unused-imports": unusedImports,
            next,
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/consistent-type-imports": "error",

            // Не ругаться на _unused переменные
            "@typescript-eslint/no-unused-vars": [
                "error",
                {varsIgnorePattern: "^_", argsIgnorePattern: "^_"},
            ],

            "unused-imports/no-unused-imports": "error",

            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",

            "prettier/prettier": "error",
        },
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:prettier/recommended"
        ]
    },
]
;
