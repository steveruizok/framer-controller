"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const animejs_1 = require("animejs");
class RelativeController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ input: {}, output: {} }, options));
        this._firstLoad = true;
        this.animate = (options) => {
            const targets = Object.assign({}, this.state.input);
            this._animation = animejs_1.default(Object.assign({ targets }, options, { update: () => {
                    this.setInput(targets);
                } }));
            return this._animation;
        };
        this.setInput = (props, initial = false) => {
            if (initial && !this._firstLoad) {
                return;
            }
            this._firstLoad = false;
            this.setState({
                input: props,
                output: this.state.converter(props),
            });
        };
        this.setState({
            output: this.state.converter(this.state.input),
        });
    }
    get converter() {
        return this.state.converter;
    }
    set converter(converter) {
        this.setState({
            converter,
            output: converter(this.state.input),
        });
    }
    get input() {
        return this.state.input;
    }
    get output() {
        return this.state.output;
    }
}
exports.RelativeController = RelativeController;
