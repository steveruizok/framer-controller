import * as anime from 'animejs';
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
    connect: (props: any) => {
        contentOffsetX: MotionValue<number>;
        contentOffsetY: MotionValue<number>;
        height: MotionValue<number>;
        width: MotionValue<number>;
    };
    private setControllerValues;
    trackFrame: (props: any, margin?: {
        x: number;
        y: number;
    }) => Tracked;
    scrollToPoint: (point: {
        x: number;
        y: number;
    }, options?: {
        [key: string]: any;
    }) => anime.AnimeInstance;
    scrollToFrame: (id: string, edge: "left" | "right" | "top" | "bottom" | Edge[], offset?: number, options?: {
        [key: string]: any;
    }) => anime.AnimeInstance;
    readonly overrides: {
        contentOffsetX: MotionValue<number>;
        contentOffsetY: MotionValue<number>;
        height: MotionValue<number>;
        width: MotionValue<number>;
    };
    readonly scrollComponent: any;
    readonly content: any;
    readonly contentSize: {
        height: number;
        width: number;
    };
    readonly scrollSize: {
        height: MotionValue<number>;
        width: MotionValue<number>;
    };
    readonly direction: {
        x: MotionValue<"left" | "right" | "none">;
        y: MotionValue<"none" | "up" | "down">;
    };
    readonly progress: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    readonly scrollPoint: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    readonly tracked: Map<string, Tracked>;
    readonly animation: anime.AnimeInstance;
    readonly isAnimating: boolean;
}
