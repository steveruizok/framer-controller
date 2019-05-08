import { Controller } from './Controller';
/**
 * IntervalController's options
 */
interface Options {
    id?: string;
    delay?: number;
    paused?: boolean;
    cleanResume?: boolean;
    onChange?: () => void;
}
/**
 * IntervalController's state
 */
interface State extends Options {
    frame: number;
    paused: boolean;
}
export declare class IntervalController extends Controller<State> {
    _timeout: any;
    _ticking: boolean;
    _id: string;
    constructor(options?: Options);
    /**
     * Start the interval.
     *
     */
    start: () => void;
    /**
     * Stop the interval.
     *
     */
    pause: () => void;
    /**
     * Stop the interval.
     *
     */
    stop: () => void;
    /**
     * Toggle the controller from paused to unpaused.
     *
     */
    toggle: () => void;
    /**
     * Whether the controller is paused.
     *
     */
    paused: boolean;
    /**
     * The controller's delay between intervals.
     *
     */
    delay: number;
    /**
     * The controller's current frame.
     */
    readonly frame: number;
    protected clearTicker: () => void;
    /**
     * Begin a new interval.
     */
    protected tick: () => void;
}
export {};
