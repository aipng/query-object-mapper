import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

export default class BooleanParameter extends QueryParameterBase implements QueryParameter {

	private defaultValue = false


	get name(): string {
		return this._name
	}


	get urlName(): string {
		return this._urlName
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
