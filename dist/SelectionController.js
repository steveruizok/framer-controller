"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
const utils_1 = require("./utils");
class SelectionController extends Controller_1.Controller {
    constructor(config = {}) {
        super(Object.assign({ selected: null, validation: null, toggle: false }, config));
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
                        selected = utils_1.without(selected, item);
                    }
                    else {
                        return selected;
                    }
                }
                else {
                    selected = [...selected, item];
                }
            }
            else {
                if (selected === item) {
                    if (toggle) {
                        selected = null;
                    }
                    else {
                        return selected;
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
            if (multiple) {
                if (selected.includes(item)) {
                    selected = utils_1.without(selected, item);
                }
                else {
                    return selected;
                }
            }
            else {
                if (selected === item) {
                    selected = null;
                }
                else {
                    return selected;
                }
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
        return this.state.selected;
    }
    get multiple() {
        return this.state.multiple;
    }
    get validation() {
        return this.state.validation;
    }
}
exports.SelectionController = SelectionController;
