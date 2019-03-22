import { Data, animate, Override, Animatable } from "framer"
import { ScrollController } from "../../../lib"

const controller = new ScrollController({
	throttle: 32,
})

export const Scroll: Override = props => {
	controller.connect(props)
	return {
		// contentOffsetX: -controller.scrollX,
		// contentOffsetY: -controller.scrollY,
		onMove: controller.handleScroll,
		onTapStart: controller.stopAnimation,
		onClick: () => controller.scrollToMarker("ok", "top"),
	}
}

export const Marker: Override = props => {
	const marker = controller.markers[props.id]
	if (!marker) {
		return
	}

	if (props.id === "id_EMHa00mHt") {
		console.log(marker.intersect.y)
		return {
			left: 132 + marker.intersect.y * -100,
			opacity: marker.intersect.y,
		}
	}
}
