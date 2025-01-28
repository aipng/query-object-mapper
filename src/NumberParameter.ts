import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

export default class NumberParameter extends QueryParameterBase implements QueryParameter {

	private defaultValue: number | null = null

	private options: number[] = []


	setDefault(value: number): this {
		if (this.options.length && !this.options.includes(value)) {
			throw new Error(`'${value}' is not an option!`)
		}

		this.defaultValue = value

		return this
	}


	setOptions(options: number[]): this {
		if (this.defaultValue !== null && !options.includes(this.defaultValue)) {
			throw new Error('Default value must be included in options!')
		}

		this.options = options

		return this
	}


	parse(value: string | null | Array<string|null> | undefined): number | null {
		if (value === null || value === undefined) {
			return this.defaultValue
		}

		if (Array.isArray(value)) {
			return this.defaultValue
		}

		const convertedValue = Number(value)

		if (this.options.length && !this.options.includes(convertedValue)) {
			return this.defaultValue
		}

		return convertedValue
	}


	generate(value: number | null): number | null {
		if (value && this.options.length && !this.options.includes(value)) {
			throw new Error(`'${value}' is not an option!`)
		}

		return value !== this.defaultValue ? value : null
	}

}
