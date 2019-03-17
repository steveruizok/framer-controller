import { Controller } from "./Controller"

/**
 * IntervalController's options
 */
interface Options {
	delay?: number
	paused?: boolean
	cleanResume?: boolean
	onChange?: () => void
}

/**
 * IntervalController's state
 */
interface State extends Options {
	frame: number
	paused: boolean
}

export class IntervalController extends Controller<State> {
	_timeout: any

	constructor(options: Options = {} as Options) {
		super({
			delay: 1,
			paused: false,
			frame: 0,
			cleanResume: true,
			onChange: () => null,
			...options,
		})
		if (!this.paused) {
			this.tick()
		}
	}

	/**
	 * Start the interval.
	 *
	 */
	start = () => {
		if (!this.paused) return
		this.paused = false
	}

	/**
	 * Stop the interval.
	 *
	 */
	stop = () => {
		if (this.paused) return
		this.paused = true
	}

	/**
	 * Toggle the controller from paused to unpaused.
	 *
	 */
	toggle = () => {
		this.paused = !this.paused
	}

	/**
	 * Whether the controller is paused.
	 *
	 */
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

	/**
	 * The controller's delay between intervals.
	 *
	 */
	get delay() {
		return this.state.delay
	}

	set delay(delay: number) {
		this.setState({ delay })
	}

	/**
	 * The controller's current frame.
	 */
	get frame() {
		return this.state.frame
	}

	/**
	 * Begin a new interval.
	 */
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
