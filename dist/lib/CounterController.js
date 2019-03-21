"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
class CounterController extends Controller_1.Controller {
    constructor(config = {}) {
        super(Object.assign({ initial: 0, value: 0 }, config));
        this.increment = () => {
            const { value } = this.state;
            this.setState({
                value: value + 1,
            });
        };
        this.decrement = () => {
            const { value } = this.state;
            this.setState({
                value: value - 1,
            });
        };
        this.incrementBy = (by = 1) => {
            const { value } = this.state;
            this.setState({
                value: value + by,
            });
        };
        this.decrementBy = (by = 1) => {
            const { value } = this.state;
            this.setState({
                value: value - by,
            });
        };
        this.set = (value) => {
            this.setState({
                value,
            });
        };
    }
    get count() {
        return this.state.value;
    }
    get value() {
        return this.state.value;
    }
}
exports.CounterController = CounterController;
