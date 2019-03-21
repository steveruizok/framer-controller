import { Controller } from './Controller'
import { AnimateOptions } from './types'
import anime from 'animejs'

type Input = { [key: string]: any }
type Converter<T> = (props: T) => { [key: string]: any }

interface Options {
	input?: Input
	output?: { [key: string]: any }
	converter: Converter<Input>
}

interface State extends Options {}

export class RelativeController extends Controller<State> {
	_firstLoad: boolean = true

	constructor(options: Options = {} as Options) {
		super({
			input: {},
			output: {},
			...options,
		})
		this.setState({
			output: this.state.converter(this.state.input),
		})
	}

	public animate = (
		options: AnimateOptions | State | { [key: string]: any }
	) => {
		const targets = { ...this.state.input }

		this._animation = anime({
			targets,
			...(options as any),
			update: () => {
				this.setInput(targets)
			},
		})
	}

	setInput = (props: Input, initial: boolean = false) => {
		if (initial && !this._firstLoad) {
			return
		}

		this._firstLoad = false

		this.setState({
			input: props,
			output: this.state.converter(props),
		})
	}

	get converter() {
		return this.state.converter
	}

	set converter(converter: Converter<Input>) {
		this.setState({
			converter,
			output: converter(this.state.input),
		})
	}

	get input() {
		return this.state.input
	}

	get output() {
		return this.state.output
	}
}
