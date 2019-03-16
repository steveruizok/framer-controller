"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
class IntervalController extends Controller_1.Controller {
    constructor(config = {}) {
        super(Object.assign({ delay: 1, paused: false, frame: 0, cleanResume: true, onChange: () => null }, config));
        this.start = () => {
            if (!this.paused)
                return;
            this.paused = false;
        };
        this.stop = () => {
            if (this.paused)
                return;
            this.paused = true;
        };
        this.toggle = () => {
            this.paused = !this.paused;
        };
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
        this.tick();
    }
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
    get delay() {
        return this.state.delay;
    }
    set delay(delay) {
        this.setState({ delay });
    }
    get frame() {
        return this.state.frame;
    }
}
exports.IntervalController = IntervalController;
