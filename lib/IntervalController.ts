import { Controller } from "./Controller"

interface Config {
	delay?: number
	paused?: boolean
	cleanResume?: boolean
	onChange?: () => void
}

interface State extends Config {
	frame: number
	paused: boolean
}

export class IntervalController<Config> extends Controller<State> {
	_timeout: any

	constructor(config: Config = {} as Config) {
		super({
			delay: 1,
			paused: false,
			frame: 0,
			cleanResume: true,
			onChange: () => null,
			...config,
		})
		this.tick()
	}

	start = () => {
		if (!this.paused) return
		this.paused = false
	}

	stop = () => {
		if (this.paused) return
		this.paused = true
	}

	toggle = () => {
		this.paused = !this.paused
	}

	get paused() {
		return this.state.paused
	}

	set paused(paused: boolean) {
		if (this.state.cleanResume) {
			if (paused) {
				window.clearTimeout(this._timeout)
			} else {
				this.tick()
			}
		}
		this.setState({ paused })
	}

	get delay() {
		return this.state.delay
	}

	set delay(delay: number) {
		this.setState({ delay })
	}

	get frame() {
		return this.state.frame
	}

	protected tick = () => {
		this._timeout = window.setTimeout(() => {
			this.tick()
			if (!this.paused) {
				this.state.onChange()
				this.setState({
					frame: this.frame + 1,
				})
			}
		}, this.delay * 1000)
	}
}
