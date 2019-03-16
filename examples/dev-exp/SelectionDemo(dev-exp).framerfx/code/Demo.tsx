import { Override } from "framer"
import { SelectionController } from "../../../../lib"

const controller = new SelectionController()

const getSelectable = value => ({
    opacity: controller.selected === value ? 1 : 0.5,
    onClick: () => controller.select(value),
})

export const Selectable0: Override = () => getSelectable(0)
export const Selectable1: Override = () => getSelectable(1)
export const Selectable2: Override = () => getSelectable(2)
export const Selectable3: Override = () => getSelectable(3)

export const ToggleButton: Override = () => ({
    opacity: controller.toggle ? 1 : 0.5,
    onClick: () => (controller.toggle = !controller.toggle),
})

export const ClearButton: Override = () => ({
    opacity: controller.hasSelected ? 1 : 0.5,
    onClick: controller.clear,
})
