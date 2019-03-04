"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 * A controller for Framer X's Page component.
 */
class PageComponentController extends index_1.default {
    constructor(props = {}) {
        super(Object.assign({ currentPage: 0, totalPages: Infinity }, props));
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
        this.syncCurrentPage = (currentPage) => {
            if (currentPage === this.state.currentPage)
                return;
            this.setState({ currentPage });
        };
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
        this.setTotalPages = (props) => {
            let totalPages;
            if (typeof props === 'number') {
                totalPages = props;
            }
            else if (props.children) {
                totalPages = props.children[0].props.children.length;
            }
            else {
                console.warn('PageComponentController.setTotalPages expects either a number or the props from a page component.');
            }
            if (totalPages !== this.totalPages) {
                this.setState({
                    totalPages,
                });
            }
        };
        /**
         * Change the pager's current page number by a given number of pages.
         * @param {number} delta How far forward or backward to move.
         */
        this.changePage = (delta) => {
            let next = this.state.currentPage + delta;
            return this.setPage(next);
        };
        /**
         *  Set the pager's current page to a given number.
         * @param {number} currentPage The new current page
         */
        this.setPage = (currentPage) => {
            if (currentPage >= 0 && currentPage < this.state.totalPages) {
                this.setState({ currentPage });
            }
            return this.currentPage;
        };
        /**
         * Move to the next page.
         */
        this.nextPage = () => {
            return this.changePage(1);
        };
        /**
         * Move to the previous page.
         */
        this.prevPage = () => {
            return this.changePage(-1);
        };
    }
    /**
     * Get or set the controller's progress from the first page (0) to
     * the last page (1).
     */
    get progress() {
        return this.state.currentPage / (this.state.totalPages - 1);
    }
    set progress(progress) {
        const { totalPages } = this.state;
        progress = Math.max(Math.min(progress, 1), 0);
        this.setPage(Math.round((totalPages - 1) * progress));
    }
    /**
     * Get or set the controller's `state.currentPage` value.
     * The result will be clamped between zero and the total
     * number of pages.
     */
    get currentPage() {
        return this.state.currentPage;
    }
    set currentPage(currentPage) {
        this.setPage(currentPage);
    }
    get totalPages() {
        return this.state.totalPages;
    }
}
exports.PageComponentController = PageComponentController;
