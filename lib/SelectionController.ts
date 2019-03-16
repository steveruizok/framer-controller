import { Controller } from "./Controller"
import { without } from "./utils"

type Options = Partial<State>

interface State {
	selected?: any | any[]
	validation?: (item: any | any[]) => boolean
	toggle?: boolean
	multiple?: boolean
}

export class SelectionController extends Controller<State> {
	constructor(options: Options = {} as Options) {
		super({
			selected: castArray(options.multiple, options.selected),
			validation: () => true,
			toggle: false,
			...options,
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
					return this.deselect(item)
				}
			} else {
				selected = [...selected, item]
			}
		} else {
			if (selected === item) {
				if (toggle) {
					return this.deselect(item)
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

		if (multiple && selected.includes(item)) {
			selected = without(selected, item)
		} else if (selected === item) {
			selected = null
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
		return this.state.toggle
	}

	set toggle(toggle: boolean) {
		this.setState({ toggle })
	}

	get multiple() {
		return this.state.multiple
	}

	set multiple(multiple: boolean) {
		this.setState({ multiple })
	}

	get validation() {
		return this.state.validation
	}

	set validation(validation: (item: any | any[]) => boolean) {
		this.setState({
			validation,
		})
	}
}

const castArray = (multiple, selected) => {
	if (selected === undefined) {
		return multiple ? [] : null
	} else {
		if (multiple) {
			return Array.isArray(selected) ? selected : [selected]
		}

		return selected
	}
}
