import BooleanParameter from '../src/BooleanParameter'

describe('Boolean parameter', () => {

	describe('Parse boolean parameter', () => {

		it('should parse string values correctly', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.parse('1')).toBeTruthy()
		})

		it('should return default value (false) for null', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.parse(null)).toBeFalsy()
		})

		it('should return default value (true) for null when default is set', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.parse(null)).toBeTruthy()
		})

		it('should return default value for array input', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.parse(['1', '0'])).toBeTruthy()
		})

		it('should return true for "1" and "true" strings', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.parse('1')).toBeTruthy()
			expect(parameter.parse('true')).toBeTruthy()
			expect(parameter.parse('0')).toBeFalsy()
			expect(parameter.parse('false')).toBeFalsy()
			expect(parameter.parse('anything')).toBeFalsy() // uses default value
		})

		it('should use default value for any non-boolean inputs', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.parse('a')).toBeTruthy()
			expect(parameter.parse('175')).toBeTruthy()
			expect(parameter.parse('')).toBeTruthy()
			expect(parameter.parse('   ')).toBeTruthy()
			expect(parameter.parse(['1'])).toBeTruthy()
			expect(parameter.parse(null)).toBeTruthy()
		})

		it('should return false as a default value for undefined parameter by default', () => {
			const parameter = new BooleanParameter('parameter')

			expect(parameter.parse(undefined)).toBeFalsy()
		})

		it('should return default value for undefined parameter', () => {
			const parameter = new BooleanParameter('parameter')

			parameter.setDefault(true)

			expect(parameter.parse(undefined)).toBeTruthy()
		})

		it('should throw error when setting options', () => {
			const parameter = new BooleanParameter('parameter')

			expect(() => parameter.setOptions()).toThrow('There\'s no sense to define options for boolean parameter!')
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

		it('should generate correct values when default is false', () => {
			const parameter = new BooleanParameter('parameter')
			parameter.setDefault(false)

			expect(parameter.generate(true)).toStrictEqual('1')
			expect(parameter.generate(false)).toBeNull()
		})

		it('should generate correct values when default is true', () => {
			const parameter = new BooleanParameter('parameter')
			parameter.setDefault(true)

			expect(parameter.generate(false)).toStrictEqual('0')
			expect(parameter.generate(true)).toBeNull()
		})
	})

	describe('Constructor and properties', () => {
		it('should set parameter name correctly', () => {
			const parameter = new BooleanParameter('testParam')

			expect(parameter.name).toBe('testParam')
		})

		it('should set URL parameter name correctly', () => {
			const parameter = new BooleanParameter('testParam', 'urlParam')

			expect(parameter.urlName).toBe('urlParam')
		})

		it('should use parameter name as URL name when not specified', () => {
			const parameter = new BooleanParameter('testParam')

			expect(parameter.urlName).toBe('testParam')
		})
	})

})
