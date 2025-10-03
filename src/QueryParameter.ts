export default interface QueryParameter {

	name: string

	urlName: string

	setDefault(value: unknown): this

	setOptions(options: unknown[]): this

	parse(value: string | null | Array<string | null> | undefined): string | number | boolean | number[] | string[] | null

	generate(value: unknown): string | number | null | Array<string | number>

}
