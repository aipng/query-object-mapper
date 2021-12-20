import QueryParameter from './QueryParameter'

export default class BooleanParameter implements QueryParameter {

	private readonly _name: string
	private readonly _urlName: string

	private defaultValue = false


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


	isString(): boolean {
		return false
	}


	isNumber(): boolean {
		return false
	}


	isBoolean(): boolean {
		return true
	}


	setDefault(value: boolean): this {
		this.defaultValue = value

		return this
	}


	setOptions(options: unknown[]): this {
		throw new Error('There\'s no sense to define options for boolean parameter!')
	}


	parse(value: string | undefined): boolean {
		if (value === undefined) {
			return this.defaultValue
		}

		return value !== '0'
	}


	generate(value: boolean): string | null {
		if (this.defaultValue === value) {
			return null
		}
		return value ? '1' : '0'
	}

}
