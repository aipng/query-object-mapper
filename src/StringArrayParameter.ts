import QueryParameter from './QueryParameter'
import QueryParameterBase from './QueryParameterBase'

const isSameArray = (a: string[] | null, b: string[]): boolean => {
	if (!a) {
		return !b.length
	}

	return a.length === b.length && a.every((v, i) => v === b[i])
}

export default class StringArrayParameter extends QueryParameterBase implements QueryParameter {

	private defaultValues: string[] = []

	private options: string[] = []


	setDefault(values: string[]): this {
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


	setOptions(options: string[]): this {
		this.defaultValues.forEach(value => {
			if (!options.includes(value)) {
				throw new Error('Default value must be included in options!')
			}
		})

		this.options = options

		return this
	}


	parse(value: string | null | Array<string|null> | undefined): string[] {
		if (value === null || value === undefined) {
			return this.defaultValues ?? []
		}

		if (Array.isArray(value)) {
			const strings = value
				.filter((item): item is string => item !== null && item !== '') // Filter out null and empty strings
				.filter(item => !this.options.length || this.options.includes(item))

			return strings.length ? strings : (this.defaultValues ?? [])
		}

		const strings = value
			.split(',')
			.filter(item => item !== null && item !== undefined && item !== '') // Ensure no null/undefined/empty items
			.filter(item => !this.options.length || this.options.includes(item))

		return strings.length ? strings : (this.defaultValues ?? [])
	}


	generate(values: string[] | null): string | null {
		if (values?.length && this.options.length) {
			values.forEach(value => {
				if (!this.options.includes(value)) {
					throw new Error(`'${value}' is not an option!`)
				}
			})
		}

		return isSameArray(values, this.defaultValues)
			? null
			: values?.join(',') ?? null
	}

}
