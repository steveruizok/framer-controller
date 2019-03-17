"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framer_1 = require("framer");
/**
 * A Controller provides an interface for updating a Framer X Data object.
 */
class Controller {
    /**
     * Creates a new instance of Controller.
     */
    constructor(initial) {
        this._initial = {};
        this._state = {};
        /**
         * A method that fires automatically after a controller's state
         * is reset using the `reset` method.
         */
        this.onReset = (state, connected) => this.state;
        /**
         * A method that fires automatically after each state change.
         */
        this.onUpdate = (state, connected) => this.state;
        /**
         * A callback that fires automatically after the controller is
         * connected to data using `connect` method.
         */
        this.onConnect = (state, connected) => this.state;
        /**
         * Connect this controller to a component or set of props. This
         * could be called from a component's `onComponentDidMount` method,
         * or using the props from an override.
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
         */
        this.setState = (state = {}) => {
            Object.assign(this._state, Object.assign({}, this.state, state));
            this.onUpdate(this._state);
            return this._state;
        };
        /**
         * Return the state to its initial value.
         */
        this.reset = () => this.setState(this._initial);
        const initialState = initial;
        initialState.controller = this;
        this._initial = initialState;
        this._state = framer_1.Data(initialState);
    }
    /**
     * The controller's current state.
     */
    get state() {
        return this._state;
    }
    /**
     * The data connected using `controller.connect`.
     */
    get connected() {
        return this._connected;
    }
}
exports.Controller = Controller;
