module.exports = {
	globals: {
		'ts-jest': {
			'tsconfig': 'tsconfig.json',
		},
	},
	moduleFileExtensions: [
		'js',
		'ts',
	],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testMatch: [
		'**/tests/**/*.spec.ts',
	],
}
