import { tanstackConfig } from '@tanstack/eslint-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  ...tanstackConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
        },
      ],
    },
  },
];
