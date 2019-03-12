"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
/**
 * Control a set of index values for a given set of Frames.
 */
class IndexController extends Controller_1.Controller {
    constructor(props) {
        super(Object.assign({ order: props.items.reduce((a, c, i) => (Object.assign({}, a, { [c]: i })), {}), loop: false }, props));
        /**
         * Send an item forward by in the order.
         */
        this.moveForward = (item) => {
            let { items, order } = this.state;
            const from = order[item];
            if (!from && from < 0)
                return;
            let to = from + 1;
            if (this.loop) {
                to = (to + this.max) % this.max;
            }
            if (to > items.length - 1)
                return;
            this.swapValues(to, from);
        };
        /**
         * Send an item backward in the order.
         */
        this.moveBackward = (item) => {
            let { order } = this.state;
            const from = order[item];
            if (!from && from < 0)
                return;
            let to = from - 1;
            if (this.loop) {
                to = (to + this.max) % this.max;
            }
            if (to < 0)
                return;
            this.swapValues(to, from);
        };
        /**
         * Send an item forward to the top of the order.
         */
        this.moveToFront = (item) => {
            let { items, order } = this.state;
            const from = order[item];
            if (!from && from < 0)
                return;
            const to = items.length - 1;
            if (to === from)
                return;
            for (let key in order) {
                if (order[key] === from) {
                    order[key] = to;
                }
                else if (order[key] > from) {
                    order[key]--;
                }
            }
            this.setState({ order });
        };
        /**
         * Send an item back to the bottom of the order.
         */
        this.moveToBack = (item) => {
            let { order } = this.state;
            const from = order[item];
            if (!from && from < 0)
                return;
            const to = 0;
            if (to === from)
                return;
            for (let key in order) {
                if (order[key] === from) {
                    order[key] = to;
                }
                else if (order[key] < from) {
                    order[key]++;
                }
            }
            this.setState({ order });
        };
    }
    /**
     * Swap the order of two items.
     */
    swapValues(to, from) {
        let { order } = this.state;
        if (to === from)
            return;
        for (let key in order) {
            if (order[key] === to) {
                order[key] = from;
            }
            else if (order[key] === from) {
                order[key] = to;
            }
        }
        this.setState({ order });
    }
    /**
     * The minimum index for an item in this controller.
     */
    get min() {
        return 0;
    }
    /**
     * The maximum index for an item in this controller.
     */
    get max() {
        return this.items.length;
    }
    /**
     * The current order of items.
     */
    get order() {
        return this.state.order;
    }
    set order(order) {
        this.setState({
            order,
        });
    }
    /**
     * The controller's current items.
     */
    get items() {
        return this.state.items;
    }
    set items(items) {
        this.setState({
            items,
            order: items.reduce((a, c, i) => (Object.assign({}, a, { [c]: i })), {}),
        });
    }
    /**
     * Whether this controller is set to loop values (e.g. back from min to max).
     */
    get loop() {
        return this.state.loop;
    }
    set loop(loop) {
        this.setState({ loop });
    }
}
exports.IndexController = IndexController;
