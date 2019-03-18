import { Controller } from "./Controller"

interface Options {
	url: string
	init?: RequestInit
	parse?: (data: any) => any
	log?: boolean
	data?: any
}

interface State extends Options {
	loading?: boolean
}

/**
 * Fetch data from an API endpoint (a `url` and optional `init` object),
 * perhaps `parse` the results, and then return it as `data`.
 * Accepts manual `refrseh`ing and handles `loading` state, too.
 */
export class FetchController extends Controller<State> {
	constructor(options: Options = {} as Options) {
		super({
			init: {},
			log: false,
			loading: true,
			parse: d => d,
			data: false,
			...options,
		})
		this.refresh()
	}

	onUpdate = state => {
		this.state.log && console.log(state.data)
		return this.state
	}

	/**
	 * Make a fetch request and return the data as a JSON object.
	 * @example
	 * FetchController.fetch("https://www.myData.com/users")
	 */
	static fetch = async (
		url?: string,
		init?: RequestInit,
		callback?: (data: any) => void
	) => {
		const response = await fetch(url, init)
		const data = await response.json()
		callback && callback(data)
		return data
	}

	/**
	 * Load a new set of data from the controller's `url`.
	 * @param callback - An optional callback to run once the data arrives.
	 * @example
	 * controller.refresh()
	 * controller.refresh((data) => console.log(data))
	 */
	refresh = async () => {
		const { parse, init, url } = this.state

		this.setState({ loading: true })
		let data = await FetchController.fetch(url, init).catch(e =>
			console.warn(`⚠️Error refreshing from ${url}`, e)
		)

		if (parse) {
			data = parse(data)
		}

		this.setState({ data, loading: false })
	}

	/**
	 * The controller's current data endpoint. Setting this property will refresh the controller.
	 */
	get url() {
		return this.state.url
	}

	set url(url: string) {
		this.setState({ url })
		this.refresh()
	}

	/**
	 * The controller's current data.
	 */
	get data() {
		return this.state.data
	}

	/**
	 * Whether or not the controller is waiting for data to arrive.
	 */
	get loading() {
		return this.state.loading
	}
}
