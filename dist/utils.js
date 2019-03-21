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
