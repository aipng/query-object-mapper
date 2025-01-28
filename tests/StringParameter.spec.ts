import StringParameter from '../src/StringParameter'

describe('String parameter', () => {

	describe('Parse string parameter', () => {

		it('should parse string parameter', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse('value')).toBe('value')
		})

		it('should return null as a default value for undefined parameter by default', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse(undefined)).toBeNull()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new StringParameter('parameter')

			const defaultValue = 'default'

			parameter.setDefault(defaultValue)

			expect(parameter.parse(undefined)).toBe(defaultValue)
		})

		it('should throw error when default value is out of options', () => {
			const parameter = new StringParameter('parameter')

			expect(() => {
				parameter
					.setOptions(['foo', 'bar'])
					.setDefault('invalid')
			}).toThrow('\'invalid\' is not an option!')
		})

		it('should throw error when options do not cover default value', () => {
			const parameter = new StringParameter('parameter')

			expect(() => {
				parameter
					.setDefault('default')
					.setOptions(['foo', 'bar'])
			}).toThrow('Default value must be included in options!')
		})

		it('should return default value when parsing unknown value', () => {
			const parameter = new StringParameter('parameter')

			parameter
				.setDefault('default')
				.setOptions(['default'])

			expect(parameter.parse('unknown')).toBe('default')
		})

		it('should return default value (null) for null parameter', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse(null)).toBeNull()
		})

		it('should return default value for null parameter when default is set', () => {
			const parameter = new StringParameter('parameter')

			parameter.setDefault('default')

			expect(parameter.parse(null)).toBe('default')
		})

		it('should return default value for array input', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse(['value1', 'value2'])).toBeNull()
		})

		it('should return default value for array input when default is set', () => {
			const parameter = new StringParameter('parameter')

			parameter.setDefault('default')

			expect(parameter.parse(['value1', 'value2'])).toBe('default')
		})

		it('should return default value for array input even with valid option', () => {
			const parameter = new StringParameter('parameter')

			parameter
				.setDefault('default')
				.setOptions(['value1', 'default'])

			expect(parameter.parse(['value1'])).toBe('default')
		})

		it('should return default value for empty string', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse('')).toBeNull()
		})

		it('should return default value for whitespace string', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse('   ')).toBeNull()
		})

		it('should trim input value', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.parse('  value  ')).toBe('value')
		})

		it('should trim input value when checking options', () => {
			const parameter = new StringParameter('parameter')

			parameter
				.setDefault('default')
				.setOptions(['value', 'default'])

			expect(parameter.parse('  value  ')).toBe('value')
		})

		it('should return default value for empty string when default is set', () => {
			const parameter = new StringParameter('parameter')
			parameter.setDefault('default')

			expect(parameter.parse('')).toBe('default')
			expect(parameter.parse('   ')).toBe('default')
		})
	})

	describe('should generate query value from parameter value', () => {

		it('should generate null from null', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.generate(null)).toBeNull()
		})

		it('should generate null from default value', () => {
			const parameter = new StringParameter('parameter')

			parameter.setDefault('string')

			expect(parameter.generate('string')).toBeNull()
		})

		it('should generate value from value', () => {
			const parameter = new StringParameter('parameter')

			expect(parameter.generate('string')).toBe('string')
		})

		it('should throw error when value is not an option', () => {
			const parameter = new StringParameter('parameter')

			parameter.setOptions(['foo', 'bar'])

			expect(() => {
				parameter.generate('string')
			}).toThrow('\'string\' is not an option!')
		})

		it('should generate value from option value', () => {
			const parameter = new StringParameter('parameter')

			parameter.setOptions(['string'])

			expect(parameter.generate('string')).toBe('string')
		})

		it('should generate null from default option value', () => {
			const parameter = new StringParameter('parameter')

			parameter.setOptions(['string']).setDefault('string')

			expect(parameter.generate('string')).toBeNull()
		})

	})

})
