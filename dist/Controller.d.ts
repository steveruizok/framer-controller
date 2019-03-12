declare type State<T> = Partial<T & {
    controller?: any;
}>;
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
export declare class Controller<T> {
    private _initial;
    private _state;
    private _connected;
    /**
     * Creates a new instance of Controller.
     * @param {T} initial The initial state of the controller.
     */
    constructor(initial: T);
    /**
     * A method that fires automatically after a controller's state
     * is reset using the `reset` method.
     * @param state The controller's initial state.
     */
    protected onReset: (state?: State<T>, connected?: any) => any;
    /**
     * A method that fires automatically after each state change.
     * @param state The controller's initial state.
     */
    protected onUpdate: (state?: State<T>, connected?: any) => any;
    /**
     * A callback that fires automatically after the controller is
     * connected to data using `connect` method.
     */
    protected onConnect: (state?: Partial<T & {
        controller?: any;
    }>, connected?: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Connect this controller to a component or set of props. This
     * could be called from a component's `onComponentDidMount` method,
     * or using the props from an override.
     * @param {*} connected - The data to connect.
     */
    connect: (connected: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Set the controller's state.
     * @param {Options} state The changes you wish to make to the controller's state.
     * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
     * @returns {Options<T>} The controller's new state.
     */
    setState: (state?: Partial<T & {
        controller?: any;
    }>, callback?: (state: T) => void) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Return the state to its initial value.
     * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
     * @returns {Options<T>} The controller's new state.
     */
    reset: (callback?: (state: Partial<T & {
        controller?: any;
    }>) => void) => Partial<T & {
        controller?: any;
    }>;
    /**
     * The controller's current state.
     * @readonly
     */
    readonly state: Partial<T & {
        controller?: any;
    }>;
    /**
     * The data connected using `controller.connect`.
     * @readonly
     */
    readonly connected: any;
}
export {};
