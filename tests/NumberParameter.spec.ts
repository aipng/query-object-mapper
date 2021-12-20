import NumberParameter from '../src/NumberParameter'

describe('Number parameter', () => {

	describe('Parse number parameter', () => {

		it('should set default parameter', () => {
			const parameter = new NumberParameter('numberParameter')

			parameter.setDefault(10)
		})

		it('should parse number parameter', () => {
			const parameter = new NumberParameter('numberParameter')

			expect(parameter.parse('10')).toStrictEqual(10)
		})

		it('should return null as a default value for undefined parameter by default', () => {
			const parameter = new NumberParameter('numberParameter')

			expect(parameter.parse(undefined)).toBeNull()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new NumberParameter('numberParameter')

			const defaultValue = 10

			parameter.setDefault(defaultValue)

			expect(parameter.parse(undefined)).toStrictEqual(defaultValue)
		})

		it('should throw error when default value is out of options', () => {
			const parameter = new NumberParameter('numberParameter')

			expect(() => {
				parameter
					.setOptions([10, 20])
					.setDefault(0)
			}).toThrowError('\'0\' is not an option!')
		})

		it('should throw error when options do not cover default value', () => {
			const parameter = new NumberParameter('numberParameter')

			expect(() => {
				parameter
					.setDefault(10)
					.setOptions([20, 30])
			}).toThrowError('Default value must be included in options!')
		})

		it('should return default value when parsing unknown value', () => {
			const parameter = new NumberParameter('numberParameter')
			parameter
				.setDefault(10)
				.setOptions([10])

			expect(parameter.parse('175')).toStrictEqual(10)
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

			expect(parameter.generate(10)).toStrictEqual(10)
		})

		it('should throw error when value is not an option', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10, 20])

			expect(() => {
				parameter.generate(30)
			}).toThrowError('\'30\' is not an option!')
		})

		it('should generate value from option value', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10])

			expect(parameter.generate(10)).toStrictEqual(10)
		})

		it('should generate null from default option value', () => {
			const parameter = new NumberParameter('parameter')

			parameter.setOptions([10]).setDefault(10)

			expect(parameter.generate(10)).toBeNull()
		})

	})

})
