import anime from "animejs";
import { State, AnimateOptions } from "./types";
/**
 * A Controller provides an interface for updating a Framer X Data object.
 */
export declare class Controller<T> {
    protected _isAnimating: boolean;
    protected _animation?: anime.AnimeInstance;
    private _initial;
    private _state;
    private _connected;
    /**
     * Creates a new instance of Controller.
     */
    constructor(initial: T);
    /**
     * A method that fires automatically after a controller's state
     * is reset using the `reset` method.
     */
    protected onReset: (state?: Partial<T & {
        controller?: any;
    }>, connected?: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * A method that fires automatically after each state change.
     */
    protected onUpdate: (state?: Partial<T & {
        controller?: any;
    }>, connected?: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * A callback that fires automatically after the controller is
     * connected to data using `connect` method.
     */
    protected onConnect: (state?: Partial<T & {
        controller?: any;
    }>, connected?: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Connect this controller to a component or set of props. This
     * could be called from a component's `onComponentDidMount` method,
     * or using the props from an override.
     */
    connect: (connected: any) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Set the controller's state.
     */
    setState: (state?: Partial<T & {
        controller?: any;
    }>) => Partial<T & {
        controller?: any;
    }>;
    /**
     * Animate state using animejs.
     */
    animate: (options: AnimateOptions | Partial<T & {
        controller?: any;
    }> | {
        [key: string]: any;
    }, target?: keyof T | "controller") => anime.AnimeInstance;
    /**
     * Stop the current animation.
     */
    stopAnimation: () => void;
    /**
     * Pause the current animation.
     */
    pauseAnimation: () => void;
    /**
     * Resume the current animation.
     */
    resumeAnimation: () => void;
    /**
     * Seek the current animation to a given normalised point.
     */
    seekAnimation: (value: number, frame?: boolean, pause?: boolean) => void;
    /**
     * Return the state to its initial value.
     */
    reset: () => Partial<T & {
        controller?: any;
    }>;
    /**
     * The controller's current state.
     */
    readonly state: State<T>;
    /**
     * The data connected using `controller.connect`.
     */
    readonly connected: any;
    /**
     * The controller's current animation.
     */
    readonly animation: anime.AnimeInstance;
    /**
     * Whether the controller is animating.
     */
    readonly isAnimating: boolean;
}
