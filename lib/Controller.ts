import { Data } from "framer"

type State<T> = Partial<T & { controller?: any }>

/**
 * A Controller is a tool for managing a small piece of application state.
 * On its own, it can be used much like a regular Data object, except that
 * changes to state are made using the `setState` method.
 *
 *
 * However, the real value of Controller is through extension: it can be
 * easily extended, allowing a user to abstract away common-but-complex
 * stateful relationships behind simple imperative commands -- think
 * `const [lat, lng] = await controller.findTheNearestCoffeeshop()`.
 *
 *
 * @template T An interface for the controlled component's state.
 */

export class Controller<T> {
	private _initial: State<T> = {}
	private _state: State<T> = {}
	private _connected: any

	/**
	 * Creates a new instance of Controller.
	 * @param {T} initial The initial state of the controller.
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
	 * @param state The controller's initial state.
	 */
	protected onReset = (state?: State<T>, connected?: any) => this.state

	/**
	 * A method that fires automatically after each state change.
	 * @param state The controller's initial state.
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
	 * @param {*} connected - The data to connect.
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
	 * @param {Options} state The changes you wish to make to the controller's state.
	 * @param {(state: State<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
	 * @returns {State<T>} The controller's new state.
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
	 * Return the state to its initial value.
	 * @returns {State<T>} The controller's new state.
	 */
	public reset = (): State<T> => this.setState(this._initial)

	/**
	 * The controller's current state.
	 * @readonly
	 */
	get state(): State<T> {
		return this._state
	}

	/**
	 * The data connected using `controller.connect`.
	 * @readonly
	 */
	get connected(): any {
		return this._connected
	}
}
