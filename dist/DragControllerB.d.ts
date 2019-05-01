import { Controller } from "./Controller";
interface Options {
    horizontal: boolean;
    vertical: boolean;
}
interface Props extends Options {
    draggingId?: string;
    children: any[];
    transition: string;
}
export declare class DragController<Options> extends Controller<Props> {
    private _content;
    private _draggables;
    private _positions;
    private _draggingId;
    constructor(options?: Options);
    onConnect: (_: any, props: any) => Partial<Props & {
        controller?: any;
    }>;
    private getChildren;
    private handleDragStart;
    private handleDragMove;
    private handleDragEnd;
    readonly draggingId: string;
    readonly content: any;
    readonly children: any[];
}
export {};
