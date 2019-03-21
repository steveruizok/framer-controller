"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const utils_1 = require("./utils");
class SelectionController extends Controller_1.Controller {
    constructor(options = {}) {
        super(Object.assign({ selected: castArray(options.multiple, options.selected), validation: () => true, toggle: false }, options));
        /**
         * Select the given item. (If toggle is enabled, )
         */
        this.select = (item) => {
            const { toggle, validation, multiple } = this;
            let { selected } = this;
            if (validation && !validation(item)) {
                return selected;
            }
            if (multiple) {
                if (selected.includes(item)) {
                    if (toggle) {
                        return this.deselect(item);
                    }
                }
                else {
                    selected = [...selected, item];
                }
            }
            else {
                if (selected === item) {
                    if (toggle) {
                        return this.deselect(item);
                    }
                }
                else {
                    selected = item;
                }
            }
            this.setState({ selected });
        };
        /**
         * Deselect a given item.
         */
        this.deselect = (item) => {
            const { multiple } = this;
            let { selected } = this;
            if (multiple && selected.includes(item)) {
                selected = utils_1.without(selected, item);
            }
            else if (selected === item) {
                selected = null;
            }
            this.setState({ selected });
        };
        /**
         * Check whether a given item is selected.
         */
        this.isSelected = (item) => {
            const { multiple, selected } = this;
            if (multiple) {
                return selected.includes(item);
            }
            return selected === item;
        };
        /**
         * Clear all selections.
         */
        this.clear = () => {
            const { multiple } = this;
            let { selected } = this;
            selected = multiple ? [] : null;
            this.setState({ selected });
        };
    }
    get hasSelected() {
        const { selected, multiple } = this;
        if (multiple) {
            return Array.isArray(selected) && selected.length > 0;
        }
        else {
            return selected !== undefined && selected !== null;
        }
    }
    get selected() {
        return this.state.selected;
    }
    get toggle() {
        return this.state.toggle;
    }
    set toggle(toggle) {
        this.setState({ toggle });
    }
    get multiple() {
        return this.state.multiple;
    }
    set multiple(multiple) {
        this.setState({ multiple });
    }
    get validation() {
        return this.state.validation;
    }
    set validation(validation) {
        this.setState({
            validation,
        });
    }
}
exports.SelectionController = SelectionController;
const castArray = (multiple, selected) => {
    if (selected === undefined) {
        return multiple ? [] : null;
    }
    else {
        if (multiple) {
            return Array.isArray(selected) ? selected : [selected];
        }
        return selected;
    }
};
