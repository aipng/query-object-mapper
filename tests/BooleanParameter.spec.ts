import BooleanParameter from '../src/BooleanParameter'

describe('Boolean parameter', () => {

	describe('Parse boolean parameter', () => {

		it('should set default parameter', () => {
			const parameter = new BooleanParameter('booleanParameter')

			parameter.setDefault(true)
		})

		it('should parse boolean parameter', () => {
			const parameter = new BooleanParameter('booleanParameter')

			expect(parameter.parse('1')).toBeTruthy()
		})

		it('should return false as a default value for undefined parameter by default', () => {
			const parameter = new BooleanParameter('booleanParameter')

			expect(parameter.parse(undefined)).toBeFalsy()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new BooleanParameter('booleanParameter')

			parameter.setDefault(true)

			expect(parameter.parse(undefined)).toBeTruthy()
		})

		it('should throw error when setting options', () => {
			const parameter = new BooleanParameter('booleanParameter')

			expect(() => {
				parameter.setOptions([10, 20])
			}).toThrowError('There\'s no sense to define options for boolean parameter!')
		})

		it('should return true for any positive value', () => {
			const parameter = new BooleanParameter('booleanParameter')
			parameter.setDefault(true)

			expect(parameter.parse('1')).toBeTruthy()
			expect(parameter.parse('a')).toBeTruthy()
			expect(parameter.parse('175')).toBeTruthy()
			expect(parameter.parse('0')).toBeFalsy()
		})
	})


	describe('Generate query value from parameter value', () => {

		it('should generate null as default value by default', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.generate(false)).toBeNull()
		})

		it('should generate null from default value', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.generate(true)).toBeNull()
		})

		it('should generate \'1\' for boolean value', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.generate(true)).toStrictEqual('1')
		})

		it('should generate \'0\' for boolean value', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.generate(false)).toStrictEqual('0')
		})

	})

})
