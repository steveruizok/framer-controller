"use strict";
// Helpers
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a new array without the given item.
 * @param array
 * @param item
 */
function without(array, items) {
    let arr = [...array];
    if (!Array.isArray(items)) {
        items = [items];
    }
    arr = items.reduce((acc, item) => {
        let index = acc.indexOf(item);
        if (index < 0)
            return acc;
        acc.splice(index, 1);
        return acc;
    }, arr);
    return arr;
}
exports.without = without;
exports.throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function () {
        const context = this, args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        }
        else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};
exports.modulate = (value, from, to) => {
    const [fromLow, fromHigh] = from;
    const [toLow, toHigh] = to;
    const result = toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
    return Math.min(Math.max(toLow, result), toHigh);
};
exports.recursivelySearchForProp = (prop, parent, child) => {
    const ids = [];
    const results = [];
    const search = (p, c) => {
        const { props } = c;
        const { _overrideForwardingDescription: overrides } = props;
        if (props[prop]) {
            ids.push(props[prop]);
            results.push(p);
        }
        else if (overrides) {
            let flagged = Object.keys(overrides).find(k => overrides[k] === prop);
            if (flagged) {
                ids.push(props.id);
                results.push(p);
            }
        }
        if (Array.isArray(props.children)) {
            props.children.forEach((child) => search(c, child));
        }
        return false;
    };
    search(parent, child);
    return [ids, results];
};
exports.parseFrameFromChild = (parent, child) => {
    const { height: contentHeight, width: contentWidth } = parent.props;
    const { centerX, centerY, height, width } = child.props;
    const cx = parseFloat(centerX) / 100;
    const cy = parseFloat(centerY) / 100;
    return {
        centerX: contentWidth * cx,
        centerY: contentHeight * cy,
        top: contentHeight * cy - height / 2,
        bottom: contentHeight * cy + height / 2,
        left: contentWidth * cx - width / 2,
        right: contentWidth * cx + width / 2,
        height,
        width,
    };
};
