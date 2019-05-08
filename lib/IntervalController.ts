import { Controller } from './Controller'

/**
 * IntervalController's options
 */
interface Options {
	id?: string
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
	_ticking: boolean
	_id: string

	constructor(options: Options = {} as Options) {
		super({
			delay: 1,
			paused: false,
			frame: 0,
			cleanResume: true,
			onChange: () => null,
			...options,
		})

		this._id = options.id || 'fc_ticker'

		if (this.paused) {
			this._ticking = false
		} else {
			this._ticking = true
			this.tick()
		}
	}

	/**
	 * Start the interval.
	 *
	 */
	start = () => {
		if (!this.paused) return
		if (!this._ticking) {
			this.tick()
		}
		this.paused = false
	}

	/**
	 * Stop the interval.
	 *
	 */
	pause = () => {
		if (this.paused) return
		this.paused = true
	}

	/**
	 * Stop the interval.
	 *
	 */
	stop = () => {
		if (this.paused) return
		this._ticking = false
		this.clearTicker()
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

	protected clearTicker = () => {
		if (window['fc_ticker_' + this._id]) {
			clearInterval(window['fc_ticker_' + this._id])
		}
	}

	/**
	 * Begin a new interval.
	 */
	protected tick = () => {
		this.clearTicker()

		this._timeout = window.setTimeout(() => {
			this.tick()
			if (!this.paused) {
				this.state.onChange()
				this.setState({
					frame: this.frame + 1,
				})
			}
		}, this.delay * 1000)

		window['fc_ticker_' + this._id] = this._timeout
	}
}
