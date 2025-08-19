import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

const BRAND_HEXES = ['#C19A6B', '#8B0000', '#FDF6EC', '#1C1C1C', '#3B7A57']

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
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
      // Warn if using a hex color not in the brand list
      'no-restricted-syntax': [
        'warn',
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,6}/]",
          message: 'Use brand palette only (#C19A6B, #8B0000, #FDF6EC, #1C1C1C, #3B7A57) or a named token/class.',
        },
      ],
    },
  },
])
