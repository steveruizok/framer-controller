import { Override } from "framer"
import { FetchController } from "../../../../lib"

const controller = new FetchController({
	url: "https://randomuser.me/api/",
	parse: data => data.results[0],
	log: true,
})

// Name

export const NameContainer: Override = () => ({
	$value:
		controller.data &&
		`${controller.data.name.first} ${controller.data.name.last}`,
	style: {
		textTransform: "capitalize",
	},
})

// Image

export const ImageContainer: Override = () => ({
	background: controller.data && `url(${controller.data.picture.large})`,
})

// Age

export const AgeContainer: Override = () => ({
	$value1:
		controller.data && new Date(controller.data.dob.date).toLocaleDateString(),
	$value2: controller.data.dob && `${controller.data.dob.age} years old`,
})

// Email

export const EmailContainer: Override = () => ({
	$value: controller.data && controller.data.email,
})

// Telephone

export const TelephoneContainer: Override = () => ({
	$value: controller.data && controller.data.cell,
})

// Refresh / Fetch Button

export const FetchButton: Override = () => ({
	onClick: controller.refresh,
})
