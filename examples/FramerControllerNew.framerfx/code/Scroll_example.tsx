import { Override } from "framer"
import { ScrollController } from "../../../dist/"

// Scroll Controller (Deprecated)

const controller = new ScrollController()

export const Scroll: Override = props => controller.connect(props)

export const DesignMarker1: Override = props => {
    const res = controller.trackFrame(props)

    return {
        progress: res.intersect.y,
    }
}

export const Scrubber: Override = () => {
    return { progress: controller.progress.y }
}

export const Scrubber_intersect: Override = props => {
    const { intersect } = controller.trackFrame(props)
    return { progress: intersect.y }
}

export const Scrubber2_travel: Override = props => {
    const { travel } = controller.trackFrame(props)
    return { progress: travel.y }
}
