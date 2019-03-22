import { Override } from "framer"
import { ScrollController } from "../../../lib"

const controller = new ScrollController({
	throttle: 32,
})

export const Scroll: Override = props => {
	controller.connect(props)
	return {
		...controller.contentOffset,
		...controller.state,
	}
}

export const ScrollToMarker1: Override = props => {
	return {
		onClick: () => controller.scrollToMarker("Marker1", "top"),
	}
}

export const ScrollToMarker2: Override = props => {
	return {
		onClick: () => controller.scrollToMarker("Marker2", ["top", "left"], 32),
	}
}

export const ScrollToMarker3: Override = props => {
	return {
		onClick: () => controller.scrollToMarker("Marker3", ["top", "left"], 53),
	}
}
