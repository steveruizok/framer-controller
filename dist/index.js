"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framer_1 = require("framer");
/**
 * A Controller manages a component's props.
 * It maintains a state that can be easily changed and which it passes to a controlled component as props.
 * It also keeps a history of states and can take commands, such as undo and redo, to traverse this history.
 * You can easily extend the Controller class to add custom controls for any component.
 * @template T An interface for the controlled component's state.
 */
class Controller {
    /**
     * Creates a new instance of Controller.
     * @param {T} initial The initial state of the controller.
     */
    constructor(initial) {
        this._state = framer_1.Data({});
        this._historyPosition = 0;
        this._history = [];
        /* ------------------------------- Life Cycle ------------------------------- */
        /**
         * A method that fires automatically after each state change.
         * @param state The controller's initial state.
         */
        this.onUpdate = (state) => { };
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
        this.connect = (component) => {
            this._controlled = component;
            console.log('Connected', this.constructor.name, component);
        };
        /**
         * Set the controller's state. The new state will be passed to the managed component as props. Setting state adds the new state to the controller's history and increments the controller's history position.
         * @param {Options} state The changes you wish to make to the controller's state.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         * @returns {number} The controller's new history position.
         */
        this.setState = (state = {}, callback) => {
            const next = Object.assign({}, this.state, state);
            this._history = this.history.slice(0, this.historyPosition + 1);
            this._history.push(next);
            return this.traverseHistory(1, callback);
        };
        /**
         * Traverse the controller's history by a certain amount (delta). The controller will load the state stored at the new position.
         * @param {number} delta The number of steps forward (positive) or backward (negative) to move the controller's history position.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         * @returns {number} The controller's new history position.
         */
        this.traverseHistory = (delta = 0, callback) => {
            return this.setHistoryPosition(this.historyPosition + delta, callback);
        };
        /**
         * Set the controller's history position.
         * @param {number} position The new history position to set.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         * @returns {number} The controller's new history position.
         */
        this.setHistoryPosition = (position = 0, callback) => {
            position = Math.max(Math.min(position, this.history.length - 1), 0);
            this._historyPosition = position;
            let state = this.history[this.historyPosition];
            this.updateState(state, callback);
            return position;
        };
        /**
         * Update the component's state (without modifying history).
         * @param {Options} state The changes you wish to make to the controller's state.
         * @param {(state: Options<T>, position: number) => void} [callback] An optional callback function to run after the new state has loaded.
         */
        this.updateState = (state = {}, callback) => {
            Object.assign(this._state, state);
            this.onUpdate(this.state);
            if (callback) {
                window.setTimeout(() => callback.bind(this)(this.state, this.historyPosition), 150);
            }
        };
        /**
         * Clears the controller's history, and starts a new history with the current state.
         * @returns {number} The controller's new history position.
         */
        this.clearHistory = () => {
            return this.resetState(this.state);
        };
        /**
         * Load the previous state from the controller's history, if there is one.
         * @returns {number} The new history position.
         */
        this.undo = () => {
            if (this.historyPosition > 0) {
                this.traverseHistory(-1);
            }
            return this.historyPosition;
        };
        /**
         * Load the next state from the controller's history, if there is one.
         * @returns {number} The new history position.
         */
        this.redo = () => {
            if (this.historyPosition < this.history.length - 1) {
                this.traverseHistory(1);
            }
            return this.historyPosition;
        };
        const initialState = initial;
        initialState.controller = this;
        this._state = framer_1.Data(initialState);
        this._history = [initialState];
    }
    /**
     * Set the state to a given value and clear history.
     * @param state The controller's new state.
     */
    resetState(state) {
        Object.assign(this._state, state);
        this._history = [state];
        this._historyPosition = 0;
        return this._historyPosition;
    }
    /**
     * The controller's array of history states.
     * @returns {Options<T>[]} The current history history.
     * @readonly
     * @memberof Controller
     */
    get history() {
        return this._history;
    }
    /**
     * The controller's current history position.
     * @readonly
     * @memberof Controller
     */
    get historyPosition() {
        return this._historyPosition;
    }
    /**
     * The controller's current state.
     * @readonly
     * @memberof Controller
     */
    get state() {
        return this._state;
    }
}
exports.default = Controller;
var PageComponentController_1 = require("./PageComponentController");
exports.PageComponentController = PageComponentController_1.PageComponentController;
var PlacesController_1 = require("./PlacesController");
exports.PlacesController = PlacesController_1.PlacesController;
var FormController_1 = require("./FormController");
exports.FormController = FormController_1.FormController;
var FetchController_1 = require("./FetchController");
exports.FetchController = FetchController_1.FetchController;
