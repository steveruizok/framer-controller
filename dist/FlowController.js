"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
class FlowController extends Controller_1.Controller {
    constructor(config = {}) {
        super(Object.assign({ current: 0, pagesTotal: 3, direction: "forward", root: config.stack ? config.stack.length === 0 : true, stack: [], transitions: {
                behind: {
                    transform: "translateX(0%)",
                    filter: "brightness(.7)",
                    zIndex: 0,
                },
                current: {
                    transform: "translateX(0%)",
                    filter: "brightness(1)",
                    zIndex: 1,
                },
                ahead: {
                    transform: `translateX(100%)`,
                    filter: "brightness(1)",
                    zIndex: 2,
                },
            } }, config));
        /**
         * Connect a FlowComponent to this controller via its override props.
         */
        this.onConnect = (state = this.state, props) => {
            const component = props.children[0];
            if (!component || !component.props.pages) {
                console.warn("Error: You can only connect a FlowComponent to a FlowController.");
                return this.state;
            }
            this.pagesTotal = component.props.pages.length;
            return this.state;
        };
        /**
         * Show a new index.
         */
        this.showNext = (index) => {
            const { current: previous, stack } = this.state;
            let current = Math.min(Math.max(index, 0), this.pagesTotal);
            if (current === previous)
                return;
            this.setState({
                direction: "forward",
                stack: [...stack, previous],
                current,
                root: false,
            });
        };
        /**
         * Show the previous index.
         */
        this.showPrevious = () => {
            const { stack } = this.state;
            const current = stack.pop();
            if (current === undefined)
                return;
            this.setState({
                direction: "backward",
                current,
                stack,
                root: stack.length === 0,
            });
        };
    }
    get current() {
        return this.state.current;
    }
    get direction() {
        return this.state.direction;
    }
    get pagesTotal() {
        return this.state.pagesTotal;
    }
    get root() {
        return this.state.root;
    }
    /**
     * Set the total number of pages.
     */
    set pagesTotal(total) {
        const { pagesTotal: prevTotal, stack: prevStack } = this.state;
        if (total === prevTotal)
            return;
        let { current } = this;
        current = Math.min(Math.max(current, 0), total);
        const stack = prevStack.filter(p => p <= total);
        this.setState({
            pagesTotal: total,
            current,
            stack,
            root: stack.length === 0,
        });
    }
}
exports.FlowController = FlowController;
