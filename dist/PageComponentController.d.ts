import Controller from './index';
/**
 * A controller for Framer X's Page component.
 *
 * @export
 * @class PageComponentController
 * @extends {Controller<{
 * 	currentPage: number
 * }>}
 */
export declare class PageComponentController extends Controller<{
    currentPage: number;
}> {
    pagesTotal: number;
    /**
     * An event handler that syncs a page component with the controller.
     * @param {number} currentPage - The pager's current page.
     */
    onChangePage: (currentPage: number) => void;
    /**
     * @description - Change the pager's current page by a given number of pages.
     * @param {number} delta - How far forward or backward to move.
     * @memberof PageComponentController
     */
    changePage: (delta: number) => void;
    /**
     * @description - Set the pager's current page.
     * @param {number} currentPage - The new current page
     * @memberof PageComponentController
     */
    setPage: (currentPage: number) => void;
    /**
     * @description - Set the total number of pages.
     * @param {*} props - Either a number or the props of a page component.
     * @memberof PageComponentController
     */
    setTotalPages: (props: any) => void;
    /**
     * @description - Move to the next page.
     * @memberof PageComponentController
     */
    nextPage: () => void;
    /**
     * @description = Move to the previous page.
     * @memberof PageComponentController
     */
    prevPage: () => void;
    /**
     * @description - The pager's progress from beginning (0) to end (1).
     * @memberof PageComponentController
     */
    /**
    * @description - Set the pager's page using progress, rather than a given page number.
    * @memberof PageComponentController
    */
    progress: number;
}
