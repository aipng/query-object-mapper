export default abstract class QueryParameterBase {
	protected readonly _name: string
	protected readonly _urlName: string


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

}
