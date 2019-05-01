import anime from 'animejs';
import { MotionValue } from 'framer';
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
export declare type Tracked = {
    absolute: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    offset: {
        top: MotionValue<number>;
        bottom: MotionValue<number>;
        left: MotionValue<number>;
        right: MotionValue<number>;
    };
    intersect: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    clip: {
        x: MotionValue<'contain' | 'overflow' | 'clip-left' | 'clip-right' | 'left' | 'right'>;
        y: MotionValue<'contain' | 'overflow' | 'clip-top' | 'clip-bottom' | 'top' | 'bottom'>;
    };
    travel: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    progress: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
};
export declare type Edge = 'top' | 'bottom' | 'left' | 'right';
export declare class ScrollController {
    private _scrollPoint;
    private _direction;
    private _progress;
    private _scrollComponent;
    private _content;
    private _scrollSize;
    private _contentSize;
    private _tracked;
    private _animation?;
    private _isAnimating;
    connect: (props: any) => void;
    private setControllerValues;
    connectFrame: (props: any, margin?: {
        x: number;
        y: number;
    }) => Tracked;
    scrollToPoint: (point: {
        x: number;
        y: number;
    }, options?: {
        [key: string]: any;
    }) => anime.AnimeInstance;
    scrollToFrame: (id: string, edge: "left" | "right" | "top" | "bottom" | import("./types").Edge[], offset?: number, options?: {
        [key: string]: any;
    }) => anime.AnimeInstance;
    readonly overrides: {
        contentOffsetX: any;
        contentOffsetY: any;
        height: any;
        width: any;
    };
    readonly scrollComponent: any;
    readonly content: any;
    readonly contentSize: {
        height: number;
        width: number;
    };
    readonly scrollSize: {
        height: any;
        width: any;
    };
    readonly direction: {
        x: any;
        y: any;
    };
    readonly progress: {
        x: any;
        y: any;
    };
    readonly scrollPoint: {
        x: any;
        y: any;
    };
    readonly tracked: Map<string, Tracked>;
    readonly animation: anime.AnimeInstance;
    readonly isAnimating: boolean;
}
