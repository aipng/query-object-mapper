import NumberParameter from '../src/NumberParameter'

describe('Number parameter', () => {

	describe('Parse number parameter', () => {

		it('should parse number parameter', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.parse('10')).toBe(10)
		})

		it('should return null as a default value for undefined parameter by default', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.parse(undefined)).toBeNull()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new NumberParameter('parameter')

			const defaultValue = 10

			parameter.setDefault(defaultValue)

			expect(parameter.parse(undefined)).toBe(defaultValue)
		})

		it('should throw error when default value is out of options', () => {
			const parameter = new NumberParameter('parameter')

			expect(() => {
				parameter
					.setOptions([10, 20])
					.setDefault(0)
			}).toThrow('\'0\' is not an option!')
		})

		it('should throw error when options do not cover default value', () => {
			const parameter = new NumberParameter('parameter')

			expect(() => {
				parameter
					.setDefault(10)
					.setOptions([20, 30])
			}).toThrow('Default value must be included in options!')
		})

		it('should return default value when parsing unknown value', () => {
			const parameter = new NumberParameter('parameter')
			parameter
				.setDefault(10)
				.setOptions([10])

			expect(parameter.parse('175')).toBe(10)
		})

		it('should return default value (null) for null parameter', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.parse(null)).toBeNull()
		})

		it('should return default value for null parameter when default is set', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setDefault(42)

			expect(parameter.parse(null)).toBe(42)
		})

		it('should return default value for array input', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.parse(['123', '456'])).toBeNull()
		})

		it('should return default value for array input when default is set', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setDefault(42)

			expect(parameter.parse(['123', '456'])).toBe(42)
		})

		it('should return default value for array input even with valid option', () => {
			const parameter = new NumberParameter('parameter')

			parameter
				.setDefault(42)
				.setOptions([123, 42])

			expect(parameter.parse(['123'])).toBe(42)
		})
	})


	describe('should generate query value from parameter value', () => {

		it('should generate null from null', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.generate(null)).toBeNull()
		})

		it('should generate null from default value', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setDefault(10)

			expect(parameter.generate(10)).toBeNull()
		})

		it('should generate value from value', () => {
			const parameter = new NumberParameter('parameter')

			expect(parameter.generate(10)).toBe(10)
		})

		it('should throw error when value is not an option', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10, 20])

			expect(() => {
				parameter.generate(30)
			}).toThrow('\'30\' is not an option!')
		})

		it('should generate value from option value', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10])

			expect(parameter.generate(10)).toBe(10)
		})

		it('should generate null from default option value', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10]).setDefault(10)

			expect(parameter.generate(10)).toBeNull()
		})

	})

})
