import QueryParameter from './QueryParameter'

export default class StringParameter implements QueryParameter {

	private readonly _name: string
	private readonly _urlName: string

	private defaultValue: string | null = null

	private options: string[] = []


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


	parse(value: string | undefined): string | null {
		const isUndefined = value === undefined

		if (isUndefined || (this.options.length && !this.options.includes(value))) {
			return this.defaultValue
		}

		return value
	}


	generate(value: string | null): string | null {
		if (value && this.options.length && !this.options.includes(value)) {
			throw new Error(`'${value}' is not an option!`)
		}

		return value !== this.defaultValue ? value : null
	}

}
