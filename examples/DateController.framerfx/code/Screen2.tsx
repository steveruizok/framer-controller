import { Override } from "framer"
import { DateController } from "../../../lib/"

const controller = new DateController({
	dateA: new Date(),
	dateB: new Date(),
})

export const DataADayInput: Override = () => {
	return {
		onValueChange(value) {
			const date = controller.data.dateA.day(value)
			controller.data.dateA = date
		},
	}
}

export const DayALabel: Override = () => {
	console.log(controller.data.dateA.format("YYYY-MM-DD"))
	return {
		$label: controller.data.dateA.format("YYYY-MM-DD"),
	}
}

export const DaysBetween: Override = () => {
	let date = controller.data.dateA
	let diff = date.diff(controller.data.dateB, "day")
	return {
		$value: diff.toString(),
	}
}
