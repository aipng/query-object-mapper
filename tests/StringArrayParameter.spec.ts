import StringArrayParameter from '../src/StringArrayParameter'

describe('StringArrayParameter', () => {

	describe('Parse string array parameter', () => {

		it('should parse one value', () => {
			const parameter = new StringArrayParameter('parameter')

			const input = 'foo'
			const result = [
				'foo',
			]

			expect(parameter.parse(input)).toStrictEqual(result)
		})

		it('should parse values', () => {
			const parameter = new StringArrayParameter('parameter')

			const input = 'foo,bar,Joe'
			const result = [
				'foo',
				'bar',
				'Joe',
			]

			expect(parameter.parse(input)).toStrictEqual(result)
		})

		it('should return empty array as a default value for undefined parameter', () => {
			const parameter = new StringArrayParameter('parameter')

			expect(parameter.parse(undefined)).toStrictEqual([])
		})

		it('should return default value if no value is provided', () => {
			const param = new StringArrayParameter('parameter')

			param.setDefault(['a', 'b'])

			expect(param.parse(null)).toEqual(['a', 'b'])
			expect(param.parse(undefined)).toEqual(['a', 'b'])
		})

		it('should parse a comma-separated string into an array of strings', () => {
			const param = new StringArrayParameter('test')

			expect(param.parse('a,b,c')).toEqual(['a', 'b', 'c'])
		})

		it('should parse an array of strings', () => {
			const param = new StringArrayParameter('test')

			expect(param.parse(['x', 'y', 'z'])).toEqual(['x', 'y', 'z'])
		})

		it('should filter out null and empty values from an array', () => {
			const param = new StringArrayParameter('test')

			expect(param.parse(['a', null, '', 'b'])).toEqual(['a', 'b'])
		})

		it('should whitelist parsed values', () => {
			const param = new StringArrayParameter('test')
			param.setOptions(['a', 'b', 'c'])

			expect(param.parse('a,d,b')).toEqual(['a', 'b'])
			expect(param.parse(['a', 'd', 'b'])).toEqual(['a', 'b'])
		})

		it('should return default values if parsed array is empty or filtered out by options', () => {
			const param = new StringArrayParameter('test')
			param.setDefault(['default1', 'default2'])

			expect(param.parse('')).toEqual(['default1', 'default2'])

			const paramWithOptions = new StringArrayParameter('test')
			paramWithOptions
				.setOptions(['a', 'b'])
				.setDefault(['a'])

			expect(paramWithOptions.parse('d,e')).toEqual(['a']) // 'd', 'e' are filtered out, so default 'a' is returned
		})

		it('should handle array with nulls', () => {
			const parameter = new StringArrayParameter('parameter')

			expect(parameter.parse(['foo', null, 'bar'])).toStrictEqual(['foo', 'bar'])
		})

		it('should handle array with nulls and options', () => {
			const parameter = new StringArrayParameter('parameter')
			parameter.setOptions(['foo', 'bar'])

			expect(parameter.parse(['foo', null, 'Joe'])).toStrictEqual(['foo'])
		})
	})

	describe('should handle option setting', () => {

		it('should throw error if setting default values not in options', () => {
			const param = new StringArrayParameter('test')
			param.setOptions(['a', 'b'])

			expect(() => param.setDefault(['c'])).toThrow('\'c\' is not included in given options!')
		})

		it('should throw error when options do not cover default value', () => {
			const param = new StringArrayParameter('test')
			param.setDefault(['a'])

			expect(() => param.setOptions(['b'])).toThrow('Default value must be included in options!')
		})

	})


	describe('generate values', () => {

		it('should return null if input is null or empty', () => {
			const param = new StringArrayParameter('test')

			expect(param.generate(null)).toBeNull()
			expect(param.generate([])).toBeNull()
		})

		it('should generate null for default value', () => {
			const parameter = new StringArrayParameter('parameter')

			parameter.setDefault(['foo'])

			expect(parameter.generate(['foo'])).toBeNull()
		})

		it('should generate one value string', () => {
			const parameter = new StringArrayParameter('parameter')

			expect(parameter.generate(['foo'])).toBe('foo')
		})

		it('should generate comma separated string from array', () => {
			const parameter = new StringArrayParameter('parameter')

			expect(parameter.generate(['foo', 'bar', 'Joe'])).toBe('foo,bar,Joe')
		})

		it('should generate value included in options', () => {
			const parameter = new StringArrayParameter('parameter')

			parameter.setOptions(['foo', 'bar'])

			expect(parameter.generate(['bar'])).toBe('bar')
		})

		it('should throw error if values are not included in options', () => {
			const param = new StringArrayParameter('test')
			param.setOptions(['a', 'b'])

			expect(() => param.generate(['c'])).toThrow('\'c\' is not an option!')
		})

		it('should handle empty options correctly', () => {
			const param = new StringArrayParameter('test')
			param.setDefault(['x', 'y'])

			expect(param.parse('a,b')).toEqual(['a', 'b'])
			expect(param.generate(['c', 'd'])).toBe('c,d')
		})

	})

})
