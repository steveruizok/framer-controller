"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
class IntervalController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ delay: 1, paused: false, frame: 0, cleanResume: true, onChange: () => null }, options));
        /**
         * Start the interval.
         *
         */
        this.start = () => {
            if (!this.paused)
                return;
            this.paused = false;
        };
        /**
         * Stop the interval.
         *
         */
        this.stop = () => {
            if (this.paused)
                return;
            this.paused = true;
        };
        /**
         * Toggle the controller from paused to unpaused.
         *
         */
        this.toggle = () => {
            this.paused = !this.paused;
        };
        /**
         * Begin a new interval.
         */
        this.tick = () => {
            this._timeout = window.setTimeout(() => {
                this.tick();
                if (!this.paused) {
                    this.state.onChange();
                    this.setState({
                        frame: this.frame + 1,
                    });
                }
            }, this.delay * 1000);
        };
        if (!this.paused) {
            this.tick();
        }
    }
    /**
     * Whether the controller is paused.
     *
     */
    get paused() {
        return this.state.paused;
    }
    set paused(paused) {
        if (this.state.cleanResume) {
            if (paused) {
                window.clearTimeout(this._timeout);
            }
            else {
                this.tick();
            }
        }
        this.setState({ paused });
    }
    /**
     * The controller's delay between intervals.
     *
     */
    get delay() {
        return this.state.delay;
    }
    set delay(delay) {
        this.setState({ delay });
    }
    /**
     * The controller's current frame.
     */
    get frame() {
        return this.state.frame;
    }
}
exports.IntervalController = IntervalController;
