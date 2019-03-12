"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Controller_1 = require("./Controller");
/**
 * A controller for Framer X's Page component.
 */
class PageController extends Controller_1.Controller {
    constructor(config = {}) {
        super(Object.assign({ currentPage: 0, totalPages: Infinity, loop: false, onChangePage: p => this.syncCurrentPage(p) }, config));
        this.onConnect = (state, props) => {
            let totalPages = props.children[0].props.children.length;
            if (totalPages !== this.totalPages) {
                this.setState({
                    totalPages,
                });
            }
            return this.state;
        };
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
         * Change the pager's current page number by a given number of pages.
         * @param {number} delta How far forward or backward to move.
         */
        this.changePage = (delta) => {
            let next = this.state.currentPage + delta;
            return this.snapToPage(next);
        };
        /**
         *  Set the pager's current page to a given number.
         * @param {number} currentPage The new current page
         */
        this.snapToPage = (currentPage) => {
            if (this.loop) {
                let max = this.state.totalPages;
                currentPage = (max + currentPage) % max;
            }
            if (currentPage >= 0 && currentPage < this.state.totalPages) {
                this.setState({ currentPage });
            }
            return this.currentPage;
        };
        /**
         *  Change the page to the next page in a given direction ('right' or 'left').
         * @param {number} currentPage The new current page
         */
        this.snapToNextPage = (direction = "right") => {
            const deltas = {
                left: -1,
                right: 1,
            };
            return this.changePage(deltas[direction]);
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
        this.snapToPage(Math.round((totalPages - 1) * progress));
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
        this.snapToPage(currentPage);
    }
    get totalPages() {
        return this.state.totalPages;
    }
    get loop() {
        return this.state.loop;
    }
    set loop(loop) {
        this.setState({ loop });
    }
}
exports.PageController = PageController;
