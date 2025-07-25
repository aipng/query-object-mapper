import BooleanParameter from './BooleanParameter'
import NumberArrayParameter from './NumberArrayParameter'
import NumberParameter from './NumberParameter'
import QueryParameter from './QueryParameter'
import StringArrayParameter from './StringArrayParameter'
import StringParameter from './StringParameter'


interface ConditionDefinition {
	parameterName: string
	parameterUrlName: string
}


export default class QueryMapper {

	private params: QueryParameter[] = []
	private conditions: Record<string, ConditionDefinition> = {}


	parse(query: Record<string, string | null | Array<string | null>>): Record<string, unknown> {
		const result: Record<string, unknown> = {}

		this.params.forEach((parameter) => {
			const value = query[parameter.urlName]

			Object.assign(
				result,
				{
					[parameter.name]: parameter.parse(value),
				},
			)
		})

		Object
			.entries(this.conditions)
			.forEach(([conditionName, definition]) => {
				if (result[definition.parameterName]) {
					Object.assign(
						result,
						{
							[conditionName]: true,
						},
					)
				}
			})

		return result
	}


	generateQuery(params: Record<string, unknown>): Record<string, string | number | null> {
		const result: Record<string, string | number | null> = {}
		const conditionValues: Record<string, string | number | null> = {}

		Object
			.entries(params)
			.forEach(([parameterName, parameterValue]) => {
				const parameter = this.params.find(item => item.name === parameterName)

				if (parameter) {
					const generatedValue = parameter.generate(parameterValue)

					if (generatedValue) {
						if (this.conditions[parameter.urlName] === undefined) {
							result[parameter.urlName] = generatedValue
						} else {
							conditionValues[parameter.urlName] = generatedValue
						}
					}
				}
			})

		Object
			.entries(this.conditions)
			.forEach(([conditionName, definition]) => {
				if (!conditionValues[conditionName]) {
					delete result[definition.parameterUrlName]
				}
			})

		return result
	}


	addStringParam(name: string, urlName: string | null = null): QueryParameter {
		const parameter = new StringParameter(name, urlName)

		this.params.push(parameter)

		return parameter
	}


	addNumberParam(name: string, urlName: string | null = null): QueryParameter {
		const parameter = new NumberParameter(name, urlName)

		this.params.push(parameter)

		return parameter
	}


	addBooleanParam(name: string, urlName: string | null = null): QueryParameter {
		const parameter = new BooleanParameter(name, urlName)

		this.params.push(parameter)

		return parameter
	}


	/** @deprecated */
	addArrayParam(name: string, urlName: string | null = null, type: 'number' | 'string' = 'number'): QueryParameter {
		if (type === 'string') {
			return this.addStringArrayParam(name, urlName)
		} else {
			return this.addNumberArrayParam(name, urlName)
		}
	}

	addStringArrayParam(name: string, urlName: string | null = null): QueryParameter {
		const parameter = new StringArrayParameter(name, urlName)

		this.params.push(parameter)

		return parameter
	}

	addNumberArrayParam(name: string, urlName: string | null = null): QueryParameter {
		const parameter = new NumberArrayParameter(name, urlName)

		this.params.push(parameter)

		return parameter
	}


	addConditionFor(parameterName: string, conditionName: string): this {
		const parameter = this.params.find(parameter => parameter.name === parameterName)

		if (!parameter) {
			throw new Error(`Unknown parameter '${parameterName}'!`)
		}

		this.addBooleanParam(conditionName)

		this.conditions[conditionName] = {
			parameterName: parameter.name,
			parameterUrlName: parameter.urlName,
		}

		return this
	}

}
