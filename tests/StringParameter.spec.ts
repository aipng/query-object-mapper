import StringParameter from '../src/StringParameter'

describe('String parameter', () => {

	describe('Parse string parameter', () => {

		it('should set default parameter', () => {
			const parameter = new StringParameter('stringParameter')

			parameter.setDefault('default')
		})

		it('should parse string parameter', () => {
			const parameter = new StringParameter('stringParameter')

			expect(parameter.parse('value')).toStrictEqual('value')
		})

		it('should return null as a default value for undefined parameter by default', () => {
			const parameter = new StringParameter('stringParameter')

			expect(parameter.parse(undefined)).toBeNull()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new StringParameter('stringParameter')

			const defaultValue = 'default'

			parameter.setDefault(defaultValue)

			expect(parameter.parse(undefined)).toStrictEqual(defaultValue)
		})

		it('should throw error when default value is out of options', () => {
			const parameter = new StringParameter('stringParameter')

			expect(() => {
				parameter
					.setOptions(['foo', 'bar'])
					.setDefault('default')
			}).toThrowError('\'default\' is not an option!')
		})

		it('should throw error when options do not cover default value', () => {
			const parameter = new StringParameter('stringParameter')

			expect(() => {
				parameter
					.setDefault('default')
					.setOptions(['foo', 'bar'])
			}).toThrowError('Default value must be included in options!')
		})

		it('should return default value when parsing unknown value', () => {
			const parameter = new StringParameter('stringParameter')

			parameter
				.setDefault('default')
				.setOptions(['default'])

			expect(parameter.parse('unknown')).toStrictEqual('default')
		})
	})

	describe('should generate query value from parameter value', () => {

		it('should generate null from null', () => {
			const parameter = new StringParameter('stringParameter')

			expect(parameter.generate(null)).toBeNull()
		})

		it('should generate null from default value', () => {
			const parameter = new StringParameter('stringParameter')

			parameter.setDefault('string')

			expect(parameter.generate('string')).toBeNull()
		})

		it('should generate value from value', () => {
			const parameter = new StringParameter('stringParameter')

			expect(parameter.generate('string')).toStrictEqual('string')
		})

		it('should throw error when value is not an option', () => {
			const parameter = new StringParameter('stringParameter')

			parameter.setOptions(['foo', 'bar'])

			expect(() => {
				parameter.generate('string')
			}).toThrowError('\'string\' is not an option!')
		})

		it('should generate value from option value', () => {
			const parameter = new StringParameter('stringParameter')

			parameter.setOptions(['string'])

			expect(parameter.generate('string')).toStrictEqual('string')
		})

		it('should generate null from default option value', () => {
			const parameter = new StringParameter('stringParameter')

			parameter.setOptions(['string']).setDefault('string')

			expect(parameter.generate('string')).toBeNull()
		})

	})

})
