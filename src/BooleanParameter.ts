import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

export default class BooleanParameter extends QueryParameterBase implements QueryParameter {

	private defaultValue = false


	setDefault(value: boolean): this {
		this.defaultValue = value

		return this
	}


	setOptions(): this {
		throw new Error('There\'s no sense to define options for boolean parameter!')
	}


	parse(value: string | null | Array<string|null> | undefined): boolean {
		if (value === null || value === undefined) {
			return this.defaultValue
		}

		if (Array.isArray(value)) {
			return this.defaultValue
		}

		if (value === '1' || value === 'true') {
			return true
		}

		if (value === '0' || value === 'false') {
			return false
		}

		return this.defaultValue
	}


	generate(value: boolean): string | null {
		if (this.defaultValue === value) {
			return null
		}

		return value ? '1' : '0'
	}

}
