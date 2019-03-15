import { Override } from "framer"
import { FormController } from "../../../../lib"

const controller = new FormController({
	name: {
		defaultValue: "",
		required: true,
		validation: v => v.includes(" "),
		errorText: () => "Please enter a first and last name.",
	},
	email: {
		defaultValue: "",
		validation: v => v.includes("@") && v.includes("."),
		errorText: () => "Please enter a valid email address.",
		required: true,
	},
	location: {
		defaultValue: "",
		validation: v => v,
		required: true,
	},
	state: {
		defaultValue: "",
		required: true,
		validation: v => v && v.length > 3,
		hidden: form =>
			!(form.data.location.valid && form.data.location.value.includes("USA")),
	},
})

// Name

export const NameContainer: Override = () => ({
	$errorText: controller.data.name.errorText,
})

export const NameInput: Override = () => ({
	value: controller.data.name.value,
	onValueChange: value => controller.setValue("name", value),
})

// Email

export const EmailContainer: Override = () => ({
	$errorText: controller.data.email.errorText,
})

export const EmailInput: Override = () => ({
	value: controller.data.email.value,
	onValueChange: value => controller.setValue("email", value),
})

// Location

export const LocationContainer: Override = () => ({
	$errorText: controller.data.location.errorText,
})

export const LocationInput: Override = () => ({
	value: controller.data.location.value,
	onSelect: value => controller.setValue("location", value),
})

// State

export const StateContainer: Override = () => ({
	visible: !controller.data.state.hidden,
	$errorText: controller.data.location.errorText,
})

export const StateInput: Override = () => ({
	value: controller.data.state.value,
	onValueChange: value => controller.setValue("state", value),
})

// Button

export const ContinueButton: Override = () => ({
	disabled: !controller.ready,
})
