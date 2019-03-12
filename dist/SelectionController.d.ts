import { Controller } from "./Controller";
declare type Config = {
    selected?: any | any[];
    validation?: (item: any | any[]) => boolean;
    toggle?: boolean;
    multiple?: boolean;
};
export declare class SelectionController extends Controller<Config> {
    constructor(config?: Config);
    /**
     * Select the given item. (If toggle is enabled, )
     */
    select: (item: any) => any;
    /**
     * Deselect a given item.
     */
    deselect: (item: any) => any;
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
    readonly toggle: any;
    readonly multiple: boolean;
    readonly validation: (item: any) => boolean;
}
export {};
