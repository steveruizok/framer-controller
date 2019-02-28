import Controller from './index'

/**
 * A controller for Framer X's Page component.
 *
 * @export
 * @class PageComponentController
 * @extends {Controller<{
 * 	currentPage: number
 * }>}
 */
export class PageComponentController extends Controller<{
	currentPage: number
}> {
	pagesTotal = Infinity

	/**
	 * An event handler that syncs a page component with the controller.
	 * @param {number} currentPage - The pager's current page.
	 */
	onChangePage = (currentPage: number) => {
		if (currentPage === this.state.currentPage) return
		this.setState({ currentPage })
	}

	/**
	 * @description - Change the pager's current page by a given number of pages.
	 * @param {number} delta - How far forward or backward to move.
	 * @memberof PageComponentController
	 */
	changePage = (delta: number) => {
		let next = this.state.currentPage + delta
		this.setPage(next)
	}

	/**
	 * @description - Set the pager's current page.
	 * @param {number} currentPage - The new current page
	 * @memberof PageComponentController
	 */
	setPage = (currentPage: number) => {
		if (currentPage >= 0 && currentPage < this.pagesTotal) {
			this.setState({
				currentPage,
			})
		}
	}

	/**
	 * @description - Set the total number of pages.
	 * @param {*} props - Either a number or the props of a page component.
	 * @memberof PageComponentController
	 */
	setTotalPages = (props: any) => {
		if (typeof props === 'number') {
			this.pagesTotal = props
		} else if (props.children) {
			this.pagesTotal = props.children[0].props.children.length
		} else {
			console.warn(
				'PageComponentController.setTotalPages expects either a number or the props from a page component.'
			)
		}
	}

	/**
	 * @description - Move to the next page.
	 * @memberof PageComponentController
	 */
	nextPage = () => {
		this.changePage(1)
	}

	/**
	 * @description = Move to the previous page.
	 * @memberof PageComponentController
	 */
	prevPage = () => {
		this.changePage(-1)
	}

	/**
	 * @description - The pager's progress from beginning (0) to end (1).
	 * @memberof PageComponentController
	 */
	get progress() {
		return this.state.currentPage / (this.pagesTotal - 1)
	}

	/**
	 * @description - Set the pager's page using progress, rather than a given page number.
	 * @memberof PageComponentController
	 */
	set progress(progress: number) {
		this.setPage(Math.round((this.pagesTotal - 1) * progress))
	}
}
