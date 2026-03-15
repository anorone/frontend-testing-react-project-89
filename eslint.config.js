// @ts-check

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDom from 'eslint-plugin-jest-dom'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
    plugins: {
      ...testingLibrary.configs['flat/react'].plugins,
      ...jestDom.configs['flat/recommended'].plugins,
    },
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      ...jestDom.configs['flat/recommended'].rules,
    }
  },
])
