import { Data, animate, Override, Animatable } from "framer"
import { CounterController, IntervalController } from "../../../lib"

const intervalController = new IntervalController()

export const frameCounter: Override = () => ({
	$value: intervalController.frame,
})

export const start: Override = () => ({
	onClick: intervalController.start,
})

export const stop: Override = () => ({
	onClick: intervalController.stop,
})

export const reset: Override = () => ({
	onClick: intervalController.reset,
})

const counterController = new CounterController()

export const counter: Override = () => ({
	$value: counterController.value,
})

export const increment: Override = () => ({
	onClick: counterController.increment,
})

export const incrementBy5: Override = () => ({
	onClick: () => counterController.incrementBy(5),
})

export const decrement: Override = () => ({
	onClick: counterController.decrement,
})

export const decrementBy5: Override = () => ({
	onClick: () => counterController.decrementBy(5),
})

export const setToZero: Override = () => ({
	onClick: () => counterController.set(0),
})
