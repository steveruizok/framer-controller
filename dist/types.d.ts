import anime from 'animejs';
export declare type State<T> = Partial<T & {
    controller?: any;
}>;
export declare type FunctionBasedParameter = (index: number, length: number) => number;
export declare type AnimeCallbackFunction = (anim: anime.AnimeInstance) => void;
export declare type EasingOptions = 'linear' | 'easeInQuad' | 'easeInCubic' | 'easeInQuart' | 'easeInQuint' | 'easeInSine' | 'easeInExpo' | 'easeInCirc' | 'easeInBack' | 'easeInElastic' | 'easeOutQuad' | 'easeOutCubic' | 'easeOutQuart' | 'easeOutQuint' | 'easeOutSine' | 'easeOutExpo' | 'easeOutCirc' | 'easeOutBack' | 'easeOutElastic' | 'easeInOutQuad' | 'easeInOutCubic' | 'easeInOutQuart' | 'easeInOutQuint' | 'easeInOutSine' | 'easeInOutExpo' | 'easeInOutCirc' | 'easeInOutBack' | 'easeInOutElastic';
export declare type AnimateOptions = {
    duration?: number | FunctionBasedParameter;
    delay?: number | FunctionBasedParameter;
    elasticity?: number | FunctionBasedParameter;
    round?: number | boolean | FunctionBasedParameter;
    easing?: EasingOptions | string | ReadonlyArray<number>;
    begin?: AnimeCallbackFunction;
    run?: AnimeCallbackFunction;
    update?: AnimeCallbackFunction;
    complete?: AnimeCallbackFunction;
};
export interface Directions {
    x: {
        left: string;
        right: string;
        none: string;
    };
    y: {
        up: string;
        down: string;
        none: string;
    };
}
export declare type Point = {
    x: number;
    y: number;
};
export interface Rect {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface Frame extends Rect {
    height: number;
    width: number;
}
export interface MarkerDetails extends Frame {
    visible: boolean;
}
export declare type MarkerState = {
    absolute: Rect;
    offset: Rect;
    intersect: Point;
    clip: {
        x: 'none' | 'both' | 'both-left' | 'both-right' | 'left' | 'right';
        y: 'none' | 'both' | 'both-top' | 'both-bottom' | 'top' | 'bottom';
    };
    progress: Point;
    visible: boolean;
};
export declare type Edge = 'top' | 'bottom' | 'left' | 'right';
