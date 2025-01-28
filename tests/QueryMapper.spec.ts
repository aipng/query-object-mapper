import QueryMapper from '../src/QueryMapper'

describe('Query mapper', () => {

	describe('should parse query', () => {

		it('should parse no query definition into empty object', () => {
			const mapper = new QueryMapper()

			expect(mapper.parse({})).toStrictEqual({})
		})

		it('should parse query', () => {
			const testQuery = {
				stringParam: 'value',
				numberParam: '10',
				trueParam: '1',
				falseParam: '0',
				numberOptions: '10,20',
			}

			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam')
			mapper.addNumberParam('numberParam')
			mapper.addBooleanParam('trueParam')
			mapper.addBooleanParam('falseParam')
			mapper.addArrayParam('numberOptions')

			expect(mapper.parse(testQuery)).toStrictEqual({
				stringParam: 'value',
				numberParam: 10,
				trueParam: true,
				falseParam: false,
				numberOptions: [10, 20],
			})
		})

		it('should parse query with default values', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam').setDefault('value')
			mapper.addNumberParam('numberParam').setDefault(10)
			mapper.addBooleanParam('falseParam')
			mapper.addBooleanParam('trueParam').setDefault(true)

			expect(mapper.parse({})).toStrictEqual({
				stringParam: 'value',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			})
		})

		it('should parse query parameters with options', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam').setDefault('value').setOptions(['value'])
			mapper.addNumberParam('numberParam').setDefault(10).setOptions([10])

			expect(mapper.parse({})).toStrictEqual({
				stringParam: 'value',
				numberParam: 10,
			})
		})

		it('should replace unknown parameter values with default', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam').setDefault('value').setOptions(['value'])
			mapper.addNumberParam('numberParam').setDefault(10).setOptions([10])

			const testQuery = {
				stringParam: 'invalid-option',
				numberParam: '1000',
			}

			expect(mapper.parse(testQuery)).toStrictEqual({
				stringParam: 'value',
				numberParam: 10,
			})
		})

		it('should parse parameter with aliased name', () => {
			const mapper = new QueryMapper()

			mapper.addBooleanParam('trialsOnly')
			mapper.addBooleanParam('dealsOnly', 'deals')

			const testQuery = {
				trialsOnly: '1',
				deals: '1',
			}

			expect(mapper.parse(testQuery)).toStrictEqual({
				trialsOnly: true,
				dealsOnly: true,
			})
		})

	})

	describe('should generate query object', () => {

		it('should generate empty query object by default', () => {
			const mapper = new QueryMapper()

			expect(mapper.generateQuery({})).toStrictEqual({})
		})

		it('should omit default parameters in query object', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam').setDefault('default')
			mapper.addStringParam('numberParam').setDefault(10)
			mapper.addStringParam('falseParam')
			mapper.addStringParam('trueParam').setDefault(true)

			const parameterObject = {
				stringParam: 'default',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should generate query object with parameters', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam')
			mapper.addNumberParam('numberParam')
			mapper.addBooleanParam('falseParam')
			mapper.addBooleanParam('trueParam')
			mapper.addArrayParam('numberOptions')

			const parameterObject = {
				stringParam: 'value',
				numberParam: 10,
				falseParam: true,
				trueParam: true,
				numberOptions: [12, 22],
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({
				stringParam: 'value',
				numberParam: 10,
				falseParam: '1',
				trueParam: '1',
				numberOptions: '12,22',
			})
		})

		it('should generate query object with aliased parameters', () => {
			const mapper = new QueryMapper()

			mapper.addBooleanParam('dealsOnly', 'deals')
			mapper.addBooleanParam('trialsOnly', 'trials')

			const parameterObject = {
				dealsOnly: true,
				trialsOnly: true,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({
				deals: '1',
				trials: '1',
			})
		})

		it('should omit default values in given parameters in generated query object', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('stringParam').setDefault('default')
			mapper.addStringParam('numberParam').setDefault(10)
			mapper.addStringParam('falseParam')
			mapper.addStringParam('trueParam').setDefault(true)

			const parameterObject = {
				stringParam: 'default',
				numberParam: 10,
				falseParam: false,
				trueParam: true,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should limit generated parameters to defined only', () => {
			const mapper = new QueryMapper()

			const parameterObject = {
				foo: 1,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

	})

	describe('should manage conditional parameters', () => {

		it('should refuse to add condition for unknown parameter', () => {
			const mapper = new QueryMapper()

			expect(() => {
				mapper.addConditionFor('fulfilled', 'fulfilledCondition')
			}).toThrow('Unknown parameter \'fulfilled\'!')
		})

	})

	describe('should parse conditional parameters', () => {

		it('should parse conditions', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			mapper.addStringParam('omitted')
			mapper.addConditionFor('omitted', 'omittedCondition')

			const queryObject = {
				fulfilled: 'value',
			}

			expect(mapper.parse(queryObject)).toStrictEqual({
				fulfilled: 'value',
				fulfilledCondition: true,
				omitted: null,
				omittedCondition: false,
			})
		})

		it('should parse empty conditional parameters', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const queryObject = {}

			expect(mapper.parse(queryObject)).toStrictEqual({
				fulfilled: null,
				fulfilledCondition: false,
			})
		})

		it('should parse aliased conditional parameters', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled', 'f')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const queryObject = {
				f: 'value',
			}

			expect(mapper.parse(queryObject)).toStrictEqual({
				fulfilled: 'value',
				fulfilledCondition: true,
			})
		})

	})

	describe('should generate conditional parameters', () => {

		it('should conditionally generate query parameter', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			mapper.addStringParam('omitted')
			mapper.addConditionFor('omitted', 'omittedCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: true,
				omitted: 'bar',
				omittedCondition: false,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({
				fulfilled: 'foo',
			})
		})

		it('should generate correct query for empty parameter with condition', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: null,
				fulfilledCondition: true,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should correctly generate aliased conditional parameter', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled', 'f')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: true,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({
				f: 'foo',
			})
		})

		it('should ignore conditional aliased parameter if condition not fulfilled', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled', 'f')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: false,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

		it('should ignore conditional aliased parameter with default value if condition not fulfilled', () => {
			const mapper = new QueryMapper()

			mapper.addStringParam('fulfilled', 'f').setDefault('default')
			mapper.addConditionFor('fulfilled', 'fulfilledCondition')

			const parameterObject = {
				fulfilled: 'foo',
				fulfilledCondition: false,
			}

			expect(mapper.generateQuery(parameterObject)).toStrictEqual({})
		})

	})

})
