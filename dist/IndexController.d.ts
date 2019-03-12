import { Controller } from "./Controller";
export declare type ValuesOf<T extends any[]> = T[number];
declare type Props = {
    items: Array<string | number>;
    order?: {
        [key in ValuesOf<Props["items"]>]: number;
    };
    loop?: boolean;
};
/**
 * Control a set of index values for a given set of Frames.
 */
export declare class IndexController extends Controller<Props> {
    constructor(props: Props);
    /**
     * Swap the order of two items.
     */
    private swapValues;
    /**
     * Send an item forward by in the order.
     */
    moveForward: (item: string | number) => void;
    /**
     * Send an item backward in the order.
     */
    moveBackward: (item: string | number) => void;
    /**
     * Send an item forward to the top of the order.
     */
    moveToFront: (item: string | number) => void;
    /**
     * Send an item back to the bottom of the order.
     */
    moveToBack: (item: string | number) => void;
    /**
     * The minimum index for an item in this controller.
     */
    readonly min: number;
    /**
     * The maximum index for an item in this controller.
     */
    readonly max: number;
    /**
     * The current order of items.
     */
    order: {
        [key in ValuesOf<Props["items"]>]: number;
    };
    /**
     * The controller's current items.
     */
    items: Array<string | number>;
    /**
     * Whether this controller is set to loop values (e.g. back from min to max).
     */
    loop: boolean;
}
export {};
