import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

export default class StringParameter extends QueryParameterBase implements QueryParameter {

	private defaultValue: string | null = null

	private options: string[] = []


	setDefault(value: string): this {
		if (this.options.length && !this.options.includes(value)) {
			throw new Error(`'${value}' is not an option!`)
		}

		this.defaultValue = value

		return this
	}


	setOptions(options: string[]): this {
		if (this.defaultValue !== null && !options.includes(this.defaultValue)) {
			throw new Error('Default value must be included in options!')
		}

		this.options = options

		return this
	}


	parse(value: string | string[] | null | undefined): string | null {
		if (value === null || value === undefined || Array.isArray(value)) {
			return this.defaultValue
		}

		const trimmedValue = value.trim()

		if (trimmedValue === '') {
			return this.defaultValue
		}

		if (this.options.length && !this.options.includes(trimmedValue)) {
			return this.defaultValue
		}

		return trimmedValue
	}


	generate(value: string | null): string | null {
		if (value && this.options.length && !this.options.includes(value)) {
			throw new Error(`'${value}' is not an option!`)
		}

		return value !== this.defaultValue ? value : null
	}

}
