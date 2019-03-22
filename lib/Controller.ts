import { Data } from "framer"
import anime from "animejs"

import { State, AnimateOptions } from "./types"
/**
 * A Controller provides an interface for updating a Framer X Data object.
 */

export class Controller<T> {
	protected _isAnimating = false
	protected _animation?: anime.AnimeInstance
	private _initial: State<T> = {}
	private _state: State<T> = {}
	private _connected: any

	/**
	 * Creates a new instance of Controller.
	 */
	constructor(initial: T) {
		const initialState: State<T> = initial
		initialState.controller = this

		this._initial = initialState
		this._state = Data(initialState)
	}

	/**
	 * A method that fires automatically after a controller's state
	 * is reset using the `reset` method.
	 */
	protected onReset = (state?: State<T>, connected?: any) => this.state

	/**
	 * A method that fires automatically after each state change.
	 */
	protected onUpdate = (state?: State<T>, connected?: any) => this.state

	/**
	 * A callback that fires automatically after the controller is
	 * connected to data using `connect` method.
	 */
	protected onConnect = (state?: State<T>, connected?: any) => this.state

	/**
	 * Connect this controller to a component or set of props. This
	 * could be called from a component's `onComponentDidMount` method,
	 * or using the props from an override.
	 */
	public connect = (connected: any) => {
		if (connected !== this._connected) {
			this._connected = connected
			return this.onConnect(this.state, this.connected)
		}

		return this.state
	}

	/**
	 * Set the controller's state.
	 */
	public setState = (state: State<T> = {}): State<T> => {
		Object.assign(this._state, {
			...(this.state as object),
			...(state as object),
		})
		this.onUpdate(this._state)
		return this._state
	}

	/**
	 * Animate state using animejs.
	 */
	public animate = (
		options: AnimateOptions | State<T> | { [key: string]: any },
		target?: keyof State<T>
	) => {
		const targets = target ? { ...this.state[target] } : { ...this.state }

		this._animation = anime({
			targets,
			...(options as any),
			update: () => {
				if (target) {
					this.setState({
						[target]: targets,
					} as State<T>)
				} else {
					this.setState(targets)
				}
			},
			begin: () => (this._isAnimating = true),
			complete: () => (this._isAnimating = false),
		})

		return this._animation
	}

	/**
	 * Stop the current animation.
	 */
	public stopAnimation = () => {
		if (this.animation) {
			this.animation.pause()
			this._isAnimating = false
		}
	}

	/**
	 * Resume the current animation.
	 */
	public resumeAnimation = () => {
		if (this.animation) {
			this.animation.play()
			this._isAnimating = true
		}
	}

	/**
	 * Return the state to its initial value.
	 */
	public reset = (): State<T> => this.setState(this._initial)

	/**
	 * The controller's current state.
	 */
	get state(): State<T> {
		return this._state
	}

	/**
	 * The data connected using `controller.connect`.
	 */
	get connected(): any {
		return this._connected
	}

	/**
	 * The controller's current animation.
	 */
	get animation() {
		return this._animation
	}

	/**
	 * Whether the controller is animating.
	 */
	get isAnimating() {
		return this._isAnimating
	}
}
