import { Override } from "framer"
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

export const ScrollToButton: Override = props => {
	return {
		onClick() {
			controller.scrollToPoint({ x: 150, y: 500 })
		},
	}
}

export const ScrollToMarkerButton: Override = props => {
	return {
		onClick() {
			controller.scrollToMarker("id_GgNM8lDZQ", ["top", "left"], 32)
		},
	}
}

export const ScrollBox: Override = props => {
	const marker = controller.markers[props.id]
	if (!marker) return

	return {
		$clip_y: marker.clip.y,
		$clip_x: marker.clip.x,
		$visible: marker.visible.toString(),
		$intersect_x: marker.intersect.x.toFixed(2),
		$intersect_y: marker.intersect.y.toFixed(2),
		$offset_top: marker.offset.top.toFixed(2),
		$offset_right: marker.offset.right.toFixed(2),
		$offset_bottom: marker.offset.bottom.toFixed(2),
		$offset_left: marker.offset.left.toFixed(2),
		$absolute_top: marker.absolute.top.toFixed(2),
		$absolute_right: marker.absolute.right.toFixed(2),
		$absolute_bottom: marker.absolute.bottom.toFixed(2),
		$absolute_left: marker.absolute.left.toFixed(2),
		$progress_x: marker.progress.x.toFixed(2),
		$progress_y: marker.progress.y.toFixed(2),
	}
}

export const ControllerState: Override = () => ({
	$progress_x: controller.progress.x.toFixed(2),
	$progress_y: controller.progress.y.toFixed(2),
	$direction_x: controller.direction.x,
	$direction_y: controller.direction.y,
	$point_x: controller.scrollPoint.x.toFixed(2),
	$point_y: controller.scrollPoint.y.toFixed(2),
})
