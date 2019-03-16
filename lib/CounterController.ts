import { Controller } from "./Controller"

interface Config {
	initial?: number
}

interface State extends Config {
	value: number
}

export class CounterController<Config> extends Controller<State> {
	constructor(config: Config = {} as Config) {
		super({
			initial: 0,
			value: 0,
			...config,
		})
	}

	get count() {
		return this.state.value
	}

	get value() {
		return this.state.value
	}

	public increment = () => {
		const { value } = this.state
		this.setState({
			value: value + 1,
		})
	}

	public decrement = () => {
		const { value } = this.state
		this.setState({
			value: value - 1,
		})
	}

	public incrementBy = (by = 1) => {
		const { value } = this.state
		this.setState({
			value: value + by,
		})
	}

	public decrementBy = (by = 1) => {
		const { value } = this.state
		this.setState({
			value: value - by,
		})
	}

	public set = (value: number) => {
		this.setState({
			value,
		})
	}
}
