import Controller from "./index"

interface Props {
	currentPage?: number
	totalPages?: number
}

/**
 * A controller for Framer X's Page component.
 */
export class PageController extends Controller<Props> {
	constructor(props: Props = {}) {
		super({
			currentPage: 0,
			totalPages: Infinity,
			...props,
		})
	}

	protected onConnect = (props: any) => {
		let totalPages = props.children[0].props.children.length

		if (totalPages !== this.totalPages) {
			this.setState({
				totalPages,
			})
		}
	}

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
	public syncCurrentPage = (currentPage: number) => {
		if (currentPage === this.state.currentPage) return
		this.setState({ currentPage })
	}

	/**
	 * Change the pager's current page number by a given number of pages.
	 * @param {number} delta How far forward or backward to move.
	 */
	public changePage = (delta: number) => {
		let next = this.state.currentPage + delta
		return this.setCurrentPage(next)
	}

	/**
	 *  Set the pager's current page to a given number.
	 * @param {number} currentPage The new current page
	 */
	public setCurrentPage = (currentPage: number) => {
		if (currentPage >= 0 && currentPage < this.state.totalPages) {
			this.setState({ currentPage })
		}

		return this.currentPage
	}

	/**
	 * Move to the next page.
	 */
	public nextPage = () => {
		return this.changePage(1)
	}

	/**
	 * Move to the previous page.
	 */
	public prevPage = () => {
		return this.changePage(-1)
	}

	/**
	 * Get or set the controller's progress from the first page (0) to
	 * the last page (1).
	 */
	get progress() {
		return this.state.currentPage / (this.state.totalPages - 1)
	}

	set progress(progress: number) {
		const { totalPages } = this.state
		progress = Math.max(Math.min(progress, 1), 0)
		this.setCurrentPage(Math.round((totalPages - 1) * progress))
	}

	/**
	 * Get or set the controller's `state.currentPage` value.
	 * The result will be clamped between zero and the total
	 * number of pages.
	 */
	get currentPage() {
		return this.state.currentPage
	}

	set currentPage(currentPage: number) {
		this.setCurrentPage(currentPage)
	}

	get totalPages() {
		return this.state.totalPages
	}
}
