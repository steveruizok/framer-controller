import { Data, Override } from "framer"

const data = Data({
    rotate: 0,
    rotateY: 0,
    opacity: 1,
    toggle: true,
})

export const Scale: Override = () => {
    return {
        hover: { scale: 1.1 },
        press: { scale: 0.8 },
    }
}

export const Rotate: Override = props => {
    return {
        animate: { rotate: data.rotate },
        onTap() {
            data.rotate = data.rotate + 90
        },
    }
}

export const Fade: Override = props => {
    return {
        animate: { opacity: data.opacity },
        onTap() {
            data.opacity = 0
        },
    }
}

export const FlipOutput: Override = () => {
    return {
        animate: { rotateY: data.rotateY },
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 5,
        },
    }
}

export const FlipInput: Override = () => {
    return {
        onTap() {
            const toggle = data.toggle

            data.rotateY = toggle ? 180 : 0
            data.toggle = !toggle
        },
    }
}

export const Draggable: Override = props => {
    return {
        dragEnabled: true,
    }
}
