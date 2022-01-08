export default interface QueryParameter {

	name: string

	urlName: string

	setDefault(value: string | number | boolean): this

	setOptions(options: unknown[]): this

	parse(value: string | undefined): string | number | boolean | null

	generate(value: string | number | boolean | null): string | number | null
}

