import { Data } from "framer"

// The first version of Controller, with history enabled.

type WithLoader<T> = T & { onLoad?: (state: T) => void }
type WithManager<T> = WithLoader<T> & { controller?: any }
type Options<T> = Partial<WithManager<T>>
type ChangeHandler<T> = (state: Options<T>) => void

/**
 * A Controller manages a component's props.
 * It maintains a state that can be easily changed and which it passes to a controlled component as props.
 * It also keeps a history of states and can take commands, such as undo and redo, to traverse this history.
 * You can easily extend the Controller class to add custom controls for any component.
 * @template T An interface for the controlled component's state.
 */

export class HistoryController<T> {
	private _state: Options<T> = Data({})
	private _historyPosition = 0
	private _history: Options<T>[] = []
	private _connected: any

	/**
	 * Creates a new instance of Controller.
	 * @param {T} initial The initial state of the controller.
	 */
	constructor(initial: T) {
		const initialState: Options<T> = initial
		initialState.controller = this
		this._state = Data(initialState)
		this._history = [initialState]
	}

	/* ------------------------------- Life Cycle ------------------------------- */

	/**
	 * A method that fires automatically after each state change.
	 * @param state The controller's initial state.
	 */
	protected onUpdate: (state: Options<T>) => void = state => {}
	protected onConnect: (state: Options<T>, component: any) => void = (
		state,
		component
	) => {}

	/* ------------------------------- End Life Cycle ------------------------------- */

	/**
	 * Connect this controller to a component. This method should be called from a component's `onComponentDidMount` method.
	 * @param {*} component The component to connect.
	 * @example```
componentDidMount() {
  if (this.props.controller) {
    this.props.controller.connect(this);
  }
}
	 ```*/
	connect = (connected: any) => {
		if (connected === this._connected) return
		this._connected = connected
		this.onConnect(this.state, this.connected)
		console.log("Connected", this.constructor.name, connected)
	}

	/**
	 * Set the controller's state. The new state will be passed to the managed component as props. Setting state adds the new state to the controller's history and increments the controller's history position.
	 * @param {Options} state The changes you wish to make to the controller's state.
	 * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
	 * @returns {number} The controller's new history position.
	 */
	setState = (
		state: Options<T> = {},
		callback?: (state: T, position: number) => void
	): number => {
		const next = { ...(this.state as object), ...(state as object) }
		this._history = this.history.slice(0, this.historyPosition + 1)
		this._history.push(next)
		return this.traverseHistory(1, callback)
	}

	/**
	 * Set the state to a given value and clear history.
	 * @param state The controller's new state.
	 */
	resetState(state: Options<T>) {
		Object.assign(this._state, state)
		this._history = [state]
		this._historyPosition = 0
		return this._historyPosition
	}

	/**
	 * Traverse the controller's history by a certain amount (delta). The controller will load the state stored at the new position.
	 * @param {number} delta The number of steps forward (positive) or backward (negative) to move the controller's history position.
	 * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
	 * @returns {number} The controller's new history position.
	 */
	traverseHistory = (
		delta: number = 0,
		callback?: (state: T, position: number) => void
	): number => {
		return this.setHistoryPosition(this.historyPosition + delta, callback)
	}

	/**
	 * Set the controller's history position.
	 * @param {number} position The new history position to set.
	 * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
	 * @returns {number} The controller's new history position.
	 */
	setHistoryPosition = (
		position: number = 0,
		callback?: (state: T, position: number) => void
	): number => {
		position = Math.max(Math.min(position, this.history.length - 1), 0)
		this._historyPosition = position

		let state = this.history[this.historyPosition] as Options<T>

		this.updateState(state, callback)

		return position
	}

	/**
	 * Update the component's state (without modifying history).
	 * @param {Options} state The changes you wish to make to the controller's state.
	 * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
	 */
	updateState = (
		state: Options<T> = {},
		callback?: (state: Options<T>, position: number) => void
	): void => {
		Object.assign(this._state, state)
		this.onUpdate(this.state)

		if (callback) {
			window.setTimeout(
				() =>
					callback.bind(this)(this.state as Options<T>, this.historyPosition),
				150
			)
		}
	}

	/**
	 * Clears the controller's history, and starts a new history with the current state.
	 * @returns {number} The controller's new history position.
	 */
	clearHistory = (): number => {
		return this.resetState(this.state)
	}

	/**
	 * Load the previous state from the controller's history, if there is one.
	 * @returns {number} The new history position.
	 */
	undo = (): number => {
		if (this.historyPosition > 0) {
			this.traverseHistory(-1)
		}
		return this.historyPosition
	}

	/**
	 * Load the next state from the controller's history, if there is one.
	 * @returns {number} The new history position.
	 */
	redo = (): number => {
		if (this.historyPosition < this.history.length - 1) {
			this.traverseHistory(1)
		}
		return this.historyPosition
	}

	/**
	 * The controller's array of history states.
	 * @returns {Options<T>[]} The current history history.
	 * @readonly
	 * @memberof Controller
	 */
	get history(): Options<T>[] {
		return this._history
	}

	/**
	 * The controller's current history position.
	 * @readonly
	 * @memberof Controller
	 */
	get historyPosition(): number {
		return this._historyPosition
	}

	/**
	 * The controller's current state.
	 * @readonly
	 * @memberof Controller
	 */
	get state() {
		return this._state
	}

	/**
	 * The component (if any) connected to / controlled by this controller.
	 */
	get connected() {
		return this._connected
	}
}
