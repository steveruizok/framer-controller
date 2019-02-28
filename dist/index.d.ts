declare type WithManager<T> = T & {
    controller?: any;
};
declare type Options<T> = Partial<WithManager<T>>;
declare type AnimateOptions<T> = {
    [P in keyof T]?: any;
};
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
declare class Controller<T = {}> {
    _state: Options<T>;
    _historyPosition: number;
    _history: Options<T>[];
    _controlled: any;
    /**
     * The animation options to use for internal animations (e.g. when moving to a history state)
     *
     * @memberof Controller
     */
    animationOptions: {
        tension: number;
        friction: number;
    };
    /**
     * Creates a new instance of Controller.
     * @param {Options<T>} [initial={}]
     * @memberof Controller
     */
    constructor(props: T);
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
    connect: (component: any) => void;
    /**
     * @description Set the controller's state. The new state will be passed to the managed component as props. Setting state adds the new state to the controller's history and increments the controller's history position.
     * @param {Options} state - The changes you wish to make to the controller's state.
     * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
     * @returns {number} - The controller's new history position.
     */
    setState: (state?: Partial<WithManager<T>>, callback?: (state: T, position: number) => void) => number;
    /**
     * @description Set the controller's state, animating any animatable values.
     * @param {Partial<AnimateOptions<T>>} state - The changes you wish to make to the controller's state.
     * @param {any} [options] - The spring animation options you wish to use.
     * @param {(state: T, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
     * @returns {number} - The controller's new history position.
     */
    animate: (state: Partial<AnimateOptions<T>>, options?: AnimateOptions<T>, callback?: (state: T, position: number) => void) => number;
    /**
     * @description - Traverse the controller's history by a certain amount (delta). The controller will load the state stored at the new position.
     * @param {number} delta - The number of steps forward (positive) or backward (negative) to move the controller's history position.
     * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
     * @returns {number} - The controller's new history position.
     */
    traverseHistory: (delta?: number, callback?: (state: T, position: number) => void) => number;
    /**
     * @description - Set the controller's history position.
     * @param {number} position - The new history position to set.
     * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
     * @returns {number} - The controller's new history position.
     */
    setHistoryPosition: (position?: number, callback?: (state: T, position: number) => void) => number;
    /**
     * @description Update the component's state (without modifying history).
     * @param {Options} state - The changes you wish to make to the controller's state.
     * @param {(state: Options<T>, position: number) => void} [callback] - An optional callback function to run after the new state has loaded.
     */
    updateState: (state?: Partial<WithManager<T>>, callback?: (state: Partial<WithManager<T>>, position: number) => void) => void;
    /**
     * @description - Clears the controller's history, and starts a new history with the current state.
     * @returns {number} - The controller's new history position.
     */
    clearHistory: () => number;
    /**
     * @description - Load the previous state from the controller's history, if there is one.
     * @returns {number} The new history position.
     */
    undo: () => number;
    /**
     * @description - Load the next state from the controller's history, if there is one.
     * @returns {number} The new history position.
     */
    redo: () => number;
    /**
     * @description - The controller's array of history states.
     * @returns {Options<T>[]} The current history history.
     * @readonly
     * @memberof Controller
     */
    readonly history: Options<T>[];
    /**
     * @description - The controller's current history position.
     * @readonly
     * @memberof Controller
     */
    readonly historyPosition: number;
    /**
     * @description - The controller's current state.
     * @readonly
     * @memberof Controller
     */
    readonly state: Partial<WithManager<T>>;
}
export default Controller;
export { PageComponentController } from './PageComponentController';
