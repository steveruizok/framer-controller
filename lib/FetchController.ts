import { Controller } from "./Controller"

type Props = {
	url: string
	parse?: (data: any) => any
	log?: boolean
	data?: any
	loading?: boolean
}

/**
 * Fetch data from an API endpoint (a `url`) and return it as `data`.
 * Accepts manual refrsehing (`refresh()`) and handles `loading` state, too.
 */
export class FetchController extends Controller<Props> {
	constructor(props: Props) {
		super({
			log: false,
			loading: true,
			parse: d => d,
			data: false,
			...props,
		})
		this.refresh()
	}

	/**
	 * Make a fetch request and return the data as a JSON object.
	 * @example
	 * FetchController.fetch("https://www.myData.com/users")
	 */
	static fetch = async (url?: string, callback?: (data: any) => void) => {
		const response = await fetch(url)
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
		this.setState({ loading: true })
		let data = await FetchController.fetch(this.state.url).catch(e =>
			console.warn(`⚠️Error refreshing from ${this.state.url}`, e)
		)

		if (this.state.parse) {
			data = this.state.parse(data)
		}

		this.setState({ data, loading: false }, () => {
			this.state.log && console.log(data)
		})
	}

	/**
	 * The controller's current data endpoint. Setting this property will refresh the controller.
	 */
	get url() {
		return this.state.url
	}

	set url(url: string) {
		this.setState({ url }, () => this.refresh())
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
