import { Controller } from "./Controller"

interface Options {
	initial?: number
}

interface State extends Options {
	value: number
}

export class CounterController extends Controller<State> {
	constructor(config: Options = {} as Options) {
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
