/// <reference types="react" />
import Controller from "./index";
interface Directions {
    forward: string;
    backward: string;
}
interface Config {
    current?: number;
    pagesTotal?: number;
    stack?: number[];
    transitions?: {
        behind: React.CSSProperties;
        current: React.CSSProperties;
        ahead: React.CSSProperties;
    };
}
interface State extends Config {
    direction: keyof Directions;
    root: boolean;
}
export declare class FlowController extends Controller<State> {
    constructor(config?: Config);
    /**
     * Connect a FlowComponent to this controller via its override props.
     */
    onConnect: (_: any, props: any) => void;
    /**
     * Show a new index.
     */
    showNext: (index: number) => void;
    /**
     * Show the previous index.
     */
    showPrevious: () => void;
    /**
     * Clear the current stack, setting the current index as root.
     */
    reset(): void;
    readonly current: number;
    readonly direction: "forward" | "backward";
    /**
    * Set the total number of pages.
    */
    pagesTotal: number;
    readonly root: boolean;
}
export {};
