import { Override } from "framer"
import { ScrollControllerDeprecated } from "framer-controller"

// Scroll Controller (Deprecated)

const controller = new ScrollControllerDeprecated({
    throttle: 16,
})

export const Scroll: Override = props => {
    controller.connect(props)
    return controller.state
}

export const Marker: Override = props => {
    const marker = controller.getMarker(props)
    if (!marker) return
    return marker
}

export const DesignMarker1: Override = props => {
    const marker = controller.getMarker(props)
    if (!marker) return
    return {
        progress_value: marker.intersect.y.toFixed(2),
    }
}

export const DesignMarker2: Override = props => {
    const marker = controller.getMarker(props)
    if (!marker) return
    return {
        progress_value: marker.progress.y.toFixed(2),
    }
}

export const Scrubber: Override = () => ({
    progress: controller.progress.y,
})

export const ScrubberMarker1: Override = props => {
    const marker = controller.getMarker(props)
    if (!marker) return
    return {
        progress: marker.intersect.y,
    }
}

export const ScrubberMarker2: Override = props => {
    const marker = controller.getMarker(props)
    if (!marker) return
    return {
        progress: marker.progress.y,
    }
}
