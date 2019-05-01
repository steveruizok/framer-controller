/**
 * Return a new array without the given item.
 * @param array
 * @param item
 */
export declare function without(array: any[], items: any | any[]): any[];
export declare const throttle: (fn: (...params: any) => any, wait: number) => () => void;
export declare const modulate: (value: number, from: [number, number], to: [number, number]) => number;
export declare const recursivelySearchForProp: (prop: string, parent: any, child: any) => any[][];
export declare const parseFrameFromChild: (parent: any, child: any) => {
    centerX: number;
    centerY: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    height: any;
    width: any;
};
