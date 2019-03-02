"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const controller = new lib_1.default({
    background: '#CCCCCC',
});
function randomColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
exports.isColorField = () => controller.state;
exports.isButton = () => ({
    onClick() {
        controller.setState({
            background: randomColor(),
        });
    },
});
exports.isUndoButton = () => ({
    disabled: controller.historyPosition === 0,
    onClick() {
        controller.undo();
    },
});
exports.isRedoButton = () => ({
    disabled: controller.historyPosition === controller.history.length - 1,
    onClick() {
        controller.redo();
    },
});
exports.isColorLabel = () => ({
    $text: controller.state.background,
});
