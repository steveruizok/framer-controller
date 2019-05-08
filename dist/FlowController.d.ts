/// <reference types="react" />
import { Controller } from './Controller';
interface Directions {
    forward: string;
    backward: string;
}
interface SwipeDirections {
    up: string;
    right: string;
    down: string;
    left: string;
}
interface Config {
    current?: number;
    stack?: number[];
    overlay?: number;
    overlays?: number[];
    pages?: any[];
    variants?: {
        behind: React.CSSProperties | any;
        current: React.CSSProperties | any;
        ahead: React.CSSProperties | any;
    };
    swipeBack?: keyof SwipeDirections;
    swipeDistance?: number;
}
interface State extends Config {
    direction: keyof Directions;
    root: boolean;
    onSwipeUp: (event: any) => void;
    onSwipeRight: (event: any) => void;
    onSwipeDown: (event: any) => void;
    onSwipeLeft: (event: any) => void;
    onCloseOverlay: () => void;
}
export declare class FlowController extends Controller<State> {
    constructor(config?: Config);
    /**
     * Check a swipe to see if the component should go back to the previous screen.
     */
    private handleSwipe;
    /**
     * Connect a FlowComponent to this controller via its override props.
     */
    onConnect: (state: any, props: any) => any;
    /** Find a child with a given prop / value pair somewhere in its children */
    getIndexOfPageWithPropInDescendants: (prop: string, value: string) => number;
    /**
     * Show a page with a given index (in the pages array).
     */
    showPageAtIndex: (index: number, direction?: "forward" | "backward") => void;
    /**
     * Show a new page, using its FlowComponentScreen name or index in the pages array.
     * @example
     * controller.showNext("myPage")
     * controller.showNext(0)
     */
    showNext: (page: string | number, direction?: "forward" | "backward") => void;
    /** Show the previous index. */
    showPrevious: () => void;
    /** Display an overlay */
    showOverlay: (page: string | number) => void;
    /** Close the current overlay */
    closeOverlay: () => void;
    /** Start a new stack with the given screen */
    startStack: (page: string | number, direction?: "forward" | "backward") => void;
    /** Show the first item on the stack */
    showRoot: () => void;
    pages: any[];
    readonly root: boolean;
    readonly stack: number[];
    readonly current: number;
    readonly direction: "forward" | "backward";
    readonly pagesTotal: number;
}
export {};
