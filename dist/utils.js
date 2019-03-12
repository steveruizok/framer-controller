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
            return arr;
        acc.splice(index, 1);
        return acc;
    });
    return arr;
}
exports.without = without;
