import { Controller } from "./Controller";
interface Config {
    currentPage?: number;
    totalPages?: number;
    loop?: boolean;
}
interface State extends Config {
    onChangePage: (currentPage: any) => void;
}
/**
 * A controller for Framer X's Page component.
 */
export declare class PageController extends Controller<State> {
    constructor(config?: Config);
    protected onConnect: (state: any, props: any) => Partial<State & {
        controller?: any;
    }>;
    /**
     * An event handler that syncs a page component with the controller.
     * @param {number} currentPage The pager's current page.
   * @example
   * ```
const isPager: Override = (props) => {
  controller.setTotalPages(props)
  return {
    currentPage: controller.state.currentPage,
    onChangePage: controller.syncCurrentPage
  }
}```
     */
    syncCurrentPage: (currentPage: number) => void;
    /**
     * Change the pager's current page number by a given number of pages.
     * @param {number} delta How far forward or backward to move.
     */
    changePage: (delta: number) => number;
    /**
     *  Set the pager's current page to a given number.
     * @param {number} currentPage The new current page
     */
    snapToPage: (currentPage: number) => number;
    /**
     *  Change the page to the next page in a given direction ('right' or 'left').
     * @param {number} currentPage The new current page
     */
    snapToNextPage: (direction?: "left" | "right") => number;
    /**
     * Get or set the controller's progress from the first page (0) to
     * the last page (1).
     */
    progress: number;
    /**
     * Get or set the controller's `state.currentPage` value.
     * The result will be clamped between zero and the total
     * number of pages.
     */
    currentPage: number;
    readonly totalPages: number;
    loop: boolean;
}
export {};
