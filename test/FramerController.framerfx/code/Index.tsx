import { Data, animate, Override, Animatable } from "framer"
import { IndexController } from "../../../lib"

const data = Data({
	selected: "",
})

const controller = new IndexController({
	items: ["a", "b", "c"],
})

export const isItemA: Override = () => {
	return {
		z: controller.order.a,
		background: data.selected === "a" ? "green" : "black",
		onTap() {
			data.selected = "a"
		},
	}
}

export const isItemB: Override = () => {
	return {
		z: controller.order.b,
		background: data.selected === "b" ? "green" : "black",
		onTap() {
			data.selected = "b"
		},
	}
}

export const isItemC: Override = () => {
	return {
		z: controller.order.c,
		background: data.selected === "c" ? "green" : "black",
		onTap() {
			data.selected = "c"
		},
	}
}

export const sendToBack: Override = () => {
	return {
		onTap() {
			controller.sendToBack(data.selected)
		},
	}
}

export const bringToFront: Override = () => {
	return {
		onTap() {
			controller.bringToFront(data.selected)
		},
	}
}

export const bringForward: Override = () => {
	return {
		onTap() {
			controller.moveForward(data.selected)
		},
	}
}

export const sendBackward: Override = () => {
	return {
		onTap() {
			controller.moveBackward(data.selected)
		},
	}
}
