import { Override } from "framer"
import { FlowController } from "framer-controller"

export const controller = new FlowController()

export const Flow: Override = props => {
    controller.connect(props)
    return controller.state
}

export const back_link: Override = () => ({
    opacity: controller.root ? 0 : 1,
    onClick: controller.showPrevious,
})

export const link_screen_a: Override = () => ({
    onClick: () => controller.showNext("screen_a"),
})

export const link_screen_b: Override = () => ({
    onClick: () => controller.showNext("screen_b"),
})

export const link_screen_c: Override = () => ({
    onClick: () => controller.showNext("screen_c"),
})

export const link_screen_d: Override = () => ({
    onClick: () => controller.showNext("screen_d"),
})
