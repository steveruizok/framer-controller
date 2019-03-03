import { Override } from 'framer'
import { FormController } from 'framer-controller'

const controller = new FormController({
	name: {
		defaultValue: null,
		required: true,
		validation: (v) => v.includes('Ruiz'),
		errorText: (v) => `The name ${v} doesn't include "Ruiz".`,
	},
	age: {
		defaultValue: null,
		required: true,
		validation: (v) => v >= 33,
		errorText: (v) => `You must be at least 33 years old to continue.`,
	},
	contactMe: {
		defaultValue: false,
	},
	email: {
		defaultValue: null,
		required: (form) => !form.entries.email.hidden,
		validation: (v: string) => v && v.includes('@'),
		hidden: (form) => !form.entries.contactMe.value,
		errorText: (v) => `Please include a valid email address.`,
	},
})

// Name

export const nameField: Override = () => ({
	$errorText: controller.entries.name.errorText,
})

export const nameRequiredDot: Override = () => ({
	opacity: controller.entries.name.required ? 1 : 0,
	background: controller.entries.name.valid ? '#5CC0FF' : '#FFC65C',
})

export const nameInput: Override = () => ({
	value: controller.entries.name.value,
	onValueChange(value: string) {
		controller.setValue('name', value)
	},
})

// Age

export const ageField: Override = () => ({
	$errorText: controller.entries.age.errorText,
})

export const ageRequiredDot: Override = () => ({
	opacity: controller.entries.age.required ? 1 : 0,
	background: controller.entries.age.valid ? '#5CC0FF' : '#FFC65C',
})

export const ageInput: Override = () => ({
	value: controller.entries.age.value,
	onValueChange(value: string) {
		controller.setValue('age', value)
	},
})

// Contact

export const contactField: Override = () => ({})

export const contactInput: Override = () => ({
	toggled: controller.entries.contactMe.value,
	onToggle(value: boolean) {
		controller.setValue('contactMe', value)
	},
})

// Email

export const emailField: Override = () => ({
	opacity: controller.entries.email.hidden ? 0 : 1,
	$errorText: controller.entries.email.errorText,
})

export const emailRequiredDot: Override = () => ({
	opacity: controller.entries.email.required ? 1 : 0,
	background: controller.entries.email.valid ? '#5CC0FF' : '#FFC65C',
})

export const emailInput: Override = () => ({
	value: controller.entries.email.value,
	onValueChange(value: string) {
		controller.setValue('email', value)
	},
})

// Buttons

export const resetButton: Override = () => ({
	onClick: controller.reset,
})

export const submitButton: Override = () => ({
	disabled: !controller.ready,
})
