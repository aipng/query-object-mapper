import QueryMapper from '../src/QueryMapper'

describe('Query mapper', () => {

	describe('should parse query', () => {

		it('should parse no query definition into empty object', () => {
			const service = new QueryMapper()

			expect(service.parse({})).toStrictEqual({})
		})

		it('should parse query', () => {
			const testQuery = {
				stringParam: 'string',
				numberParam: '11',
				trueParam: '1',
				falseParam: '0',
			}

			const service = new QueryMapper()

			service.addStringParam('stringParam')
			service.addNumberParam('numberParam')
			service.addBooleanParam('trueParam')
			service.addBooleanParam('falseParam')

			expect(service.parse(testQuery)).toStrictEqual({
				stringParam: 'string',
				numberParam: 11,
				trueParam: true,
				falseParam: false,
			})
		})

		it('should parse query with default values', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam').setDefault('string')
			service.addNumberParam('numberParam').setDefault(10)
			service.addBooleanParam('falseParam')
			service.addBooleanParam('trueParam').setDefault(true)

			expect(service.parse({})).toStrictEqual({
				stringParam: 'string',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			})
		})

		it('should parse query parameters with options', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam').setDefault('string').setOptions(['string'])
			service.addNumberParam('numberParam').setDefault(10).setOptions([10])

			expect(service.parse({})).toStrictEqual({
				stringParam: 'string',
				numberParam: 10,
			})
		})

		it('should replace unknown parameter values with default', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam').setDefault('string').setOptions(['string'])
			service.addNumberParam('numberParam').setDefault(10).setOptions([10])

			const testQuery = {
				stringParam: 'invalid-option',
				numberParam: 1000,
			}

			expect(service.parse(testQuery)).toStrictEqual({
				stringParam: 'string',
				numberParam: 10,
			})
		})

		it('should parse parameter with aliased name', () => {
			const service = new QueryMapper()

			service.addBooleanParam('trialsOnly')
			service.addBooleanParam('dealsOnly', 'deals')

			const testQuery = {
				trialsOnly: '1',
				deals: '1',
			}

			expect(service.parse(testQuery)).toStrictEqual({
				trialsOnly: true,
				dealsOnly: true,
			})
		})

	})

	describe('should generate query object', () => {

		it('should generate empty query object by default', () => {
			const service = new QueryMapper()

			expect(service.generateQuery({})).toStrictEqual({})
		})

		it('should omit default parameters in query object', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam').setDefault('default')
			service.addStringParam('numberParam').setDefault(10)
			service.addStringParam('falseParam')
			service.addStringParam('trueParam').setDefault(true)

			const parameterObject = {
				stringParam: 'default',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should generate query object with parameters', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam')
			service.addNumberParam('numberParam')
			service.addBooleanParam('falseParam')
			service.addBooleanParam('trueParam')

			const parameterObject = {
				stringParam: 'default',
				numberParam: 10,
				falseParam: true,
				trueParam: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({
				stringParam: 'default',
				numberParam: 10,
				falseParam: '1',
				trueParam: '1',
			})
		})

		it('should generate query object with aliased parameters', () => {
			const service = new QueryMapper()

			service.addBooleanParam('dealsOnly', 'deals')
			service.addBooleanParam('trialsOnly', 'trials')

			const parameterObject = {
				dealsOnly: true,
				trialsOnly: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({
				deals: '1',
				trials: '1',
			})
		})

		it('should omit default values in given parameters in generated query object', () => {
			const service = new QueryMapper()

			service.addStringParam('stringParam').setDefault('default')
			service.addStringParam('numberParam').setDefault(10)
			service.addStringParam('falseParam')
			service.addStringParam('trueParam').setDefault(true)

			const parameterObject = {
				stringParam: 'default',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should limit generated parameters to defined only', () => {
			const service = new QueryMapper()

			const parameterObject = {
				foo: 1,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

	})

	describe('should manage conditional parameters', () => {

		it('should refuse to add condition for unknown parameter', () => {
			const service = new QueryMapper()

			expect(() => {
				service.addConditionFor('fulfilled', 'fulfilledCondition')
			}).toThrowError('Unknown parameter \'fulfilled\'!')
		})

	})

	describe('should parse conditional parameters', () => {

		it('should parse conditions', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			service.addStringParam('omitted')
			service.addConditionFor('omitted', 'omittedCondition')

			const queryObject = {
				fulfilled: 'foo',
			}

			expect(service.parse(queryObject)).toStrictEqual({
				fulfilled: 'foo',
				fulfilledCondition: true,
				omitted: null,
				omittedCondition: false,
			})
		})

		it('should parse empty conditional parameters', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const queryObject = {}

			expect(service.parse(queryObject)).toStrictEqual({
				fulfilled: null,
				fulfilledCondition: false,
			})
		})

		it('should parse aliased conditional parameters', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled', 'f')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const queryObject = {
				f: 'foo',
			}

			expect(service.parse(queryObject)).toStrictEqual({
				fulfilled: 'foo',
				fulfilledCondition: true,
			})
		})

	})

	describe('should generate conditional parameters', () => {

		it('should conditionally generate query parameter', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			service.addStringParam('omitted')
			service.addConditionFor('omitted', 'omittedCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: true,
				omitted: 'bar',
				omittedCondition: false,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({
				fulfilled: 'foo',
			})
		})

		it('should generate correct query for empty parameter with condition', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: null,
				fulfilledCondition: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should correctly generate aliased conditional parameter', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled', 'f')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: true,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({
				f: 'foo',
			})
		})

		it('should ignore conditional aliased parameter if condition not fulfilled', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled', 'f')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: false,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should ignore conditional aliased parameter with default value if condition not fulfilled', () => {
			const service = new QueryMapper()

			service.addStringParam('fulfilled', 'f').setDefault('default')
			service.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: false,
			}

			expect(service.generateQuery(parameterObject)).toStrictEqual({})
		})

	})

})
