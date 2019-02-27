import { Data, animate, Animatable } from "framer";
export type WithManager<T> = T & { controller?: any };
export type Options<T> = Partial<WithManager<T>>;
export type AnimateOptions<T> = { [P in keyof T]?: any };

/**
 * A Controller manages a component's props.
 * It maintains a state that can be easily changed and which it passes to a controlled component as props.
 * It also keeps a history of states and can take commands, such as undo and redo, to traverse this history.
 * You can easily extend the Controller class to add custom controls for any component.
 *
 * @class Controller
 * @author Steve Ruiz
 * @template T - The controlled component's props.
 */

export class Controller<T = {}> {
	_state: Options<T> = Data({});
	_historyPosition = 0;
	_history: Options<T>[] = [];
	_controlled: any;

	/**
	 * The animation options to use for internal animations (e.g. when moving to a history state)
	 *
	 * @memberof Controller
	 */
	animationOptions = {
		tension: 250,
		friction: 25
	};

	/**
	 * Creates a new instance of Controller.
	 * @param {Options<T>} [initial={}]
	 * @memberof Controller
	 */
	constructor(props: T) {
		const initial: Options<T> = props;
		initial.controller = this;
		this._state = Data(initial);
		this._history = [initial];
	}

	/**
	 * @description - Connect this controller to a component. This method should be called from a component's `onComponentDidMount` method.
	 * @param {*} component - The component to connect.
	 * @example
	 * componentDidMount() {
	 * 	if (this.props.controller) {
	 * 		this.props.controller.connect(this);
	 * 	}
	 * }
	 */
	connect = (component: any) => {
		this._controlled = component;
		console.log("conncted", component);
	};

	/**
	 * @description Set the controller's state. The new state will be passed to the managed component as props. Setting state adds the new state to the controller's history and increments the controller's history position.
	 * @param {Options} state - The changes you wish to make to the controller's state.
	 * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
	 * @returns {number} - The controller's new history position.
	 */
	setState = (
		state: Options<T> = {},
		callback?: (state: T, position: number) => void
	): number => {
		const next = { ...(this.state as object), ...(state as object) };
		this._history = this.history.slice(0, this.historyPosition + 1);
		this._history.push(next);
		return this.traverseHistory(1, callback);
	};

	/**
	 * @description Set the controller's state, animating any animatable values.
	 * @param {Partial<AnimateOptions<T>>} state - The changes you wish to make to the controller's state.
	 * @param {any} [options] - The spring animation options you wish to use.
	 * @param {(state: T, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
	 * @returns {number} - The controller's new history position.
	 */
	animate = (
		state: Partial<AnimateOptions<T>>,
		options?: AnimateOptions<T>,
		callback?: (state: T, position: number) => void
	): number => {
		for (let prop in state) {
			let value = this.state[prop];
			if (value.constructor.name === "AnimatableValue") {
				animate.spring(
					this._state[prop] as any,
					state[prop],
					options || this.animationOptions
				);
				state[prop] = Animatable((value as any).get());
			} else {
				this._state[prop] = state[prop];
			}
		}

		const next = { ...(this.state as object), ...(state as object) };
		this._history = this.history.slice(0, this.historyPosition + 1);
		this._history.push(next);
		this._historyPosition++;

		if (callback) {
			window.setTimeout(
				() => callback(this.state as T, this.historyPosition),
				80
			);
		}

		return this.historyPosition;
	};

	/**
	 * @description - Traverse the controller's history by a certain amount (delta). The controller will load the state stored at the new position.
	 * @param {number} delta - The number of steps forward (positive) or backward (negative) to move the controller's history position.
	 * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
	 * @returns {number} - The controller's new history position.
	 */
	traverseHistory = (
		delta: number = 0,
		callback?: (state: T, position: number) => void
	): number => {
		return this.setHistoryPosition(this.historyPosition + delta, callback);
	};

	/**
	 * @description - Set the controller's history position.
	 * @param {number} position - The new history position to set.
	 * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
	 * @returns {number} - The controller's new history position.
	 */
	setHistoryPosition = (
		position: number = 0,
		callback?: (state: T, position: number) => void
	): number => {
		position = Math.max(Math.min(position, this.history.length - 1), 0);
		this._historyPosition = position;

		let state = this.history[this.historyPosition] as Options<T>;

		for (let prop in state) {
			let value = this.state[prop];
			if (value.constructor.name === "AnimatableValue") {
				animate.spring(
					this._state[prop] as any,
					state[prop].get(),
					this.animationOptions
				);
			}
		}

		this.updateState(state, callback);

		return position;
	};

	/**
	 * @description Update the component's state (without modifying history).
	 * @param {Options} state - The changes you wish to make to the controller's state.
	 * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
	 */
	updateState = (
		state: Options<T> = {},
		callback?: (state: Options<T>, position: number) => void
	): void => {
		Object.assign(this._state, state);

		if (callback) {
			window.setTimeout(
				() => callback(this.state as Options<T>, this.historyPosition),
				80
			);
		}
	};

	/**
	 * @description - Clears the controller's history, and starts a new history with the current state.
	 * @returns {number} - The controller's new history position.
	 */
	clearHistory = (): number => {
		this._history = [this.state];
		this._historyPosition = 0;
		return this._historyPosition;
	};

	/**
	 * @description - Load the previous state from the controller's history, if there is one.
	 * @returns {number} The new history position.
	 */
	undo = (): number => {
		if (this.historyPosition > 0) {
			this.traverseHistory(-1);
		}
		return this.historyPosition;
	};

	/**
	 * @description - Load the next state from the controller's history, if there is one.
	 * @returns {number} The new history position.
	 */
	redo = (): number => {
		if (this.historyPosition < this.history.length - 1) {
			this.traverseHistory(1);
		}
		return this.historyPosition;
	};

	/**
	 * @description - The controller's array of history states.
	 * @returns {Options<T>[]} The current history history.
	 * @readonly
	 * @memberof Controller
	 */
	get history(): Options<T>[] {
		return this._history;
	}

	/**
	 * @description - The controller's current history position.
	 * @readonly
	 * @memberof Controller
	 */
	get historyPosition(): number {
		return this._historyPosition;
	}

	/**
	 * @description - The controller's current state.
	 * @readonly
	 * @memberof Controller
	 */
	get state() {
		return this._state;
	}
}
