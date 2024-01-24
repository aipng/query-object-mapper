import NumberArrayParameter from '../src/NumberArrayParameter'

describe('Number array parameter', () => {

	describe('Parse number array parameter', () => {

		it('should set default parameters', () => {
			const parameter = new NumberArrayParameter('parameter')

			parameter.setDefault([101, 201])
		})

		it('should parse one value', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.parse('102')).toStrictEqual([102])
		})

		it('should parse values', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.parse('103,2003,30003')).toStrictEqual([103, 2003, 30003])
		})

		it('should return empty array as a default value for undefined parameter by default', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.parse(undefined)).toStrictEqual([])
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new NumberArrayParameter('parameter')

			const defaultValue = [104]

			parameter.setDefault(defaultValue)

			expect(parameter.parse(undefined)).toStrictEqual(defaultValue)
		})

		it('should throw error when default value is out of options', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(() => {
				parameter
					.setOptions([105, 205])
					.setDefault([305])
			}).toThrowError('\'305\' is not included in given options!')
		})

		it('should throw error when options do not cover default value', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(() => {
				parameter
					.setDefault([106])
					.setOptions([206, 306])
			}).toThrowError('Default value must be included in options!')
		})

		it('should whitelist parsed values', () => {
			const parameter = new NumberArrayParameter('parameter')
			parameter
				.setDefault([107])
				.setOptions([107, 207])

			expect(parameter.parse('175,207')).toStrictEqual([207])
		})

	})


	describe('should generate query value from parameter value', () => {

		it('should generate empty array from null', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.generate(null)).toBeNull()
		})

		it('should generate null from default value', () => {
			const parameter = new NumberArrayParameter('parameter')

			parameter.setDefault([101])

			expect(parameter.generate([101])).toBeNull()
		})

		it('should generate one value string', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.generate([102])).toStrictEqual('102')
		})

		it('should generate string from nubmer array', () => {
			const parameter = new NumberArrayParameter('parameter')

			expect(parameter.generate([103, 203, 303])).toStrictEqual('103,203,303')
		})

		it('should throw error when values are not between options', () => {
			const parameter = new NumberArrayParameter('parameter')

			parameter.setOptions([104, 204])

			expect(() => {
				parameter.generate([304, 404])
			}).toThrowError('\'304\' is not an option!')
		})

		it('should generate value from option value', () => {
			const parameter = new NumberArrayParameter('parameter')

			parameter.setOptions([105, 106])

			expect(parameter.generate([106])).toStrictEqual('106')
		})

		it('should generate null from default option value', () => {
			const parameter = new NumberArrayParameter('parameter')

			parameter.setOptions([107, 207, 307]).setDefault([107, 207])

			expect(parameter.generate([107, 207])).toBeNull()
		})

	})

})
