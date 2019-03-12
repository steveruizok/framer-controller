"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framer_1 = require("framer");
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
class Controller {
    /**
     * Creates a new instance of Controller.
     * @param {T} initial The initial state of the controller.
     */
    constructor(initial) {
        this._initial = {};
        this._state = {};
        /**
         * A method that fires automatically after a controller's state
         * is reset using the `reset` method.
         * @param state The controller's initial state.
         */
        this.onReset = () => { };
        /**
         * A method that fires automatically after each state change.
         * @param state The controller's initial state.
         */
        this.onUpdate = () => { };
        /**
         * A callback that fires automatically after the controller is
         * connected to data using `connect` method.
         */
        this.onConnect = (state, connected) => this.state;
        /**
         * Connect this controller to a component or set of props. This
         * could be called from a component's `onComponentDidMount` method,
         * or using the props from an override.
         * @param {*} connected - The data to connect.
         */
        this.connect = (connected) => {
            if (connected !== this._connected) {
                this._connected = connected;
                return this.onConnect(this.state, this.connected);
            }
            return this.state;
        };
        /**
         * Set the controller's state.
         * @param {Options} state The changes you wish to make to the controller's state.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         * @returns {Options<T>} The controller's new state.
         */
        this.setState = (state = {}, callback) => {
            Object.assign(this._state, Object.assign({}, this.state, state));
            this.onUpdate(this._state);
            if (callback) {
                window.setTimeout(() => callback.bind(this)(this._state), 150 // i want to be a real boy
                );
            }
            return this._state;
        };
        /**
         * Return the state to its initial value.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         * @returns {Options<T>} The controller's new state.
         */
        this.reset = (callback) => this.setState(this._initial, callback);
        const initialState = initial;
        initialState.controller = this;
        this._initial = initialState;
        this._state = framer_1.Data(initialState);
    }
    /**
     * The controller's current state.
     * @readonly
     */
    get state() {
        return this._state;
    }
    /**
     * The data connected using `controller.connect`.
     * @readonly
     */
    get connected() {
        return this._connected;
    }
}
exports.Controller = Controller;
