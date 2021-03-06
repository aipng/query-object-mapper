import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

const isSameArray = (a: number[], b: number[]) =>
	a.length === b.length &&
	a.every((v, i) => v === b[i])

export default class NumberArrayParameter extends QueryParameterBase implements QueryParameter {

	private defaultValues: number[] = []

	private options: number[] = []


	get name(): string {
		return this._name
	}


	get urlName(): string {
		return this._urlName
	}


	setDefault(values: number[]): this {
		if (this.options.length) {
			values.forEach((value) => {
				if (!this.options.includes(value)) {
					throw new Error(`'${value}' is not included in given options!`)
				}
			})
		}

		this.defaultValues = values

		return this
	}


	setOptions(options: number[]): this {
		this.defaultValues.forEach(value => {
			if (!options.includes(value)) {
				throw new Error('Default value must be included in options!')
			}
		})

		this.options = options

		return this
	}


	parse(value: string | undefined): number[] {
		if (!value) {
			return this.defaultValues ?? []
		}

		let convertedValues = value.split(',').map(item => Number.parseInt(item))

		return this.options.length
			? convertedValues.filter(value => this.options.includes(value))
			: convertedValues
	}


	generate(values: number[] | null): string | null {
		if (values?.length && this.options.length) {
			values.forEach(value => {
				if (!this.options.includes(value)) {
					throw new Error(`'${value}' is not an option!`)
				}
			})
		}

		return values && !isSameArray(values, this.defaultValues)
			? values.join(',')
			: null
	}

}
