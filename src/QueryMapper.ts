import BooleanParameter from './BooleanParameter'
import NumberParameter from './NumberParameter'
import QueryParameter from './QueryParameter'
import StringParameter from './StringParameter'

export default class QueryMapper {

	private params: QueryParameter[] = []
	private conditions: Record<string, string> = {}


	parse(query: any) {
		const result: Record<string, string> = {}

		this.params.forEach((parameter) => {
			Object.assign(
				result,
				{
					[parameter.name]: parameter.parse(query[parameter.urlName]),
				},
			)
		})

		for (const [conditionName, parameterName] of Object.entries(this.conditions)) {
			if (result[parameterName]) {
				Object.assign(
					result,
					{
						[conditionName]: true,
					}
				)
			}
		}

		return result
	}


	generateQuery(params: Record<string, string | number | boolean | null>): Record<string, string | number | null> {
		const result: Record<string, string | number | null> = {}
		const conditionValues: Record<string, string | number | null> = {}

		for (const [parameterName, parameterValue] of Object.entries(params)) {
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
		}

		for (const [conditionName, parameterName] of Object.entries(this.conditions)) {
			if (!conditionValues[conditionName]) {
				delete result[parameterName]
			}
		}

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


	addConditionFor(parameterName: string, conditionName: string): this {
		this.addBooleanParam(conditionName)

		this.conditions[conditionName] = parameterName

		return this
	}

}
