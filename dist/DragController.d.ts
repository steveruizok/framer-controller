import { Controller } from "./Controller";
import { MarkerDetails } from "./types";
interface DraggableDetails extends MarkerDetails {
    current?: number;
}
interface PositionDetails extends MarkerDetails {
    current?: string;
}
interface Options {
    horizontal: boolean;
    vertical: boolean;
    throttle?: number;
}
interface Props extends Options {
    draggingId?: string;
    draggables: {
        [key: string]: DraggableDetails;
    };
    positions: PositionDetails[];
    children: any[];
}
export declare class DragController<Options> extends Controller<Props> {
    private _content;
    private _flagged;
    constructor(options?: Options);
    onConnect: (_: any, props: any) => Partial<Props & {
        controller?: any;
    }>;
    private getChildren;
    private handleDragStart;
    private handleDragMove;
    private handleDragEnd;
    getDraggable: (props: any) => DraggableDetails;
    readonly content: any;
    readonly children: any[];
    readonly draggables: {
        [key: string]: DraggableDetails;
    };
    readonly positions: PositionDetails[];
    readonly draggingId: string;
}
export {};
