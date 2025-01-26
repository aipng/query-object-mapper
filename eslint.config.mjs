import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import globals from 'globals'
import pluginVitest from '@vitest/eslint-plugin'

export default [
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts}'],
	},
	{
		name: 'app/files-to-ignore',
		ignores: ['**/dist/**', '*.json'],
	},
	{
		...pluginVitest.configs.recommended,
		files: ['src/**/__tests__/*'],
	},
	// TypeScript configuration
	...tsEslint.configs.recommended,
	{
		// Extending recommended rules
		...eslint.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
		// Rules configuration
		rules: {
			'no-console': 'error',
			'no-debugger': 'error',
			'indent': [
				'error',
				'tab',
				{
					'SwitchCase': 1,
				},
			],
			'linebreak-style': [
				'error',
				'windows',
			],
			'quotes': [
				'error',
				'single',
			],
			'semi': [
				'error',
				'never',
			],
		},
	},

	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// Test files configuration
	{
		files: ['**/tests/*.ts', '**/tests/unit/**/*.spec.ts'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
]
