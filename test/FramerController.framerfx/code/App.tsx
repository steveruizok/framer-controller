import { Override } from 'framer'
import Controller from '../../../lib'

function randomColor() {
	return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
}

const controller = new Controller({ background: '#CCCCCC' })

export const isColorField: Override = () => controller.state

export const isButton: Override = () => ({
	onClick() {
		const background = randomColor()
		controller.setState({ background })
	},
})

export const isUndoButton: Override = () => ({
	disabled: controller.historyPosition === 0,
	onClick: controller.undo,
})

export const isRedoButton: Override = () => ({
	disabled: controller.historyPosition === controller.history.length - 1,
	onClick: controller.redo,
})

export const isColorLabel: Override = () => ({
	$text: controller.state.background,
})
