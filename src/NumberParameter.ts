import QueryParameter from './QueryParameter'

export default class NumberParameter implements QueryParameter {

	private readonly _name: string
	private readonly _urlName: string

	private defaultValue: number | null = null

	private options: number[] = []


	constructor(name: string, urlName: string | null = null) {
		this._name = name
		this._urlName = urlName ?? name
	}


	get name(): string {
		return this._name
	}


	get urlName(): string {
		return this._urlName
	}


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


	parse(value: string | undefined): number | null {
		const isUndefined = value === undefined
		const convertedValue = Number(value)

		if (isUndefined || (this.options.length && !this.options.includes(convertedValue))) {
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
