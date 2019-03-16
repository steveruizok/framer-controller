import { Controller } from "./Controller"

export type ValuesOf<T extends any[]> = T[number]

interface Options {
	items: Array<string | number>
	loop?: boolean
}

type Item = ValuesOf<Options["items"]>

interface State extends Options {
	order?: { [key in ValuesOf<Options["items"]>]: number }
}

/**
 * Control a set of index values for a given set of Frames.
 */
export class IndexController extends Controller<State> {
	constructor(options: Options = { items: [] } as Options) {
		super({
			order: options.items.reduce((a, c, i) => ({ ...a, [c]: i }), {}),
			loop: false,
			...options,
		})
	}

	/**
	 * Swap the order of two items.
	 */
	private swapValues(to: number, from: number) {
		let { order } = this.state
		if (to === from) return

		for (let key in order) {
			if (order[key] === to) {
				order[key] = from
			} else if (order[key] === from) {
				order[key] = to
			}
		}

		this.setState({ order })
	}

	public swap(itemA: Item, itemB: Item) {
		let { order } = this.state
		this.swapValues(order[itemA], order[itemB])
	}

	/**
	 * Send an item forward by in the order.
	 */
	public moveForward = (item: Item) => {
		let { items, order } = this.state
		const from = order[item]

		if (!from && from < 0) return

		let to = from + 1

		if (this.loop) {
			to = (to + this.max) % this.max
		}

		if (to > items.length - 1) return

		this.swapValues(to, from)
	}

	/**
	 * Send an item backward in the order.
	 */
	public moveBackward = (item: Item) => {
		let { order } = this.state
		const from = order[item]

		if (!from && from < 0) return

		let to = from - 1

		if (this.loop) {
			to = (to + this.max) % this.max
		}

		if (to < 0) return

		this.swapValues(to, from)
	}

	/**
	 * Send an item forward to the top of the order.
	 */
	public moveToFront = (item: Item) => {
		let { items, order } = this.state
		const from = order[item]

		if (!from && from < 0) return

		const to = items.length - 1

		if (to === from) return

		for (let key in order) {
			if (order[key] === from) {
				order[key] = to
			} else if (order[key] > from) {
				order[key]--
			}
		}

		this.setState({ order })
	}

	/**
	 * Send an item back to the bottom of the order.
	 */
	public moveToBack = (item: Item) => {
		let { order } = this.state
		const from = order[item]

		if (!from && from < 0) return

		const to = 0

		if (to === from) return

		for (let key in order) {
			if (order[key] === from) {
				order[key] = to
			} else if (order[key] < from) {
				order[key]++
			}
		}
		this.setState({ order })
	}

	/**
	 * The minimum index for an item in this controller.
	 */
	get min() {
		return 0
	}

	/**
	 * The maximum index for an item in this controller.
	 */
	get max() {
		return this.items.length
	}

	/**
	 * The current order of items.
	 */
	get order() {
		return this.state.order
	}

	set order(order: { [key in ValuesOf<Options["items"]>]: number }) {
		this.setState({
			order,
		})
	}

	/**
	 * The controller's current items.
	 */
	get items() {
		return this.state.items
	}

	set items(items: Array<string | number>) {
		this.setState({
			items,
			order: items.reduce((a, c, i) => ({ ...a, [c]: i }), {}),
		})
	}

	/**
	 * Whether this controller is set to loop values (e.g. back from min to max).
	 */
	get loop() {
		return this.state.loop
	}

	set loop(loop: boolean) {
		this.setState({ loop })
	}
}
