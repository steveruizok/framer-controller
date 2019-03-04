import Controller from './index';
interface Props {
    currentPage?: number;
    totalPages?: number;
}
/**
 * A controller for Framer X's Page component.
 */
export declare class PageComponentController extends Controller<Props> {
    constructor(props?: Props);
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
     * Set the total number of pages in the controller.
     * @param {*} props Either the `number` of pages or the props of a page component.
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
    setTotalPages: (props: any) => void;
    /**
     * Change the pager's current page number by a given number of pages.
     * @param {number} delta How far forward or backward to move.
     */
    changePage: (delta: number) => number;
    /**
     *  Set the pager's current page to a given number.
     * @param {number} currentPage The new current page
     */
    setPage: (currentPage: number) => number;
    /**
     * Move to the next page.
     */
    nextPage: () => number;
    /**
     * Move to the previous page.
     */
    prevPage: () => number;
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
}
export {};
