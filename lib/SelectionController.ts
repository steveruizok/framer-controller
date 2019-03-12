import { Controller } from "./Controller"
import { without } from "./utils"

type Config = {
	selected?: any | any[]
	validation?: (item: any | any[]) => boolean
	toggle?: boolean
	multiple?: boolean
}

export class SelectionController extends Controller<Config> {
	constructor(config: Config = {} as Config) {
		super({
			selected: null,
			validation: null,
			toggle: false,
			...config,
		})
	}

	/**
	 * Select the given item. (If toggle is enabled, )
	 */
	select = (item: any) => {
		const { toggle, validation, multiple } = this
		let { selected } = this

		if (validation && !validation(item)) {
			return selected
		}

		if (multiple) {
			if (selected.includes(item)) {
				if (toggle) {
					selected = without(selected, item)
				} else {
					return selected
				}
			} else {
				selected = [...selected, item]
			}
		} else {
			if (selected === item) {
				if (toggle) {
					selected = null
				} else {
					return selected
				}
			} else {
				selected = item
			}
		}

		this.setState({ selected })
	}

	/**
	 * Deselect a given item.
	 */
	deselect = (item: any) => {
		const { multiple } = this
		let { selected } = this

		if (multiple) {
			if (selected.includes(item)) {
				selected = without(selected, item)
			} else {
				return selected
			}
		} else {
			if (selected === item) {
				selected = null
			} else {
				return selected
			}
		}

		this.setState({ selected })
	}

	/**
	 * Check whether a given item is selected.
	 */
	isSelected = (item: any) => {
		const { multiple, selected } = this

		if (multiple) {
			return selected.includes(item)
		}

		return selected === item
	}

	/**
	 * Clear all selections.
	 */
	clear = () => {
		const { multiple } = this
		let { selected } = this

		selected = multiple ? [] : null

		this.setState({ selected })
	}

	get hasSelected() {
		const { selected, multiple } = this

		if (multiple) {
			return Array.isArray(selected) && selected.length > 0
		} else {
			return selected !== undefined && selected !== null
		}
	}

	get selected() {
		return this.state.selected
	}

	get toggle() {
		return this.state.selected
	}

	get multiple() {
		return this.state.multiple
	}

	get validation() {
		return this.state.validation
	}
}
