import { Controller } from "./Controller";
declare type Options = Partial<State>;
interface State {
    selected?: any | any[];
    validation?: (item: any | any[]) => boolean;
    toggle?: boolean;
    multiple?: boolean;
}
export declare class SelectionController extends Controller<State> {
    constructor(options?: Options);
    /**
     * Select the given item. (If toggle is enabled, )
     */
    select: (item: any) => any;
    /**
     * Deselect a given item.
     */
    deselect: (item: any) => void;
    /**
     * Check whether a given item is selected.
     */
    isSelected: (item: any) => any;
    /**
     * Clear all selections.
     */
    clear: () => void;
    readonly hasSelected: boolean;
    readonly selected: any;
    toggle: boolean;
    multiple: boolean;
    validation: (item: any | any[]) => boolean;
}
export {};
