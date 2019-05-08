import { Override } from "framer"
import { IntervalController } from "framer-controller"

export const controller = new IntervalController()

export function text(): Override {
    return {
        text: controller.state.frame,
    }
}

export function Start(): Override {
    return {
        onTap: controller.start,
    }
}

export function Pause(): Override {
    return {
        onTap: controller.pause,
    }
}

export function Stop(): Override {
    return {
        onTap: controller.stop,
    }
}
