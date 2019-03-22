import { Data, animate, Override, Animatable } from "framer"
import { ScrollController } from "../../../lib"

const controller = new ScrollController({
	useMarkers: true,
})

export const Scroll: Override = props => {
	controller.connect(props)
	return {
		contentOffsetY: -controller.scrollY,
		contentOffsetX: -controller.scrollX,
		onMove: controller.handleScroll,
		onTapStart: controller.stopAnimation,
	}
}

export const Marker: Override = props => {
	const marker = controller.getMarker(props)
	console.log(marker)
	return {}
}
