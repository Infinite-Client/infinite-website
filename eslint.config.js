// eslint.config.js
import globals from 'globals'
import eslintJs from '@eslint/js'
import tseslintParser from '@typescript-eslint/parser' // parserを直接インポート
import tseslintPlugin from '@typescript-eslint/eslint-plugin' // pluginを直接インポート
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    // ignore patterns
    ignores: ['build/', 'node_modules/', '.docusaurus/', '!.eslintrc.js', '!.prettierrc.js'],
  },
  eslintJs.configs.recommended, // ESLint core recommended rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        ...globals.jest,
        JSX: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    // React plugin setup (applies to both JS and TS files)
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslintPlugin, // TypeScript ESLint Plugin
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Custom rules from .eslintrc.js
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // TypeScript rules that should apply to all JS/TS files
      ...tseslintPlugin.configs['eslint-recommended'].rules, // Disable core ESLint rules that conflict with TypeScript
      ...tseslintPlugin.configs.recommended.rules, // Recommended TypeScript rules
    },
  },
  {
    // TypeScript specific files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslintParser, // Use TypeScript parser for TS files
      parserOptions: {
        project: ['./tsconfig.json'], // Specify tsconfig.json for type-aware linting
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      // Custom TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  prettierRecommended, // Prettier integration
]
