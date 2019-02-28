"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 * A controller for Framer X's Page component.
 *
 * @export
 * @class PageComponentController
 * @extends {Controller<{
 * 	currentPage: number
 * }>}
 */
class PageComponentController extends index_1.default {
    constructor() {
        super(...arguments);
        this.pagesTotal = Infinity;
        /**
         * An event handler that syncs a page component with the controller.
         * @param {number} currentPage - The pager's current page.
         */
        this.onChangePage = (currentPage) => {
            if (currentPage === this.state.currentPage)
                return;
            this.setState({ currentPage });
        };
        /**
         * @description - Change the pager's current page by a given number of pages.
         * @param {number} delta - How far forward or backward to move.
         * @memberof PageComponentController
         */
        this.changePage = (delta) => {
            let next = this.state.currentPage + delta;
            this.setPage(next);
        };
        /**
         * @description - Set the pager's current page.
         * @param {number} currentPage - The new current page
         * @memberof PageComponentController
         */
        this.setPage = (currentPage) => {
            if (currentPage >= 0 && currentPage < this.pagesTotal) {
                this.setState({
                    currentPage,
                });
            }
        };
        /**
         * @description - Set the total number of pages.
         * @param {*} props - Either a number or the props of a page component.
         * @memberof PageComponentController
         */
        this.setTotalPages = (props) => {
            if (typeof props === 'number') {
                this.pagesTotal = props;
            }
            else if (props.children) {
                this.pagesTotal = props.children[0].props.children.length;
            }
            else {
                console.warn('PageComponentController.setTotalPages expects either a number or the props from a page component.');
            }
        };
        /**
         * @description - Move to the next page.
         * @memberof PageComponentController
         */
        this.nextPage = () => {
            this.changePage(1);
        };
        /**
         * @description = Move to the previous page.
         * @memberof PageComponentController
         */
        this.prevPage = () => {
            this.changePage(-1);
        };
    }
    /**
     * @description - The pager's progress from beginning (0) to end (1).
     * @memberof PageComponentController
     */
    get progress() {
        return this.state.currentPage / (this.pagesTotal - 1);
    }
    /**
     * @description - Set the pager's page using progress, rather than a given page number.
     * @memberof PageComponentController
     */
    set progress(progress) {
        this.setPage(Math.round((this.pagesTotal - 1) * progress));
    }
}
exports.PageComponentController = PageComponentController;
