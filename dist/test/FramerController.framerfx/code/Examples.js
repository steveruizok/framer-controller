"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framer_1 = require("framer");
const data = framer_1.Data({ toggle: true, scale: framer_1.Animatable(1), opacity: framer_1.Animatable(1), rotation: framer_1.Animatable(0), rotationY: framer_1.Animatable(0) });
exports.Scale = () => {
    return {
        scale: data.scale,
        onTap() {
            data.scale.set(0.6);
            framer_1.animate.spring(data.scale, 1);
        },
    };
};
exports.Rotate = props => {
    data.rotation.set(props.rotation);
    return {
        rotation: data.rotation,
        onTap() {
            framer_1.animate.spring(data.rotation, data.rotation.get() + 90, {
                tension: 250,
                friction: 20,
            });
        },
    };
};
exports.Fade = props => {
    data.opacity.set(props.opacity);
    return {
        opacity: data.opacity,
        onTap() {
            framer_1.animate.linear(data.opacity, 0, 0.2);
        },
    };
};
exports.FlipOutput = () => {
    return {
        rotationY: data.rotationY,
    };
};
exports.FlipInput = () => {
    return {
        onTap() {
            const toggle = data.toggle;
            framer_1.animate.spring({ rotationY: data.rotationY }, {
                rotationY: toggle ? 360 : 0,
            }, { tension: 200, friction: 20 });
            data.toggle = !toggle;
        },
    };
};
