import { Controller } from "./Controller"

interface Config {
	currentPage?: number
	totalPages?: number
	loop?: boolean
}

interface State extends Config {
	onChangePage: (currentPage) => void
}

type Direction = keyof {
	left: string
	right: string
}

/**
 * A controller for Framer X's Page component.
 */
export class PageController extends Controller<State> {
	constructor(config: Config = {}) {
		super({
			currentPage: 0,
			totalPages: Infinity,
			loop: false,
			onChangePage: p => this.syncCurrentPage(p),
			...config,
		})
	}

	protected onConnect = (state: any, props: any) => {
		let totalPages = props.children[0].props.children.length

		if (totalPages !== this.totalPages) {
			this.setState({
				totalPages,
			})
		}

		return this.state
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
		return this.snapToPage(next)
	}

	/**
	 *  Set the pager's current page to a given number.
	 * @param {number} currentPage The new current page
	 */
	public snapToPage = (currentPage: number) => {
		if (this.loop) {
			let max = this.state.totalPages
			currentPage = (max + currentPage) % max
		}

		if (currentPage >= 0 && currentPage < this.state.totalPages) {
			this.setState({ currentPage })
		}

		return this.currentPage
	}

	/**
	 *  Change the page to the next page in a given direction ('right' or 'left').
	 * @param {number} currentPage The new current page
	 */
	public snapToNextPage = (direction: Direction = "right") => {
		const deltas = {
			left: -1,
			right: 1,
		}

		return this.changePage(deltas[direction])
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
		this.snapToPage(Math.round((totalPages - 1) * progress))
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
		this.snapToPage(currentPage)
	}

	get totalPages() {
		return this.state.totalPages
	}

	get loop() {
		return this.state.loop
	}

	set loop(loop: boolean) {
		this.setState({ loop })
	}
}
