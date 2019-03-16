import { Override } from "framer"
import { SelectionController } from "../../../../lib"

const controller = new SelectionController({
    validation: v => v > 1,
    selected: 2,
})

const getSelectable = value => ({
    opacity: controller.isSelected(value) ? 1 : 0.5,
    onClick: () => {
        controller.select(value)
    },
})

export const Selectable0: Override = () => getSelectable(0)
export const Selectable1: Override = () => getSelectable(1)
export const Selectable2: Override = () => getSelectable(2)
export const Selectable3: Override = () => getSelectable(3)

export const SetMaximumToOne: Override = () => ({
    onClick: () => {
        controller.validation = v => v < 2
        if (controller.selected > 1) {
            controller.select(1)
        }
    },
})

export const SetMinimumToTwo: Override = () => ({
    onClick: () => {
        controller.validation = v => v > 1
        if (controller.selected <= 1) {
            controller.select(2)
        }
    },
})
