import { AnimationControls } from 'framer';
/**
 * # createScrollControls
 * Returns a collection of hooks for using the state of a Scroll component...
 * - `useScrollConnector` - Connects a Scroll component to the other hooks.
 * - `useScrollState` - Returns the Scroll's state.
 * - `useScrollItemState` - Returns scroll information about a child of the Scroll's content.
 *
 * ... and also controls for settitng that state.
 * - `setScrollX`
 * - `setScrollY`,
 * - `setScrollPoint`,
 * - `scrollToPoint`,
 * ```tsx

  const {
    useScrollConnector,
    useScrollState,
    useScrollItemState,
    setScrollX,
    setScrollY,
    setScrollPoint,
    scrollToPoint,
  } = createScrollControls()
  ```*/
export declare function createScrollControls(options?: {
    scrollY?: number;
    scrollX?: number;
}): {
    useScrollConnector: (props?: any) => {
        contentOffsetX: import("framer-motion").MotionValue<number>;
        contentOffsetY: import("framer-motion").MotionValue<number>;
        scrollAnimate: AnimationControls;
        onScroll: ({ point, delta, offset, velocity }: {
            point: any;
            delta: any;
            offset: any;
            velocity: any;
        }) => void;
    };
    useScrollState: () => {
        component: any;
        content: any;
        direction: string;
        scrollY: number;
        scrollX: number;
        scrollPoint: {
            x: number;
            y: number;
        };
        velocity: {
            x: number;
            y: number;
        };
        progress: {
            x: number;
            y: number;
        };
        scrollFrame: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        scrollConstraints: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
    };
    useScrollItemState: (props: any) => {
        absolute: {
            x: number;
            y: number;
            midX: number;
            midY: number;
            maxX: number;
            maxY: number;
            height: number;
            width: number;
        };
        offset: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        intersect: {
            x: number;
            y: number;
        };
        travel: {
            x: number;
            y: number;
        };
        progress: {
            x: number;
            y: number;
        };
        clip: {
            x: string;
            y: string;
        };
    };
    setScrollX: (scrollX: number) => void;
    setScrollY: (scrollY: number) => void;
    setScrollPoint: (point: Point) => void;
    scrollToPoint: (point: Point & {
        transition?: {
            [key: string]: any;
        };
    }) => void;
};
declare type Point = {
    x: number;
    y: number;
};
export {};
