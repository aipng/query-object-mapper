export default interface QueryParameter {

	name: string

	urlName: string

	setDefault(value: unknown): this

	setOptions(options: unknown[]): this

	parse(value: string | undefined): string | number | boolean | number[] | null

	generate(value: unknown): string | number | null

}

