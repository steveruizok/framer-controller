import Controller from "../../../lib"
import { Override } from "framer"

const controller = new Controller({
	left: 0,
	subState: {
		top: 0,
	},
})

export const Animated: Override = () => {
	return {
		left: controller.state.left,
		onTap() {
			controller.animate({
				left: 200,
			})
		},
	}
}

export const Animated2: Override = () => {
	return {
		top: controller.state.subState.top,
		onTap() {
			controller.animate(
				{
					top: 200,
				},
				"subState"
			)
		},
	}
}

export const Label: Override = () => ({
	$value: controller.state.left,
})
