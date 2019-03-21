/// <reference types="animejs" />
import { Controller } from "./Controller";
import { Edge, Point, Directions, MarkerState } from "./types";
interface Options {
    throttle?: number;
}
interface Props extends Options {
    scrollX: number;
    scrollY: number;
    direction: {
        x: keyof Directions["x"];
        y: keyof Directions["y"];
    };
    scrollPoint: Point;
    progress: Point;
    markers: {
        [key: string]: MarkerState;
    };
    onMove: (point: Point) => void;
}
export declare class ScrollController<Options> extends Controller<Props> {
    private _scrollComponent;
    private _content;
    private _direction;
    private _markerStates;
    private _scrollPoint;
    private _markersProps;
    constructor(options?: Options);
    onConnect: (_: any, props: any) => Partial<Props & {
        controller?: any;
    }>;
    /** Find a child with a given prop / value pair somewhere in its children */
    getMarkersFromContent: () => any;
    updateMarkers: () => void;
    handleScroll: (point: Point) => void;
    scrollToPosition: (point: Point, options?: {
        [key: string]: any;
    }) => import("animejs").AnimeInstance;
    scrollToMarker: (id: string, edge: "left" | "right" | "top" | "bottom" | Edge[], offset?: number, options?: {
        [key: string]: any;
    }) => import("animejs").AnimeInstance;
    scrollPoint: Point;
    scrollY: number;
    scrollX: number;
    readonly content: any;
    readonly markers: {
        [key: string]: MarkerState;
    };
    readonly direction: {
        x: "left" | "right" | "none";
        y: "none" | "up" | "down";
    };
    readonly progress: Point;
}
export {};
