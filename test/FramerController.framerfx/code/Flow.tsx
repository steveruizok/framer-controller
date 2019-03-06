import { Override } from 'framer'
import { FlowController } from 'framer-controller'

const controller = new FlowController()

export const isFlow: Override = (props) => {
	controller.connect(props)
	return controller.state
}

export const prevButton: Override = () => ({
	onClick: controller.showPrevious,
	opacity: controller.root ? 0.5 : 1,
})

export const button0: Override = () => ({
	onClick() {
		controller.showNext(0)
	},
})

export const button1: Override = () => ({
	onClick() {
		controller.showNext(1)
	},
})

export const button2: Override = () => ({
	onClick() {
		controller.showNext(2)
	},
})
