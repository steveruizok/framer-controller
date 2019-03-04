import { Override } from 'framer'
import { FormController } from '../../../lib'

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
		required: (form) => !form.data.email.hidden,
		validation: (v: string) => v && v.includes('@'),
		hidden: (form) => !form.data.contactMe.value,
		errorText: (v) => `Please include a valid email address.`,
	},
})

console.log(controller)

// Name

export const nameField: Override = () => ({
	$errorText: controller.data.name.errorText,
})

export const nameRequiredDot: Override = () => ({
	opacity: controller.data.name.required ? 1 : 0,
	background: controller.data.name.valid ? '#5CC0FF' : '#FFC65C',
})

export const nameInput: Override = () => ({
	value: controller.data.name.value,
	onValueChange(value: string) {
		controller.setValue('name', value)
	},
})

// Age

export const ageField: Override = () => ({
	$errorText: controller.data.age.errorText,
})

export const ageRequiredDot: Override = () => ({
	opacity: controller.data.age.required ? 1 : 0,
	background: controller.data.age.valid ? '#5CC0FF' : '#FFC65C',
})

export const ageInput: Override = () => ({
	value: controller.data.age.value,
	onValueChange(value: string) {
		controller.setValue('age', value)
	},
})

// Contact

export const contactField: Override = () => ({})

export const contactInput: Override = () => ({
	toggled: controller.data.contactMe.value,
	onToggle(value: boolean) {
		controller.setValue('contactMe', value)
	},
})

// Email

export const emailField: Override = () => ({
	opacity: controller.data.email.hidden ? 0 : 1,
	$errorText: controller.data.email.errorText,
})

export const emailRequiredDot: Override = () => ({
	opacity: controller.data.email.required ? 1 : 0,
	background: controller.data.email.valid ? '#5CC0FF' : '#FFC65C',
})

export const emailInput: Override = () => ({
	value: controller.data.email.value,
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
