import { Override } from "framer"
import { DateController } from "../../../lib/"

const controller = new DateController({
	today: new Date(),
})

export const Today: Override = () => {
	const date = controller.data.today
	return {
		$iconDay: date.date(),
		$iconMonth: date.format("MMMM").toUpperCase(),
		$iconWeekday: date.format("dddd").toUpperCase(),
		$weekday: date.format("dddd"),
		$date: date.format("MMMM Do"),
		$year: date.year(),
	}
}

const relativeDate = (delta: number, type: string) => {
	const date = controller.data.today.add(delta, type as any)
	return {
		$iconDay: date.date(),
		$weekday: date.format("dddd"),
		$date: date.format("MMMM Do, YYYY"),
		$year: date.year(),
	}
}

export const Tomorrow: Override = () => relativeDate(1, "day")

export const OneWeek: Override = () => relativeDate(1, "week")

export const TwoWeek: Override = () => relativeDate(2, "week")

export const OneMonth: Override = () => relativeDate(1, "month")
