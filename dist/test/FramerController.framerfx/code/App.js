"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const controller = new lib_1.default({
    left: 0,
    subState: {
        top: 0,
    },
});
exports.Animated = () => {
    return {
        left: controller.state.left,
        onTap() {
            controller.animate({
                left: 200,
            });
        },
    };
};
exports.Animated2 = () => {
    return {
        top: controller.state.subState.top,
        onTap() {
            controller.animate({
                top: 200,
            }, 'subState');
        },
    };
};
exports.Label = () => ({
    $value: controller.state.left,
});
