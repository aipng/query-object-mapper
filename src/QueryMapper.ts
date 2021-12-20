import BooleanParameter from './BooleanParameter'
import NumberParameter from './NumberParameter'
import QueryParameter from './QueryParameter'
import StringParameter from './StringParameter'

export default class QueryMapper {

	private params: QueryParameter[] = []


	parse(query: any) {
		const result = {}

		this.params.forEach((parameter) => {
			Object.assign(result, {
				[parameter.name]: parameter.parse(query[parameter.urlName]),
			})
		})

		return result
	}


	generateQuery(params: Record<string, string | number | boolean | null>): Record<string, string | number | null> {
		const result: Record<string, string | number | null> = {}

		for (const [parameterName, parameterValue] of Object.entries(params)) {
			const parameter = this.params.find(item => item.name === parameterName)

			if (parameter) {
				const generatedValue = parameter.generate(parameterValue)

				if (generatedValue) {
					result[parameter.urlName] = generatedValue
				}
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
}
